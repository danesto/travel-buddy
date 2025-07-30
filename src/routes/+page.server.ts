import { suggestTrip } from '$lib/server/ai-planner.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log(data);

		const location = data.get('location')?.toString() || '';
		const date = new Date(data.get('date') as string);
		const guests = Number(data.get('guests')) || 1;
		const flexible = data.get('flexible') === '1';

		if (!location || !date || !guests) {
			return fail(400, { error: 'Missing required fields' });
		}

		try {
			const trip = await suggestTrip({
				location,
				startDate: `date`,
				endDate: `${new Date(date.setDate(date.getDate() + 2))}`,
				persons: guests,
				flexible
			});
			console.log('trip', trip);
			return { slug: trip.slug };
		} catch (error) {
			console.log('error trip', error);
			return fail(500, { error: error || 'AI suggestion failed' });
		}
	}
};
