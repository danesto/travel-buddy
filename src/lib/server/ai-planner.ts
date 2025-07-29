import { db } from '$lib/db/server.js';
import { trips, transportation, accommodations } from '$lib/db/schema.js';
import { slugify } from '$lib/utils.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Type for input
export type AiTripSearch = {
	location: string;
	startDate: string; // ISO
	endDate: string; // ISO
	persons: number;
	flexible?: boolean;
};

// Type for output (matches schema)
export type SuggestedTrip = {
	title: string;
	destination: string;
	summary: string;
	headerImage?: string;
	destinationCountryCode: string;
	startDate: number;
	endDate: number;
	accentColor?: string;
	transportation: (typeof transportation.$inferInsert)[];
	accommodations: (typeof accommodations.$inferInsert)[];
};

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function sendPromptToGemini(prompt: string) {
	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		return response.text();
	} catch (error) {
		throw new Error(`Gemini API error: ${error instanceof Error ? error.message : String(error)}`);
	}
}

function buildPrompt({ location, startDate, endDate, persons, flexible }: AiTripSearch) {
	return `Suggest a trip for ${persons} person(s) to ${location} from ${startDate} to ${endDate}${flexible ? ' (dates flexible)' : ''}. 
  Find the cheapest available flight (or nearest date if not available), and a recommended hotel or accommodation. 
  Return JSON with: title, destination, summary, destinationCountryCode, startDate, endDate, accentColor, transportation (array: type, route, date, time, airline, cost, currency), accommodations (array: name, type, location, checkIn, checkOut, nights, roomType, rating, totalCost, currency, link).`;
}

export async function suggestTrip(search: AiTripSearch) {
	const prompt = buildPrompt(search);
	const aiResponse = await sendPromptToGemini(prompt);

	let trip: SuggestedTrip;

	try {
		trip = JSON.parse(aiResponse);
	} catch {
		throw new Error('AI did not return valid JSON');
	}

	const slug = slugify(trip.title);

	const [tripRow] = await db
		.insert(trips)
		.values({
			slug,
			title: trip.title,
			destination: trip.destination,
			summary: trip.summary,
			startDate: new Date(trip.startDate),
			endDate: new Date(trip.endDate),
			destinationCountryCode: trip.destinationCountryCode,
			accentColor: trip.accentColor || '#008000'
		})
		.returning();

	// Save transportation
	if (trip.transportation?.length) {
		for (const t of trip.transportation) {
			await db.insert(transportation).values({
				...t,
				tripId: tripRow.id,
				date: t.date ? new Date(t.date) : undefined,
				pickupDate: t.pickupDate ? new Date(t.pickupDate) : undefined,
				returnDate: t.returnDate ? new Date(t.returnDate) : undefined
			});
		}
	}
	// Save accommodations
	if (trip.accommodations?.length) {
		for (const a of trip.accommodations) {
			await db.insert(accommodations).values({
				...a,
				tripId: tripRow.id,
				checkIn: a.checkIn ? new Date(a.checkIn) : undefined,
				checkOut: a.checkOut ? new Date(a.checkOut) : undefined
			});
		}
	}
	return { ...tripRow, slug };
}
