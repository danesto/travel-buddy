PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_trips` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`destination` text NOT NULL,
	`summary` text NOT NULL,
	`header_image` text,
	`destination_country_code` text DEFAULT 'SR' NOT NULL,
	`start_date` integer,
	`gradient_from` text DEFAULT '#008000' NOT NULL,
	`gradient_to` text DEFAULT '#008000' NOT NULL,
	`end_date` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_trips`("id", "slug", "title", "destination", "summary", "header_image", "destination_country_code", "start_date", "gradient_from", "gradient_to", "end_date", "created_at", "updated_at") SELECT "id", "slug", "title", "destination", "summary", "header_image", "destination_country_code", "start_date", "gradient_from", "gradient_to", "end_date", "created_at", "updated_at" FROM `trips`;--> statement-breakpoint
DROP TABLE `trips`;--> statement-breakpoint
ALTER TABLE `__new_trips` RENAME TO `trips`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `trips_slug_unique` ON `trips` (`slug`);