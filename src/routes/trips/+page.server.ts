import { db } from '$lib/db/index.js';
import { trips as tripsTable } from '$lib/db/schema.js';

export const load = async () => {
	const trips = await db.select().from(tripsTable);

	return {
		trips
	};
};
