import { suggestTrip } from '$lib/server/ai-planner.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	aiSuggest: async ({ request }) => {
		const data = await request.formData();
		const location = data.get('location')?.toString() || '';
		const date = data.get('date')?.toString() || '';
		const guests = Number(data.get('guests')) || 1;
		const flexible = data.get('flexible') === '1';

		if (!location || !date || !guests) {
			return fail(400, { error: 'Missing required fields' });
		}

		try {
			const trip = await suggestTrip({
				location,
				startDate: date,
				endDate: date,
				persons: guests,
				flexible
			});
			return { slug: trip.slug };
		} catch (error) {
			return fail(500, { error: error || 'AI suggestion failed' });
		}
	}
};
