import { db } from '$lib/db/index.js';
import { trips } from '$lib/db/schema.js';
import type { PageServerLoad, Actions } from './$types.js';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const trip = await db.select().from(trips).where(eq(trips.slug, slug)).get();

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
	createOrEditItinerary: async ({ request, params }) => {
		const { slug } = params;
		const data = await request.formData();

		console.log('createOrEditItinerary', slug, data);
	}
};
