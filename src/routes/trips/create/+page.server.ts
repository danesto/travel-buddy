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
				destinationCountryCode: data.get('destinationCountryCode')?.toString() || '',
				summary: data.get('summary')?.toString() || '',
				headerImage: data.get('headerImage')?.toString() || '',
				gradientFrom: data.get('gradientFrom')?.toString() || '',
				gradientTo: data.get('gradientTo')?.toString() || ''
			})
			.returning()
			.get();

		redirect(303, `/trips/${trip.slug}/edit?toast=success&message=Trip created successfully`);
	}
} satisfies Actions;
