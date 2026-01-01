# ✅ Panduan Validasi & Insert Soal UTBK

## 📋 Checklist Validasi Sebelum Insert

Gunakan checklist ini untuk setiap batch soal sebelum insert ke database:

### **1. Struktur Field Wajib**

- [ ] `category` - sesuai dengan salah satu: pu, pk, ppu, pbm, lbi, lbe, pm
- [ ] `subcategory` - relevan dengan kategori (contoh: Analogi, Aljabar, Ide Pokok, dll)
- [ ] `difficulty` - hanya 'easy', 'medium', atau 'hard'
- [ ] `difficulty_weight` - **8** (easy), **10** (medium), **12** (hard)
- [ ] `utbk_section` - sesuai mapping kategori
- [ ] `question_text` - soal jelas, lengkap, tidak ambigu
- [ ] `options` - JSONB array dengan 5 opsi A-E
- [ ] `correct_answer` - huruf kapital A, B, C, D, atau E
- [ ] `explanation` - penjelasan lengkap kenapa jawaban benar
- [ ] `verified` - set **true** setelah validasi
- [ ] `source` - sumber soal (contoh: 'pdf-utbk-2025')

### **2. Validasi Format Options**

Contoh format BENAR:

```json
[
  { "label": "A", "text": "Pilihan A" },
  { "label": "B", "text": "Pilihan B" },
  { "label": "C", "text": "Pilihan C" },
  { "label": "D", "text": "Pilihan D" },
  { "label": "E", "text": "Pilihan E" }
]
```

**Cek:**

- [ ] Semua label A-E ada
- [ ] Format JSON valid (tidak ada typo)
- [ ] Semua opsi punya `label` dan `text`
- [ ] Tanda kutip dan koma benar

### **3. Validasi Correct Answer**

- [ ] Huruf kapital: A, B, C, D, atau E (bukan lowercase, bukan angka)
- [ ] Sesuai dengan perhitungan/logika di `explanation`
- [ ] Cek kembali: apakah label opsi yang benar sudah sesuai?

**Contoh Error Umum:**

```sql
-- ❌ SALAH
correct_answer = 'B'  -- tapi di explanation: "x = 5, jadi opsi C"

-- ✅ BENAR
correct_answer = 'C'  -- sesuai explanation dan perhitungan
```

### **4. Validasi Difficulty Weight**

- [ ] `difficulty_weight` hanya boleh 8, 10, atau 12
- [ ] Sesuai dengan `difficulty`:
  - easy → 8
  - medium → 10
  - hard → 12

**❌ SALAH:** `difficulty_weight = 15` (tidak ada nilai ini!)  
**✅ BENAR:** `difficulty_weight = 12` (untuk hard question)

### **5. Validasi Matematika (PK, PM)**

Untuk soal matematika/kuantitatif:

- [ ] Hitung ulang secara manual
- [ ] Cek apakah `correct_answer` sesuai hasil perhitungan
- [ ] Pastikan semua opsi A-E berbeda dan masuk akal
- [ ] Jelaskan langkah perhitungan di `explanation`

**Contoh Validasi:**

```
Soal: Jika 3x − 7 = 11, maka nilai x adalah...
Opsi: A) 4, B) 5, C) 6, D) 7, E) 8

Validasi:
3x - 7 = 11
3x = 18
x = 6

Correct Answer: 'C' ✅
```

### **6. Validasi Pola/Logika (PU)**

Untuk soal pola huruf/angka:

- [ ] Hitung ulang pola secara manual
- [ ] Cek posisi huruf di alphabet (A=1, B=2, ..., Z=26)
- [ ] Verifikasi urutan/rumus pola

**Contoh Error Umum:**

```
Soal: M, N, O, P, ?
Pattern: +1 setiap langkah

❌ SALAH: M → S (lompat 6)
✅ BENAR: M → N → O → P → Q
```

### **7. Validasi Stimulus (LBI, LBE, PBM, PM, PPU)**

Untuk soal dengan bacaan bersama:

- [ ] Panjang stimulus: 180-250 kata (standar SNBT 2025)
- [ ] Struktur: 3-4 paragraf untuk literasi
- [ ] Bahasa formal dan akademis
- [ ] Gunakan format CTE dengan UNION ALL
- [ ] Semua soal merujuk ke stimulus yang sama

**PENTING:** Table `question_stimulus` hanya punya column:

- `id` (UUID)
- `title` (VARCHAR)
- `content` (TEXT)
- `created_at` (TIMESTAMP)

❌ **TIDAK ADA:** source, image_url, stimulus_type, section

### **8. Validasi SQL Syntax**

