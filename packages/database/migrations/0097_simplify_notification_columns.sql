ALTER TABLE "notifications" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN IF EXISTS "title_key";--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN IF EXISTS "content_key";--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN IF EXISTS "content_params";
