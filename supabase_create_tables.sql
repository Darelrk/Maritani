-- ============================================================
-- CREATE TABLES DDL - Supabase PostgreSQL
-- Maritani E-Commerce
-- Run this FIRST before inserting data
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USER TABLE (NextAuth + App)
-- ============================================================
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    "emailVerified" TIMESTAMP(3),
    password TEXT,
    image TEXT,
    role TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create index on email for faster lookup
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"(email);

-- ============================================================
-- 2. ACCOUNT TABLE (NextAuth)
-- ============================================================
CREATE TABLE IF NOT EXISTS "Account" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    "expires_at" INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"(provider, "providerAccountId");
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");

-- ============================================================
-- 3. SESSION TABLE (NextAuth)
-- ============================================================
CREATE TABLE IF NOT EXISTS "Session" (
    id TEXT PRIMARY KEY,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");

-- ============================================================
-- 4. VERIFICATION TOKEN TABLE (NextAuth)
-- ============================================================
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP(3) NOT NULL,
    PRIMARY KEY (identifier, token)
);

CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"(token);

-- ============================================================
-- 5. SELLER PROFILE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS "SellerProfile" (
    id TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL,
    "storeName" TEXT NOT NULL,
    description TEXT,
    address TEXT,
    city TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SellerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "SellerProfile_userId_idx" ON "SellerProfile"("userId");

-- ============================================================
-- 6. PRODUCT TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS "Product" (
    id TEXT PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DOUBLE PRECISION NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL,
    images TEXT NOT NULL,
    unit TEXT NOT NULL DEFAULT 'kg',
    "isFresh" BOOLEAN NOT NULL DEFAULT true,
    "harvestTime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "SellerProfile"(id)
);

CREATE INDEX IF NOT EXISTS "Product_sellerId_idx" ON "Product"("sellerId");
CREATE INDEX IF NOT EXISTS "Product_category_idx" ON "Product"(category);

-- ============================================================
-- 7. CART TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS "Cart" (
    id TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id)
);

CREATE INDEX IF NOT EXISTS "Cart_userId_idx" ON "Cart"("userId");

-- ============================================================
-- 8. CART ITEM TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS "CartItem" (
    id TEXT PRIMARY KEY,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"(id) ON DELETE CASCADE,
    CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"(id),
    UNIQUE ("cartId", "productId")
);

CREATE INDEX IF NOT EXISTS "CartItem_cartId_idx" ON "CartItem"("cartId");
CREATE INDEX IF NOT EXISTS "CartItem_productId_idx" ON "CartItem"("productId");

-- ============================================================
-- 9. ORDER TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS "Order" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    "recipientName" TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    notes TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id)
);

CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"(status);

-- ============================================================
-- 10. ORDER ITEM TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS "OrderItem" (
    id TEXT PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    qty INTEGER NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"(id) ON DELETE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"(id)
);

CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX IF NOT EXISTS "OrderItem_productId_idx" ON "OrderItem"("productId");

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT 'Tables created successfully!' as status;

-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
