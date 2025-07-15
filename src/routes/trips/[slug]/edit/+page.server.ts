import { db } from '$lib/db/index.js';
import { trips } from '$lib/db/schema.js';
import type { PageServerLoad } from './$types.js';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const trip = await db.select().from(trips).where(eq(trips.slug, slug)).get();

	return { trip };
};
