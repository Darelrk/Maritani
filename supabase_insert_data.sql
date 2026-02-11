-- ============================================================
-- INSERT DATA - Run AFTER create_tables.sql
-- Maritani E-Commerce (Supabase PostgreSQL)
-- ============================================================

-- ============================================================
-- 1. USERS (For Authentication)
-- ============================================================

-- Seller User (Business account)
INSERT INTO "User" (
    id, name, email, "emailVerified", password, image, phone, "accountType", role, "createdAt", "updatedAt"
) VALUES (
    'cm74w6uyz0000example001',
    'Pak Budi Santoso',
    'seller@maritani.com',
    NULL,
    '$2b$10$3yy21fWJxXg.f.ir8P.DQOZ8UM7T4J8yZMsnAjABr3bY/lCpv6XVu', -- bcrypt hash for 'seller123'
    NULL,
    '081234567890',
    'BUSINESS',
    'SELLER',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Buyer User (Personal account)
INSERT INTO "User" (
    id, name, email, "emailVerified", password, image, phone, "accountType", role, "createdAt", "updatedAt"
) VALUES (
    'cm74w6uyz0000example002',
    'Siti Pembeli',
    'buyer@maritani.com',
    NULL,
    '$2b$10$5KxyHLPKfLcd340RGdoVG.YUgrduIVlkK8bRf0kuS0znsY550q5zq', -- bcrypt hash for 'buyer123'
    NULL,
    '089876543210',
    'PERSONAL',
    'USER',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- 2. SELLER PROFILES
-- ============================================================

INSERT INTO "SellerProfile" (
    id, "userId", "storeName", description, address, city, status, "createdAt"
) VALUES (
    'cm74w6uyz0000seller001',
    'cm74w6uyz0000example001',
    'Nelayan Cilacap Jaya',
    'Menyediakan hasil laut segar tangkapan harian langsung dari TPI Cilacap.',
    'Jl. Pelabuhan No. 45',
    'Cilacap',
    'ACTION',
    NOW()
) ON CONFLICT ("userId") DO NOTHING;

-- ============================================================
-- VERIFICATION QUERY
-- ============================================================

SELECT 'Data inserted successfully!' as status;
SELECT 'Users:' as table_name, COUNT(*) as count FROM "User";
SELECT 'SellerProfiles:' as table_name, COUNT(*) as count FROM "SellerProfile";

-- Test login credentials:
-- Seller: seller@maritani.com / seller123
-- Buyer: buyer@maritani.com / buyer123
