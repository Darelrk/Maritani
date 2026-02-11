-- ============================================================
-- ADD NEW COLUMNS TO USER TABLE
-- For Personal/Business account type and phone number
-- ============================================================

-- Add phone column
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add accountType column with default PERSONAL
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "accountType" TEXT NOT NULL DEFAULT 'PERSONAL';

-- Create index on phone for faster lookup
CREATE INDEX IF NOT EXISTS "User_phone_idx" ON "User"(phone);

-- Verify columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'User'
ORDER BY ordinal_position;
