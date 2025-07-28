import { db } from '$lib/db/index.js';
import { itineraryItems } from '$lib/db/schema.js';
import { inArray } from 'drizzle-orm';

export const deleteItineraryItems = async (ids: number[]) => {
	try {
		const deletedItems = await db
			.delete(itineraryItems)
			.where(inArray(itineraryItems.id, ids))
			.returning();

		return { success: true, data: deletedItems };
	} catch (error) {
		console.error(error);
		return { success: false, error: 'Failed to delete itinerary items' };
	}
};
