import { db } from '$lib/db/index.js';
import { trips as tripsTable } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	return {
		trip: db.select().from(tripsTable).where(eq(tripsTable.slug, params.slug)).get()
		// todo: stream each part of the trip separately to provide smoother loading experience
		// itinerary: db.select().from(itineraryTable).where(eq(itineraryTable.tripId, params.slug))
	};
};
