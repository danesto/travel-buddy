import { db } from '$lib/db/index.js';
import { trips as tripsTable } from '$lib/db/schema.js';
import { getIdFromSlug } from '$lib/utils.js';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const tripId = getIdFromSlug(params.slug);

	return {
		trip: db.query.trips.findFirst({
			where: eq(tripsTable.id, tripId),
			with: {
				itineraryItems: true
			}
		})
		// todo: stream each part of the trip separately to provide smoother loading experience
		// itinerary: db.select().from(itineraryTable).where(eq(itineraryTable.tripId, params.slug))
	};
};
