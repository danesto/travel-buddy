import type {
	trips,
	itineraryItems as itineraryItemsSchema,
	expenses as expensesSchema,
	accommodations as accommodationsSchema,
	transportation as transportationSchema
} from '$lib/db/schema.js';

// Form-specific types that extend database types for UI purposes
export type FormItineraryItem = Omit<typeof itineraryItemsSchema.$inferInsert, 'tripId'> & {
	tripId?: number;
	activities: string[]; // UI-only field for managing activities
};

export type FormExpense = Omit<typeof expensesSchema.$inferInsert, 'tripId' | 'amount'> & {
	tripId?: number;
	amount: string; // Keep as string for form input, convert to number on submit
};

export type FormAccommodation = Omit<
	typeof accommodationsSchema.$inferInsert,
	'tripId' | 'checkIn' | 'checkOut' | 'totalCost'
> & {
	tripId?: number;
	checkIn: string; // Keep as string for form input
	checkOut: string; // Keep as string for form input
	totalCost: string; // Keep as string for form input
	amenities: string[]; // UI-only field for managing amenities
};

export type FormTransportation = Omit<
	typeof transportationSchema.$inferInsert,
	'tripId' | 'date' | 'pickupDate' | 'returnDate' | 'cost'
> & {
	tripId?: number;
	date: string; // Keep as string for form input
	pickupDate?: string;
	returnDate?: string;
	cost: string; // Keep as string for form input
};

export type FormTripData = typeof trips.$inferInsert & {
	itinerary: FormItineraryItem[];
	expenses: FormExpense[];
	accommodations: FormAccommodation[];
	transportation: FormTransportation[];
};

export type FormProps = {
	defaultValues?: Partial<FormTripData>;
	mode: 'create' | 'edit';
};
