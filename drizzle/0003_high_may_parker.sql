ALTER TABLE `trips` ADD `accent_color` text DEFAULT '#008000' NOT NULL;--> statement-breakpoint
ALTER TABLE `trips` DROP COLUMN `gradient_from`;--> statement-breakpoint
ALTER TABLE `trips` DROP COLUMN `gradient_to`;