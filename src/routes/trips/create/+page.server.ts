import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { db } from '$lib/db/index.js';
import { trips } from '$lib/db/schema.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log('createTrip', data);

		const slug = data.get('title')?.toString().toLowerCase().replace(/\s+/g, '-') || '';

		const trip = await db
			.insert(trips)
			.values({
				slug: slug,
				title: data.get('title')?.toString() || '',
				destination: data.get('destination')?.toString() || '',
				summary: data.get('summary')?.toString() || ''
			})
			.returning()
			.get();

		redirect(303, `/trips/${trip.slug}/edit`);
		// return { success: true };
	}
} satisfies Actions;
