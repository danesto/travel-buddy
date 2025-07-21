import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// Main trip table
export const trips = sqliteTable('trips', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	title: text('title').notNull(),
	destination: text('destination').notNull(),
	summary: text('summary').notNull(),
	headerImage: text('header_image'),
	destinationCountryCode: text('destination_country_code').notNull().default('SR'),
	startDate: integer('start_date', { mode: 'timestamp' }),
	accentColor: text('accent_color').notNull().default('#008000'),
	endDate: integer('end_date', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Itinerary items for each trip
export const itineraryItems = sqliteTable('itinerary_items', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	day: text('day').notNull(), // e.g., "Day 1"
	date: text('date').notNull(), // e.g., "June 15"
	location: text('location').notNull(),
	highlights: text('highlights'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Activities within each itinerary item
export const activities = sqliteTable('activities', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	itineraryItemId: integer('itinerary_item_id')
		.notNull()
		.references(() => itineraryItems.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	order: integer('order').notNull(), // For ordering activities within a day
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Expenses for each trip
export const expenses = sqliteTable('expenses', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	category: text('category').notNull(), // e.g., "Accommodation", "Flights", "Food & Dining"
	description: text('description').notNull(),
	amount: real('amount').notNull(),
	currency: text('currency').notNull().default('EUR'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Accommodations for each trip
export const accommodations = sqliteTable('accommodations', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	type: text('type').notNull(), // e.g., "Luxury Resort", "Hotel", "Hostel"
	location: text('location').notNull(),
	checkIn: integer('check_in', { mode: 'timestamp' }),
	checkOut: integer('check_out', { mode: 'timestamp' }),
	nights: integer('nights'),
	roomType: text('room_type'),
	rating: real('rating'),
	totalCost: real('total_cost'),
	currency: text('currency').notNull().default('EUR'),
	link: text('link'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Amenities for accommodations
export const amenities = sqliteTable('amenities', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	accommodationId: integer('accommodation_id')
		.notNull()
		.references(() => accommodations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(), // e.g., "Infinity Pool", "Spa Access", "Balcony"
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Transportation for each trip
export const transportation = sqliteTable('transportation', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // e.g., "Flight", "Car Rental", "Train", "Bus"
	route: text('route'), // For flights: "London (LHR) → Santorini (JTR)"
	date: integer('date', { mode: 'timestamp' }),
	time: text('time'), // For flights: "06:30 - 12:45"
	airline: text('airline'), // For flights
	provider: text('provider'), // For car rentals: "Hertz"
	vehicle: text('vehicle'), // For car rentals: "Fiat Panda"
	duration: text('duration'), // For car rentals: "7 days"
	pickupDate: integer('pickup_date', { mode: 'timestamp' }),
	returnDate: integer('return_date', { mode: 'timestamp' }),
	cost: real('cost'),
	currency: text('currency').notNull().default('EUR'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Trip diary (single rich text content per trip)
export const diaryEntries = sqliteTable('diary_entries', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	content: text('content').notNull(), // Rich text content for the entire trip diary
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Photos/media for trips
export const photos = sqliteTable('photos', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	url: text('url').notNull(),
	caption: text('caption'),
	order: integer('order').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// Trip notes (general notes about the trip)
export const notes = sqliteTable('notes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	content: text('content').notNull(),
	category: text('category'), // e.g., "Packing", "Tips", "Reminders"
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

// --- RELATIONS ---

export const tripsRelations = relations(trips, ({ many }) => ({
	itineraryItems: many(itineraryItems),
	expenses: many(expenses),
	accommodations: many(accommodations),
	transportation: many(transportation),
	diaryEntries: many(diaryEntries),
	photos: many(photos),
	notes: many(notes)
}));

export const itineraryItemsRelations = relations(itineraryItems, ({ one, many }) => ({
	trip: one(trips, {
		fields: [itineraryItems.tripId],
		references: [trips.id]
	}),
	activities: many(activities)
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
	itineraryItem: one(itineraryItems, {
		fields: [activities.itineraryItemId],
		references: [itineraryItems.id]
	})
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
	trip: one(trips, {
		fields: [expenses.tripId],
		references: [trips.id]
	})
}));

export const accommodationsRelations = relations(accommodations, ({ one, many }) => ({
	trip: one(trips, {
		fields: [accommodations.tripId],
		references: [trips.id]
	}),
	amenities: many(amenities)
}));

export const amenitiesRelations = relations(amenities, ({ one }) => ({
	accommodation: one(accommodations, {
		fields: [amenities.accommodationId],
		references: [accommodations.id]
	})
}));

export const transportationRelations = relations(transportation, ({ one }) => ({
	trip: one(trips, {
		fields: [transportation.tripId],
		references: [trips.id]
	})
}));

export const diaryEntriesRelations = relations(diaryEntries, ({ one }) => ({
	trip: one(trips, {
		fields: [diaryEntries.tripId],
		references: [trips.id]
	})
}));

export const photosRelations = relations(photos, ({ one }) => ({
	trip: one(trips, {
		fields: [photos.tripId],
		references: [trips.id]
	})
}));

export const notesRelations = relations(notes, ({ one }) => ({
	trip: one(trips, {
		fields: [notes.tripId],
		references: [trips.id]
	})
}));
