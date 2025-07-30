import { db } from '$lib/db/server.js';
import { trips, transportation, accommodations } from '$lib/db/schema.js';
import { sanitizeAIResponse, slugify } from '$lib/utils.js';
import { GEMINI_API_KEY } from '$env/static/private';

console.log('GEMINI_API_KEY', GEMINI_API_KEY);

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

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
	systemInstruction: `Suggest some good affordable hotel if you can find information about it somewhere online. Alongside of it suggest some good places to visit in this place and this time of the year. 
  Include some information about the transportation options available in this place and include some information about the cost of transportation based on data you found. Include the suggested itirenary for the number of days.
  Return ONLY a JSON with: title, destination, summary, destinationCountryCode, startDate, endDate, accentColor, transportation (array: type, route, date, time, airline, cost, currency), accommodations (array: name, type, location, checkIn, checkOut, nights, roomType, rating, totalCost, currency, link). itirenary (array: day, destination, activities). Dont return any other notes or text except the asked for JSON.`
});

async function sendPromptToGemini(prompt: string) {
	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		console.log('response', response.text());

		return sanitizeAIResponse(response.text());
	} catch (error) {
		throw new Error(`Gemini API error: ${error instanceof Error ? error.message : String(error)}`);
	}
}

function buildPrompt({ location, startDate, endDate, persons, flexible }: AiTripSearch) {
	return `Suggest a plan for a trip for ${persons} person(s) to ${location} from ${startDate} to ${endDate}${flexible ? ' (dates flexible)' : ''}.`;
}

export async function suggestTrip(search: AiTripSearch) {
	console.log('IM HERE', search);
	const prompt = buildPrompt(search);
	const aiResponse = await sendPromptToGemini(prompt);
	console.log('ai response', aiResponse);

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
