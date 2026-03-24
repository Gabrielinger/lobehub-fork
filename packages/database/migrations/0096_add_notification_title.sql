ALTER TABLE "notifications" ADD COLUMN IF NOT EXISTS "title_key" text;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN IF NOT EXISTS "title" text;
