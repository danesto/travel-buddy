import { db } from '$lib/db/index.js';
import { itineraryItems, trips } from '$lib/db/schema.js';
import type { PageServerLoad, Actions } from './$types.js';
import { eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { FormItineraryItem } from '$lib/components/trip-form/trip-form.types.js';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	// this returns empty itinerary items even tho there are some in the database
	const trip = await db.query.trips.findFirst({
		where: eq(trips.slug, slug),
		with: {
			itineraryItems: true
		}
	});

	if (!trip) {
		throw error(404, 'Trip not found');
	}

	return { trip };
};

export const actions: Actions = {
	createOrEditBasicInfo: async ({ request, params }) => {
		const { slug } = params;
		const data = await request.formData();

		console.log('edit trip', data);

		const updatedTrip = await db
			.update(trips)
			.set({
				title: data.get('title')?.toString(),
				destination: data.get('destination')?.toString(),
				summary: data.get('summary')?.toString(),
				headerImage: data.get('headerImage')?.toString(),
				destinationCountryCode: data.get('destinationCountryCode')?.toString(),
				startDate: new Date(data.get('startDate') as string),
				endDate: new Date(data.get('endDate') as string),
				accentColor: data.get('accentColor')?.toString(),
				updatedAt: new Date()
			})
			.where(eq(trips.slug, slug))
			.returning()
			.get();

		return { success: true, trip: updatedTrip };
	},
	createOrEditItinerary: async ({ request }) => {
		const formData = await request.formData();

		console.log('formData', formData.getAll('itinerary'));

		// Convert FormData to an object first
		const rawData = Object.fromEntries(formData);

		console.log('rawData', rawData.tripId);

		// Initialize array to store itinerary items
		const itinerary: FormItineraryItem[] = [];

		// Group form fields by day index
		const dayIndices = new Set(
			Array.from(formData.keys())
				.map((key) => key.match(/itinerary\[(\d+)\]/)?.[1])
				.filter(Boolean)
		);

		// Reconstruct itinerary items
		for (const dayIndex of dayIndices) {
			const prefix = `itinerary[${dayIndex}]`;
			const activities: string[] = [];

			// Collect all activities for this day
			for (let i = 0; ; i++) {
				const activity = rawData[`${prefix}.activities[${i}]`];
				if (!activity) break;
				activities.push(activity.toString());
			}

			const item: FormItineraryItem = {
				// If id is not present, set it to undefined to avoid conflict and insertion of 0 id row
				id: Number(rawData[`${prefix}.id`]) || undefined,
				day: rawData[`${prefix}.day`]?.toString() || '',
				date: rawData[`${prefix}.date`]?.toString() || '',
				location: rawData[`${prefix}.location`]?.toString() || '',
				activities,
				highlights: rawData[`${prefix}.highlights`]?.toString() || '',
				tripId: Number(rawData.tripId)
			};

			itinerary.push(item);
		}

		console.log('itinerary', itinerary);

		await db
			.insert(itineraryItems)
			.values(
				itinerary.map((item) => ({
					...item,
					tripId: item.tripId as number
				}))
			)
			.onConflictDoUpdate({
				target: [itineraryItems.id],
				set: {
					highlights: sql`excluded.highlights`,
					location: sql`excluded.location`,
					date: sql`excluded.date`,
					day: sql`excluded.day`
				}
			});

		// TODO: Save to database
		// await db.insert(itineraryItems).values(itinerary).returning();

		return { success: true, itinerary };
	}
};
