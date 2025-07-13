import { db } from '$lib/db/index.js';
import { trips as tripsTable } from '$lib/db/schema.js';

export const load = async () => {
	return {
		trips: db.select().from(tripsTable)
	};
};