- [ ] Format CTE benar (untuk soal dengan stimulus)
- [ ] UNION ALL syntax valid
- [ ] Tanda kutip single (') untuk string
- [ ] ::jsonb untuk cast JSON
- [ ] Tidak ada typo di column name
- [ ] Semicolon (;) di akhir query

---

## 🔍 Common Errors & Solutions

### **Error 1: Difficulty Weight Salah**

**Error:**

```sql
difficulty_weight = 15  -- SALAH!
```

**Solution:**

```sql
difficulty_weight = 12  -- BENAR (untuk hard question)
```

**Mapping:**

- Easy → 8
- Medium → 10
- Hard → 12

---

### **Error 2: Answer Key Tidak Sesuai**

**Error:**

```sql
-- Perhitungan: x = 6
correct_answer = 'B'  -- tapi opsi B adalah 5 (SALAH!)
```

**Solution:**

```sql
-- Perhitungan: x = 6
-- Opsi C: "6"
correct_answer = 'C'  -- BENAR
```

**Cara Validasi:**

1. Hitung soal secara manual
2. Cari hasil di opsi A-E
3. Pastikan label yang dipilih sesuai

---

### **Error 3: Stimulus Column Tidak Ada**

**Error:**

```sql
INSERT INTO question_stimulus (title, content, source)  -- 'source' tidak ada!
VALUES ('Judul', 'Konten', 'pdf-utbk-2025');
```

**Solution:**

```sql
INSERT INTO question_stimulus (title, content)  -- BENAR
VALUES ('Judul', 'Konten');
```

**Struktur Benar:**

- ✅ id (auto-generated)
- ✅ title
- ✅ content
- ✅ created_at (auto-generated)

---

### **Error 4: Pola Huruf Salah**

**Error:**

```sql
-- Soal: M, ?, S, U, W
-- Jawaban: N (M → N lompat 1, tapi N → S lompat 5?)
```

**Solution:**

```sql
-- Pattern: +2, +2, +2, +2
-- M (13) → O (15) → Q (17) → S (19) → U (21) → W (23)
-- Jawaban yang benar: O atau Q (tergantung posisi ?)
```

**Cara Validasi Pola Huruf:**

1. Konversi huruf ke angka (A=1, B=2, ..., Z=26)
2. Cari pola (+1, +2, ×2, dll)
3. Hitung ulang semua posisi
4. Cek apakah answer key sesuai

---

### **Error 5: JSONB Format Salah**

**Error:**

```sql
options = '[
  {"label":"A", text:"Pilihan A"},  -- Missing quotes around "text"
  {"label":"B", "text":"Pilihan B"}
]'::jsonb
```

**Solution:**

```sql
options = '[
  {"label":"A", "text":"Pilihan A"},  -- BENAR
  {"label":"B", "text":"Pilihan B"}
]'::jsonb
```

**Validation Tips:**

- Gunakan JSON validator online
- Cek semua tanda kutip
- Cek semua koma
- Pastikan format key-value benar

---

## 📊 Workflow Validasi

### **Step 1: Pre-Insert Validation**

1. Baca soal dari PDF
2. Hitung/verifikasi jawaban secara manual
3. Buat SQL dengan format yang benar
4. Cek semua field wajib
5. Validasi dengan checklist di atas

### **Step 2: Run Query**

1. Copy SQL ke Supabase SQL Editor
2. Run query
3. Cek error message (jika ada)

### **Step 3: Post-Insert Validation**

```sql
-- Cek soal yang baru diinsert
SELECT
  id, category, subcategory, difficulty, difficulty_weight,
  question_text, correct_answer, verified
FROM questions
WHERE source = 'pdf-utbk-2025'
ORDER BY created_at DESC
LIMIT 10;
```

### **Step 4: Spot Check**

1. Pilih 2-3 soal random
2. Hitung ulang secara manual
3. Cek apakah `correct_answer` sesuai
4. Verifikasi explanation

---

## 📈 Validation Statistics (Dari 350 Soal)

### **Jenis Error yang Sering Terjadi:**

| Error Type               | Frequency | Impact   |
| ------------------------ | --------- | -------- |
| Answer key salah         | 40+ kasus | Critical |
| `difficulty_weight` = 15 | 60+ kasus | High     |
| Stimulus column error    | 10+ kasus | Medium   |
| Pola huruf salah         | 5+ kasus  | Critical |
| JSONB format error       | 3+ kasus  | Low      |

### **Lessons Learned:**

- ✅ **Validasi matematika manual WAJIB** sebelum insert
- ✅ **Correct answer letter** adalah field paling error-prone
- ✅ **difficulty_weight** hanya boleh 8/10/12 (tidak ada nilai lain)
- ✅ **question_stimulus table** struktur berbeda dengan questions table
- ✅ **Pola huruf/angka** harus dihitung ulang, jangan asal

---

## 🎯 Target Quality Metrics

Untuk 350 soal yang sudah diinsert:

- ✅ **100% verified** - semua soal divalidasi manual
- ✅ **0% error rate** - semua error sudah diperbaiki
- ✅ **100% format compliance** - mengikuti standar SNBT 2025
- ✅ **Mathematically correct** - semua perhitungan diverifikasi

**Standar kualitas ini harus dipertahankan untuk soal-soal berikutnya!**

---

## 📚 Resources

- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Panduan setup database lengkap
- [PROGRESS.md](./PROGRESS.md) - Status progress project
- [supabase-schema.sql](./supabase-schema.sql) - Database schema lengkap
- [migration-utbk-categories.sql](./migration-utbk-categories.sql) - Migration script

---

## 🔥 Quick Reference

**Format Standalone:**

```sql
INSERT INTO questions (...) VALUES
('pu','Analogi','medium',10,'penalaran-umum',
'Soal...', NULL, '[...]'::jsonb, 'A', 'Penjelasan...',
NULL, 'pdf-utbk-2025', true);
```

**Format dengan Stimulus:**

```sql
WITH new_stimulus AS (
  INSERT INTO question_stimulus (title, content)
  VALUES ('Judul', 'Konten 180-250 kata...')
  RETURNING id
)
INSERT INTO questions (...)
SELECT 'lbi','Ide Pokok','medium',10,'literasi-bahasa-indonesia',
  'Soal 1...', NULL, '[...]'::jsonb, 'B', 'Penjelasan...',
  new_stimulus.id, 'pdf-utbk-2025', true
FROM new_stimulus

UNION ALL

SELECT 'lbi','Informasi Tersurat','medium',10,'literasi-bahasa-indonesia',
  'Soal 2...', NULL, '[...]'::jsonb, 'C', 'Penjelasan...',
  new_stimulus.id, 'pdf-utbk-2025', true
FROM new_stimulus;
```

**Difficulty Weight:**

- Easy → 8
- Medium → 10
- Hard → 12
