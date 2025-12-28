-- Manual migration: Drop icon column from facilities table
-- Run this manually or through your preferred database tool

ALTER TABLE "facilities" DROP COLUMN IF EXISTS "icon";
