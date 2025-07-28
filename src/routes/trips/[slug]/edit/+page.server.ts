import { db } from '$lib/db/index.js';
import { itineraryItems, trips } from '$lib/db/schema.js';
import type { PageServerLoad, Actions } from './$types.js';
import { eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { FormItineraryItem } from '$lib/components/trip-form/trip-form.types.js';
import { deleteItineraryItems } from '$lib/server/itirenary-items.js';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const trip = await db.query.trips.findFirst({
		where: eq(trips.slug, slug),
		with: {
			itineraryItems: {
				with: {
					activities: true
				}
			}
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
		const rawData = Object.fromEntries(formData);

		const removedItineraryItemsIds = rawData.removedItineraryItemsIds
			?.toString()
			.split(',')
			.map(Number);

		console.log('removed items', removedItineraryItemsIds);

		let deletedItems: number[] = [];

		if (removedItineraryItemsIds?.length) {
			deletedItems =
				(await deleteItineraryItems(removedItineraryItemsIds)).data?.map((trip) => trip.id) ?? [];
		}

		// Initialize array to store itinerary items
		const itinerary: FormItineraryItem[] = [];
		// Group form fields by day index
		const dayIndices = new Set(
			Array.from(formData.keys())
				.map((key) => key.match(/itinerary\[(\d+)\]/)?.[1])
				.filter(Boolean)
		);
		for (const dayIndex of dayIndices) {
			const prefix = `itinerary[${dayIndex}]`;
			// Collect all activities for this day
			const activities: { name: string; order: number }[] = [];
			for (let i = 0; ; i++) {
				const activityName = rawData[`${prefix}.activities[${i}].name`];
				if (typeof activityName === 'undefined') break;
				activities.push({ name: activityName.toString(), order: i });
			}
			const item: FormItineraryItem = {
				id: Number(rawData[`${prefix}.id`]) || undefined,
				day: rawData[`${prefix}.day`]?.toString() || '',
				date: rawData[`${prefix}.date`]?.toString() || '',
				location: rawData[`${prefix}.location`]?.toString() || '',
				highlights: rawData[`${prefix}.highlights`]?.toString() || '',
				tripId: Number(rawData.tripId),
				activities
			};
			itinerary.push(item);
		}
		// Save itinerary items

		// Insert or update itinerary item
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

		return { success: true, itinerary, deletedItems };
	}
};
