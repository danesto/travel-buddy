import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { db } from '$lib/db/index.js';
import { trips } from '$lib/db/schema.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log('createTrip', data);

		db.insert(trips).values({
			slug: data.get('title')?.toString().toLowerCase().replace(/\s+/g, '-') || '',
			title: data.get('title')?.toString() || '',
			destination: data.get('destination')?.toString() || '',
			summary: data.get('summary')?.toString() || ''
		});

		redirect(303, '/trips/');
		// return { success: true };
	}
} satisfies Actions;
