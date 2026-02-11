# ============================================================
# MIGRATION GUIDE: SQLite → Supabase PostgreSQL (2-Step Process)
# Maritani E-Commerce
# ============================================================

## ⚠️ IMPORTANT: 2-Step Process Required

Karena error "relation does not exist", Anda perlu menjalankan SQL dalam 2 langkah:

### STEP 1: Create Tables (DDL)
File: `supabase_create_tables.sql`

### STEP 2: Insert Data (DML)  
File: `supabase_insert_data.sql`

---

## 🚀 STEP-BY-STEP MIGRATION

### STEP 1: Create Tables

**Via Supabase Dashboard:**
1. Login ke https://supabase.com
2. Pilih project Anda
3. Go to "SQL Editor" (left sidebar)
4. Click "New query"
5. Copy paste isi file: `supabase_create_tables.sql`
6. Click "Run"
7. Verifikasi: Harus muncul "Tables created successfully!"

### STEP 2: Insert Data

**Via Supabase Dashboard:**
1. Di SQL Editor yang sama (atau new query)
2. Copy paste isi file: `supabase_insert_data.sql`
3. Click "Run"
4. Verifikasi: Harus muncul count Users: 2, SellerProfiles: 1

---

## ✅ VERIFICATION

**Check tables:**
```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check users
SELECT * FROM "User";

-- Check seller profile
SELECT * FROM "SellerProfile";
```

---

## 🔧 TROUBLESHOOTING

### Error: "relation 'User' does not exist"
**Cause**: Belum jalankan step 1 (create tables)
**Fix**: Run `supabase_create_tables.sql` dulu

### Error: "unique constraint violated"
**Cause**: Data sudah ada
**Fix**: Gunakan `ON CONFLICT DO NOTHING` (sudah include)

### Error: "foreign key constraint failed"
**Cause**: Insert order salah
**Fix**: Pastikan insert User dulu, baru SellerProfile

---

## 📊 ALTERNATIVE: Using Prisma Migrate (Recommended)

Jika 2-step SQL ribet, gunakan Prisma Migrate:

```bash
# 1. Generate migration
npx prisma migrate dev --name init

# 2. Seed data
npx prisma db seed
```

Tapi ini membutuhga local setup PostgreSQL/connection ke Supabase.

---

## 🎯 POST-MIGRATION

Setelah berhasil:
1. Update .env.local dengan DATABASE_URL
2. Deploy ke Vercel
3. Test login dengan:
   - seller@maritani.com / seller123
   - buyer@maritani.com / buyer123

## 📝 NOTES

- Products TIDAK di-migrate (gunakan dummy data)
- Hanya Users dan SellerProfiles untuk authentication
- Password sudah di-hash dengan bcrypt
