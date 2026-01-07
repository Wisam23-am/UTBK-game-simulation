# 🗄️ Database Setup Instructions

## Step 1: Run Database Schema

1. Buka [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project: **yvmfjurfcrqjtbgecyhf**
3. Klik **SQL Editor** di sidebar kiri
4. Klik **New Query**
5. Copy semua isi dari `supabase-schema.sql`
6. Paste ke SQL Editor
7. Klik **Run** (atau tekan Ctrl+Enter)

✅ Database akan otomatis membuat:

- Table `profiles` (user data)
- Table `questions` (bank soal)
- Table `game_results` (hasil game)
- Materialized View `global_leaderboard` (top 100)
- 10 sample questions (5 Matematika, 5 Bahasa Indonesia)

---

## Step 2: Verify Database

Setelah run schema, verify dengan query ini di SQL Editor:

```sql
-- Check tables
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'questions', COUNT(*) FROM questions
UNION ALL
SELECT 'game_results', COUNT(*) FROM game_results;

-- Check sample questions
SELECT category, difficulty, COUNT(*) as count
FROM questions
WHERE verified = true
GROUP BY category, difficulty
ORDER BY category, difficulty;
```

Expected output:

```
profiles: 0 (belum ada user)
questions: 10 (sample questions)
game_results: 0 (belum ada game dimainkan)
```

---

## Step 3: Test Authentication

1. Buka aplikasi: `npm run dev`
2. Klik **Register** atau buka `/register`
3. Daftar dengan:
   - Email: test@example.com
   - Password: password123
   - Username: TestUser
4. Check di Supabase Dashboard → **Authentication** → Users
5. Check di Supabase Dashboard → **Table Editor** → profiles

✅ User baru harus muncul di kedua tempat

---

## Database Structure

### Tables

#### 1. `profiles`

User profile dengan game statistics:

```sql
- id (UUID, FK to auth.users)
- username (unique)
- full_name
- avatar_url
- school
- target_university
- total_games (auto-update)
- best_score (auto-update)
- created_at, updated_at
```

#### 2. `questions`

Bank soal UTBK dengan struktur terbaru (UTBK 2024+):

**Status Soal: 350 Soal Verified ✅**

**Game Mode Target (15 soal per game):**

| Kategori                           | Jumlah | Target Game | Status  |
| ---------------------------------- | ------ | ----------- | ------- |
| PU (Penalaran Umum)                | 50     | 3           | ✅ OK   |
| PK (Pengetahuan Kuantitatif)       | 50     | 2           | ✅ OK   |
| PPU (Pengetahuan & Pemahaman Umum) | 50     | 2           | ✅ OK   |
| PBM (Pemahaman Bacaan & Menulis)   | 50     | 2           | ✅ OK   |
| LBI (Literasi Bahasa Indonesia)    | 50     | 2           | ✅ OK   |
| LBE (Literasi Bahasa Inggris)      | 50     | 2           | ✅ OK   |
| PM (Penalaran Matematika)          | 50     | 2           | ✅ OK   |

**Try-Out Mode Target (160 soal per Try-Out - Rabu & Minggu):**

| Kategori                           | Jumlah | Target Try-Out | Status     |
| ---------------------------------- | ------ | -------------- | ---------- |
| PU (Penalaran Umum)                | 50     | 30             | ⚠️ Need 30 |
| PPU (Pengetahuan & Pemahaman Umum) | 50     | 20             | ✅ OK      |
| PBM (Pemahaman Bacaan & Menulis)   | 50     | 20             | ✅ OK      |
| PK (Pengetahuan Kuantitatif)       | 50     | 20             | ✅ OK      |
| LBI (Literasi Bahasa Indonesia)    | 50     | 30             | ⚠️ Need 30 |
| LBE (Literasi Bahasa Inggris)      | 50     | 20             | ✅ OK      |
| PM (Penalaran Matematika)          | 50     | 20             | ✅ OK      |

**Struktur Database:**

```sql
- id (UUID)
- category (pu, pk, ppu, pbm, lbi, lbe, pm)
  * pu  = Penalaran Umum
  * pk  = Pengetahuan Kuantitatif
  * ppu = Pengetahuan & Pemahaman Umum
  * pbm = Pemahaman Bacaan & Menulis
  * lbi = Literasi Bahasa Indonesia
  * lbe = Literasi Bahasa Inggris
  * pm  = Penalaran Matematika
- subcategory (Aljabar, Penalaran Induktif, Tata Bahasa, etc)
- difficulty (easy, medium, hard)
- difficulty_weight (8=easy, 10=medium, 12=hard untuk IRT scoring)
- utbk_section (penalaran-umum, literasi-bahasa-indonesia, etc)
- question (text)
- question_image_url (URL gambar/diagram soal, optional)
- options (JSONB array dengan format [{"label":"A","text":"..."}, ...])
- correct_answer (A-E)
- explanation (penjelasan lengkap dengan perhitungan + **trik cepat untuk PK/PM**)
- stimulus_id (FK to question_stimulus untuk soal dengan bacaan bersama)
- source (pdf-utbk-2024, pdf-utbk-2025-wangsit, etc)
- verified (boolean, semua soal sudah verified)
- usage_count, correct_rate (auto-update)
```

**⚡ PENTING - Prinsip Trik Cepat SNBT:**

Khusus untuk **PK (Pengetahuan Kuantitatif)**, **PU (Penalaran Umum)**, dan **PM (Penalaran Matematika)**:

- ✅ Soal harus punya **jalur trik cepat** (< 1 menit)
- ✅ Angka dipilih **strategis** (proporsional, bulat, pattern)
- ✅ Explanation harus mention trik cepat + jalur normal
- ✅ **TIDAK boleh** angka random tanpa alasan

**Contoh:**
- Ratio 3:5 dengan total 800 → 800 habis dibagi 8 (sengaja!)
- 99 × 97 → dekat dengan 100² (ada trik!)
- 36 siswa, ratio 5:7 → 36 habis dibagi 12 (ada pola!)

See [SOAL-CREATION-GUIDE.md](SOAL-CREATION-GUIDE.md) untuk detail lengkap!

#### 2B. `question_stimulus`

Bacaan/stimulus bersama untuk multiple questions (digunakan oleh LBI, LBE, PBM, PM):

```sql
- id (UUID)
- title (judul stimulus, contoh: "Ketepatan Bahasa dalam Komunikasi Publik")
- content (teks panjang/passage, 180-250 kata untuk standar SNBT 2025)
- created_at
```

**Catatan Penting:**

- Tabel ini **TIDAK PUNYA** kolom `source`, `image_url`, `stimulus_type`, atau `section`
- Digunakan untuk kategori dengan stimulus: LBI, LBE, PBM, PM
- 1 stimulus dapat digunakan oleh 5-10 soal
- Panjang standar: 180-250 kata (SNBT 2025)

#### 3. `game_results`

Individual game session results:

```sql
- id (UUID)
- user_id (FK to auth.users)
- score
- correct_answers
- wrong_answers
- total_questions
- time_spent (seconds)
- category, difficulty
- created_at
```

#### 4. `global_leaderboard` (Materialized View)

Top 100 players:

```sql
- id, username, full_name, avatar_url
- school, target_university
- best_score, total_games, avg_score
- total_correct, rank
```

---

## Features

### ✅ Auto-Update Profile Stats

Setiap kali user menyelesaikan game, `total_games` dan `best_score` di profile otomatis update via trigger.

### ✅ Auto-Refresh Leaderboard

Leaderboard materialized view otomatis refresh setiap ada game result baru.

### ✅ Row Level Security (RLS)

- ✅ Everyone can view profiles & questions
- ✅ Users can only insert their own game results
- ✅ Users can only update their own profile

### ✅ Indexes for Performance

- Game results indexed by user_id & score
- Questions indexed by category & difficulty

---

## 📊 Question Requirements Analysis

### **Current Status: 350 Soal Verified**

### **Game Mode (READY ✅):**

| Kategori | Stock | Need/Game | Games Available |
|----------|-------|-----------|-----------------|
| PU       | 50    | 3         | ~16 games       |
| PK       | 50    | 2         | ~25 games       |
| PPU      | 50    | 2         | ~25 games       |
| PBM      | 50    | 2         | ~25 games       |
| LBI      | 50    | 2         | ~25 games       |
| LBE      | 50    | 2         | ~25 games       |
| PM       | 50    | 2         | ~25 games       |

**Status:** ✅ Ready (dapat support 16+ unique games)

### **Try-Out Mode (PERLU PENAMBAHAN):**

| Kategori | Stock | Need/Try-Out | Try-Outs Available | Need to Add |
|----------|-------|--------------|-------------------|-------------|
| PU       | 50    | 30           | ~1.6 Try-Outs     | ⚠️ +100 soal |
| PPU      | 50    | 20           | ~2.5 Try-Outs     | ✅ OK       |
| PBM      | 50    | 20           | ~2.5 Try-Outs     | ✅ OK       |
| PK       | 50    | 20           | ~2.5 Try-Outs     | ✅ OK       |
| LBI      | 50    | 30           | ~1.6 Try-Outs     | ⚠️ +100 soal |
| LBE      | 50    | 20           | ~2.5 Try-Outs     | ✅ OK       |
| PM       | 50    | 20           | ~2.5 Try-Outs     | ✅ OK       |

**Target:** 8 Try-Outs per bulan (2 per minggu × 4 minggu)

**Rekomendasi:**
- ⚠️ **Priority High:** Tambah **100 soal PU** (total jadi 150)
- ⚠️ **Priority High:** Tambah **100 soal LBI** (total jadi 150)
- ✅ Kategori lain sudah cukup untuk 2-3 Try-Outs

**Dengan penambahan:**
- PU: 150 soal → 5 Try-Outs
- LBI: 150 soal → 5 Try-Outs
- Total capacity: **5 Try-Outs unik** (cukup untuk 1+ bulan)

---

## Next Steps

After database setup:

1. ✅ Update game page to fetch questions from Supabase - **DONE**
2. ✅ Update game page to save results to Supabase - **DONE**
3. ✅ Update leaderboard to fetch from global_leaderboard - **DONE**
4. ✅ Update profile to fetch from profiles table - **DONE**
5. ✅ Update dashboard to detect login status - **DONE**
6. ✅ Update navbar with Supabase auth - **DONE**
7. ✅ Update LeaderboardCard with real-time data - **DONE**
8. ✅ Add more questions (target: 350+) with UTBK sections - **COMPLETE** (350/350)
9. 🎯 Implement Try-Out Mode (Phase 3B) - **PLANNED**
10. ⚡ Implement Enhanced Game Mode (Phase 3A) - **PLANNED**

---

## Phase 3: Database Schema Updates (PLANNED)

### For Enhanced Game Mode (Phase 3A):

```sql
-- Add bonus columns to game_results
ALTER TABLE game_results ADD COLUMN IF NOT EXISTS mode VARCHAR(20) DEFAULT 'game';
-- Values: 'game' or 'practice'

ALTER TABLE game_results ADD COLUMN IF NOT EXISTS speed_bonus INTEGER DEFAULT 0;
ALTER TABLE game_results ADD COLUMN IF NOT EXISTS streak_bonus INTEGER DEFAULT 0;
```

### For Try-Out Mode (Phase 3B):

**Format Baru (January 7, 2026):**
- Try-Out dijadwalkan setiap **Rabu & Minggu**
- **2 Pilihan:** TPS (90 soal) atau Literasi (70 soal)
- User dapat memilih salah satu atau kedua Try-Out
- IRT Scoring dengan **dynamic difficulty**

**A. TPS (Tes Potensi Skolastik) - Total 90 soal, 135 menit:**

| Kategori | Jumlah Soal | Waktu |
|----------|-------------|-------|
| PU (Penalaran Umum) | 30 soal | **45 menit** |
| PPU (Pengetahuan & Pemahaman Umum) | 20 soal | **30 menit** |
| PBM (Pemahaman Bacaan & Menulis) | 20 soal | **30 menit** |
| PK (Pengetahuan Kuantitatif) | 20 soal | **30 menit** |
| **TOTAL TPS** | **90 soal** | **135 menit** |

**B. Literasi - Total 70 soal, 75 menit:**

| Kategori | Jumlah Soal | Waktu |
|----------|-------------|-------|
| LBI (Literasi Bahasa Indonesia) | 30 soal | **30 menit** |
| LBE (Literasi Bahasa Inggris) | 20 soal | **30 menit** |
| PM (Penalaran Matematika) | 20 soal | **15 menit** |
| **TOTAL Literasi** | **70 soal** | **75 menit** |

**IRT Scoring System:**

Item Response Theory (IRT) adalah model statistik untuk scoring yang lebih **fair** berdasarkan kesulitan soal dan performa peserta lain.

**Formula:**
```javascript
// Per soal:
difficulty_factor = difficulty_weight // 8 (easy), 10 (medium), 12 (hard)
rarity_bonus = 1 + (1 - correct_rate) // correct_rate dari database

// Point per soal:
points = difficulty_factor × rarity_bonus

// Contoh:
// Soal Hard (weight=12), correct_rate=30% → points = 12 × 1.7 = 20.4
// Soal Medium (weight=10), correct_rate=70% → points = 10 × 1.3 = 13
// Soal Easy (weight=8), correct_rate=90% → points = 8 × 1.1 = 8.8

// Total score per section (scaled 200-1000):
raw_score = Σ points
max_possible = Σ (12 × 2) // asumsi semua hard, correct_rate=0%
scaled_score = 200 + (raw_score / max_possible) × 800
```

**Kenapa IRT?**
- Soal yang **susah** (banyak dijawab salah) → nilai benar lebih tinggi
- Soal yang **mudah** (hampir semua benar) → nilai benar lebih rendah
- **Fair** untuk semua peserta, tidak tergantung luck
- Update real-time berdasarkan `usage_count` dan `correct_rate`

```sql
-- ============================================
-- NEW TABLE: Try-Out Sessions (Scheduled)
-- ============================================
CREATE TABLE IF NOT EXISTS tryout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,

  -- Session Info
  test_type VARCHAR(20) NOT NULL, -- 'tps' atau 'literasi'
  scheduled_date DATE NOT NULL, -- Rabu atau Minggu
  status VARCHAR(20) DEFAULT 'in-progress', -- 'in-progress', 'completed', 'abandoned'

  -- Timing
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  total_time_spent INTEGER, -- in seconds (max 8100 for TPS / 4500 for Literasi)

  -- Overall Scores (IRT-based, scaled 200-1000)
  -- For TPS: average dari 4 sections (PU, PPU, PBM, PK)
  -- For Literasi: average dari 3 sections (LBI, LBE, PM)
  final_score INTEGER, -- Average dari semua sections dalam test_type

  -- Section breakdown (JSONB for flexibility)
  section_scores JSONB,
  /* Example untuk TPS (test_type = 'tps'):
  {
    "pu": {"score": 667, "correct": 22, "total": 30, "time": 2550, "raw_points": 385.4, "max_time": 2700},
    "ppu": {"score": 720, "correct": 16, "total": 20, "time": 1680, "raw_points": 189.2, "max_time": 1800},
    "pbm": {"score": 580, "correct": 13, "total": 20, "time": 1750, "raw_points": 152.8, "max_time": 1800},
    "pk": {"score": 650, "correct": 14, "total": 20, "time": 1620, "raw_points": 168.5, "max_time": 1800}
  }
  
  Example untuk Literasi (test_type = 'literasi'):
  {
    "lbi": {"score": 750, "correct": 25, "total": 30, "time": 1680, "raw_points": 428.6, "max_time": 1800},
    "lbe": {"score": 680, "correct": 15, "total": 20, "time": 1720, "raw_points": 185.3, "max_time": 1800},
    "pm": {"score": 620, "correct": 13, "total": 20, "time": 830, "raw_points": 158.7, "max_time": 900}
  }
  */

  -- Question IDs used (for review)
  questions_used JSONB,

  -- User answers (for detailed review with IRT points)
  user_answers JSONB,
  /* Example:
  [
    {
      "question_id": "uuid-xxx",
      "user_answer": "B",
      "correct_answer": "B",
      "is_correct": true,
      "time_spent": 45,
      "difficulty_weight": 12,
      "correct_rate": 0.35,
      "points_earned": 19.8 // = 12 × (1 + 0.65)
    },
    {
      "question_id": "uuid-yyy",
      "user_answer": "C",
      "correct_answer": "A",
      "is_correct": false,
      "time_spent": 62,
      "difficulty_weight": 10,
      "correct_rate": 0.68,
      "points_earned": 0
    }
  ]
  */

  -- IRT Metadata (untuk analytics)
  irt_metadata JSONB,
  /* Example:
  [
    {"question_id": "uuid", "section": "penalaran_umum", "answer": "B",
     "is_correct": true, "time_spent": 45},
    ...
  ]
  */

  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- UPDATE: Questions table for Try-Out Mode
-- ============================================
ALTER TABLE questions ADD COLUMN IF NOT EXISTS difficulty_weight INTEGER DEFAULT 10;
-- Easy: 8, Medium: 10, Hard: 12

ALTER TABLE questions ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;
-- Track berapa kali soal ini digunakan di Try-Out

ALTER TABLE questions ADD COLUMN IF NOT EXISTS correct_rate DECIMAL DEFAULT 0.5;
-- Track persentase peserta yang jawab benar (0.0 - 1.0)

ALTER TABLE questions ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);
-- NEW: Subcategory untuk material rotation
/* Examples:
  PU: 'penarikan-kesimpulan', 'sebab-akibat', 'silogisme', 'pola-bilangan'
  PPU: 'makna-kata', 'ide-pokok', 'sinonim-antonim', 'kalimat-efektif'
  PBM: 'ide-pokok', 'simpulan', 'struktur-teks', 'penilaian-argumen'
  PK: 'hitung-cepat', 'logaritma', 'geometri', 'statistika'
  LBI: 'teks-argumentasi', 'teks-narasi', 'inferensi'
  LBE: 'main-idea', 'vocabulary', 'inference'
  PM: 'soal-cerita', 'grafik-tabel', 'pemodelan'
  
  See TRYOUT-MATERIALS-ROTATION.md untuk daftar lengkap
*/

ALTER TABLE questions ADD COLUMN IF NOT EXISTS utbk_section VARCHAR(50);
/* Valid values:
  TPS: 'penalaran-umum', 'kuantitatif', 'penalaran-matematika',
       'literasi-indonesia', 'literasi-inggris'
  SAINTEK: 'matematika', 'fisika', 'kimia', 'biologi'
  SOSHUM: 'sejarah', 'geografi', 'sosiologi', 'ekonomi'
*/

-- ============================================
-- NEW TABLE: Try-Out Material Usage (Rotation Tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS tryout_material_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tryout_date DATE NOT NULL, -- Rabu atau Minggu
  test_type VARCHAR(20) NOT NULL, -- 'tps' atau 'literasi'
  category VARCHAR(10) NOT NULL, -- 'pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm'
  subcategories_used JSONB NOT NULL, -- Array of subcategories used
  /* Example:
  {
    "wajib": ["penarikan-kesimpulan", "hubungan-pernyataan", "konsistensi-logika"],
    "rotasi": ["sebab-akibat", "silogisme", "pola-gambar"]
  }
  */
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Constraint: unique per date, test_type, category
  UNIQUE(tryout_date, test_type, category)
);

-- Index untuk query cepat
CREATE INDEX idx_material_usage ON tryout_material_usage(tryout_date, test_type, category);

-- ============================================
-- INDEXES for Try-Out
-- ============================================
CREATE INDEX IF NOT EXISTS idx_tryout_user ON tryout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_tryout_status ON tryout_sessions(status);
CREATE INDEX IF NOT EXISTS idx_tryout_completed ON tryout_sessions(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_section ON questions(utbk_section);

-- ============================================
-- ROW LEVEL SECURITY for Try-Out
-- ============================================
ALTER TABLE tryout_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own try-out results (PRIVATE)
CREATE POLICY "Users can view own tryout sessions"
  ON tryout_sessions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tryout sessions"
  ON tryout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tryout sessions"
  ON tryout_sessions FOR UPDATE USING (auth.uid() = user_id);
```

---

**Last Updated:** January 4, 2026

### ✅ Database Migration Applied (January 4, 2026)

- ✅ Leaderboard ranking updated: Score → Correct → Time
- ✅ Added `best_time` column to global_leaderboard
- ✅ Improved tiebreaker logic for fair rankings

---

## 📊 UTBK 2024+ Category Structure & Format Soal

### **Status Kategori (COMPLETE):**

| **category** | **utbk_section**             | **Nama Lengkap**             | **Jumlah** | **Target** | **Status** |
| ------------ | ---------------------------- | ---------------------------- | ---------- | ---------- | ---------- |
| `pu`         | `penalaran-umum`             | Penalaran Umum               | 50         | 20         | ✅ 250%    |
| `pk`         | `pengetahuan-kuantitatif`    | Pengetahuan Kuantitatif      | 50         | 30         | ✅ 167%    |
| `ppu`        | `pengetahuan-pemahaman-umum` | Pengetahuan & Pemahaman Umum | 50         | 20         | ✅ 250%    |
| `pbm`        | `pemahaman-bacaan-menulis`   | Pemahaman Bacaan & Menulis   | 50         | 20         | ✅ 250%    |
| `lbi`        | `literasi-bahasa-indonesia`  | Literasi Bahasa Indonesia    | 50         | 15         | ✅ 333%    |
| `lbe`        | `literasi-bahasa-inggris`    | Literasi Bahasa Inggris      | 50         | 15         | ✅ 333%    |
| `pm`         | `penalaran-matematika`       | Penalaran Matematika         | 50         | 20         | ✅ 250%    |

**Total: 350 soal verified ✅**

### **Format Soal Berdasarkan Kategori:**

#### 1. **PU (Penalaran Umum) - STANDALONE**

- **Subcategory:** Analogi, Silogisme, Logika, Deret Angka, Pola Huruf
- **Format:** Soal standalone (tanpa stimulus)
- **Difficulty:** medium/hard
- **Contoh:**

```sql
INSERT INTO questions (...) VALUES
('pu','Analogi','medium',10,'penalaran-umum',
'GURU : SEKOLAH = DOKTER : ...',
NULL,
'[{"label":"A","text":"Pasien"},{"label":"B","text":"Rumah Sakit"}...]'::jsonb,
'B','Relasi profesi dengan tempat kerja.',
NULL,'pdf-utbk-2024',true);
```

#### 2. **PK (Pengetahuan Kuantitatif) - STANDALONE**

- **Subcategory:** Aljabar, Persentase, Perbandingan, Statistika, Geometri
- **Format:** Soal singkat dengan perhitungan langsung (tanpa stimulus)
- **Difficulty:** medium/hard
- **Diagram:** Beberapa soal bisa pakai gambar diagram
- **Contoh:**

```sql
INSERT INTO questions (...) VALUES
('pk','Aljabar','medium',10,'pengetahuan-kuantitatif',
'Jika 3x − 7 = 11, maka nilai x adalah ...',
NULL,
'[{"label":"A","text":"4"},{"label":"B","text":"5"}...]'::jsonb,
'C','3x = 18 → x = 6.',
NULL,'pdf-utbk-2025',true);
```

#### 3. **PPU (Pengetahuan & Pemahaman Umum) - DENGAN STIMULUS**

- **Subcategory:** Kewarganegaraan, Sejarah, Geografi, Ekonomi, Sosiologi
- **Format:** 1 stimulus → 5 soal terkait
- **Panjang stimulus:** 150-200 kata
- **Difficulty:** medium/hard
- **Contoh:**

```sql
WITH new_stimulus AS (
  INSERT INTO question_stimulus (title, content)
  VALUES ('Kebijakan Publik', 'Pemerintah memiliki peran...')
  RETURNING id
)
INSERT INTO questions (..., stimulus_id, ...)
SELECT 'ppu','Kewarganegaraan','medium',10,'pengetahuan-pemahaman-umum',
  'Tujuan kebijakan publik adalah...', NULL, '[...]'::jsonb, 'B', '...',
  new_stimulus.id,'pdf-utbk-2025',true
FROM new_stimulus;
```

#### 4. **PBM (Pemahaman Bacaan & Menulis) - DENGAN STIMULUS**

- **Subcategory:** Gagasan Utama, Informasi Tersurat, Makna Tersirat, Hubungan Antarparagraf
- **Format:** 1 stimulus → 5 soal terkait
- **Panjang stimulus:** 200-250 kata (3-4 paragraf)
- **Bahasa:** Indonesia, formal, akademis
- **Difficulty:** medium/hard

#### 5. **LBI (Literasi Bahasa Indonesia) - DENGAN STIMULUS**

- **Subcategory:** Ide Pokok, Informasi Tersurat, Makna Kata, Keefektifan Kalimat, Simpulan
- **Format:** 1 stimulus → 5 soal terkait
- **Panjang stimulus:** 200-240 kata (4 paragraf)
- **Bahasa:** Indonesia, formal, akademis
- **Difficulty:** medium/hard
- **Standar SNBT 2025:** ✅

#### 6. **LBE (Literasi Bahasa Inggris) - DENGAN STIMULUS**

- **Subcategory:** Main Idea, Explicit Information, Inference, Vocabulary in Context, Conclusion
- **Format:** 1 stimulus → 5 soal terkait
- **Panjang stimulus:** 180-220 kata (4 paragraf)
- **Bahasa:** English, academic writing
- **Difficulty:** medium/hard
- **Standar SNBT 2025:** ✅

#### 7. **PM (Penalaran Matematika) - DENGAN STIMULUS**

- **Subcategory:** Logika, Aljabar, Geometri, Kombinatorik, Probabilitas
- **Format:** 1 stimulus → 5 soal terkait
- **Panjang stimulus:** 100-150 kata (konteks kompleks)
- **Fokus:** Penalaran & analisis, bukan hitung-hitungan sederhana
- **Difficulty:** medium/hard
- **Contoh:**

```sql
WITH new_stimulus AS (
  INSERT INTO question_stimulus (title, content)
  VALUES ('Hubungan Pernyataan Logis',
    'Dalam sistem penalaran: 1) Jika A benar, maka B salah...')
  RETURNING id
)
INSERT INTO questions (..., stimulus_id, ...)
SELECT 'pm','Logika','hard',12,'penalaran-matematika',
  'Jika A benar, maka pernyataan yang PASTI benar...',
  NULL, '[...]'::jsonb, 'C', 'A benar → B salah → C benar.',
  new_stimulus.id,'pdf-utbk-2025',true
FROM new_stimulus;
```

---

## 📝 Format SQL untuk Insert Questions

### **Format Dasar (Standalone)**

Untuk kategori **PU, PK** yang tidak pakai stimulus:

```sql
INSERT INTO questions (
  category, subcategory, difficulty, difficulty_weight, utbk_section,
  question_text, question_image_url, options, correct_answer,
  explanation, stimulus_id, source, verified
) VALUES
('pu', 'Analogi', 'medium', 10, 'penalaran-umum',
 'SOAL : JAWAB = MASALAH : ...',
 NULL,
 '[
   {"label":"A", "text":"Solusi"},
   {"label":"B", "text":"Kesulitan"},
   {"label":"C", "text":"Pemikiran"},
   {"label":"D", "text":"Pertanyaan"},
   {"label":"E", "text":"Kebingungan"}
 ]'::jsonb,
 'A',
 'Relasi soal dengan jawab adalah pertanyaan dan responnya. Masalah dan solusi memiliki relasi yang sama.',
 NULL,
 'pdf-utbk-2025',
 true
);
```

### **Format dengan Stimulus (CTE + UNION ALL)**

Untuk kategori **PPU, PBM, LBI, LBE, PM** yang pakai 1 stimulus → 5 soal:

```sql
WITH new_stimulus AS (
  INSERT INTO question_stimulus (title, content)
  VALUES (
    'Judul Stimulus (30-50 karakter)',
    'Isi stimulus 180-250 kata untuk SNBT 2025.
     Dibagi 3-4 paragraf untuk LBI/LBE/PBM.
     Untuk PM bisa 100-150 kata dengan konteks kompleks.
     PENTING: Jangan terlalu panjang!'
  )
  RETURNING id
)
INSERT INTO questions (
  category, subcategory, difficulty, difficulty_weight, utbk_section,
  question_text, question_image_url, options, correct_answer,
  explanation, stimulus_id, source, verified
)
SELECT 'lbi', 'Ide Pokok', 'medium', 10, 'literasi-bahasa-indonesia',
  'Gagasan utama paragraf pertama adalah...',
  NULL,
  '[
    {"label":"A", "text":"..."},
    {"label":"B", "text":"..."},
    {"label":"C", "text":"..."},
    {"label":"D", "text":"..."},
    {"label":"E", "text":"..."}
  ]'::jsonb,
  'B',
  'Kalimat utama di paragraf 1 menyatakan...',
  new_stimulus.id,
  'pdf-utbk-2025',
  true
FROM new_stimulus

UNION ALL

SELECT 'lbi', 'Informasi Tersurat', 'medium', 10, 'literasi-bahasa-indonesia',
  'Berdasarkan teks, manakah pernyataan yang BENAR?',
  NULL,
  '[...]'::jsonb,
  'C',
  'Paragraf 2 menyebutkan...',
  new_stimulus.id,
  'pdf-utbk-2025',
  true
FROM new_stimulus

UNION ALL

SELECT 'lbi', 'Makna Kata', 'medium', 10, 'literasi-bahasa-indonesia',
  'Kata "signifikan" dalam teks memiliki makna...',
  NULL,
  '[...]'::jsonb,
  'A',
  'Konteks menunjukkan...',
  new_stimulus.id,
  'pdf-utbk-2025',
  true
FROM new_stimulus

-- ... 2 soal lagi hingga total 5 soal
;
```

### **✅ Checklist Sebelum Insert**

Validasi wajib untuk setiap soal:

#### **1. Field Wajib:**

- [x] `category` sesuai tabel (pu, pk, ppu, pbm, lbi, lbe, pm)
- [x] `subcategory` relevan dengan kategori
- [x] `difficulty`: 'easy' / 'medium' / 'hard'
- [x] `difficulty_weight`: **8** (easy), **10** (medium), **12** (hard) ← PENTING!
- [x] `utbk_section` sesuai mapping kategori
- [x] `question_text` jelas dan lengkap
- [x] `options`: JSONB array 5 opsi (A-E)
- [x] `correct_answer`: Huruf A/B/C/D/E
- [x] `explanation` menjelaskan kenapa jawaban benar
- [x] `verified`: **true** setelah validasi
- [x] `source`: 'pdf-utbk-2024', 'pdf-utbk-2025', dll

#### **2. Validasi Khusus:**

**Opsi (options):**

```json
[
  { "label": "A", "text": "Pilihan A" },
  { "label": "B", "text": "Pilihan B" },
  { "label": "C", "text": "Pilihan C" },
  { "label": "D", "text": "Pilihan D" },
  { "label": "E", "text": "Pilihan E" }
]
```

- Wajib 5 opsi A-E
- Format JSON valid
- Semua opsi punya `label` dan `text`

**Correct Answer:**

- Harus huruf kapital: A, B, C, D, atau E
- Harus cocok dengan perhitungan/logika di `explanation`
- ❌ SALAH: '2', 'option_a', 'a'
- ✅ BENAR: 'A'

**Difficulty Weight:**

- ❌ SALAH: 15, 20, null
- ✅ BENAR: 8 (easy), 10 (medium), 12 (hard)

**Stimulus (untuk LBI, LBE, PBM, PM, PPU):**

- Panjang ideal: 180-250 kata
- Struktur: 3-4 paragraf untuk bacaan
- Bahasa formal, akademis
- 1 stimulus → 5 soal terkait
- Gunakan CTE dengan UNION ALL

#### **3. Validasi Matematika (PK, PM):**

- Hitung ulang setiap soal secara manual
- Cek apakah `correct_answer` sesuai hasil perhitungan
- Pastikan opsi A-E unik dan masuk akal
- Jelaskan langkah perhitungan di `explanation`

#### **4. Error Umum yang Sering Terjadi:**

| Error                    | Penyebab                           | Solusi                                                     |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------- |
| `difficulty_weight` = 15 | Salah standar                      | Gunakan 8/10/12                                            |
| Answer key salah         | Perhitungan benar tapi huruf salah | Cek kembali label opsi                                     |
| Stimulus column error    | Insert 'source' ke stimulus table  | Stimulus table hanya punya: id, title, content, created_at |
| Pola huruf salah         | Hitung ulang posisi huruf          | M→N→O... cek urutan alphabet                               |
| JSONB format error       | Tanda kutip/koma salah             | Gunakan JSON validator                                     |

### **🔍 Contoh Error vs Fix**

**❌ ERROR:**

```sql
-- difficulty_weight salah
difficulty_weight = 15  -- SALAH!

-- correct_answer tidak match dengan perhitungan
correct_answer = 'B'  -- tapi di explanation: "x = 5, jadi jawaban C"

-- stimulus punya column yang tidak exist
INSERT INTO question_stimulus (title, content, source)  -- 'source' tidak ada!
```

**✅ FIX:**

```sql
-- difficulty_weight benar
difficulty_weight = 12  -- hard question

-- correct_answer match dengan perhitungan
correct_answer = 'C'  -- sesuai explanation: "x = 5, opsi C"

-- stimulus hanya pakai column yang exist
INSERT INTO question_stimulus (title, content)  -- BENAR!
```

---

### **Format SQL dengan Kategori Baru:**

```sql
-- Contoh soal Penalaran Umum
INSERT INTO questions (
  category, subcategory, difficulty, difficulty_weight,
  utbk_section, question_text, question_image_url, options,
  correct_answer, explanation, stimulus_id, source, verified
) VALUES
('pu', 'Penalaran Induktif', 'medium', 10, 'penalaran-umum',
 'Jika semua A adalah B dan sebagian B adalah C, maka...',
 NULL, -- atau URL gambar jika ada
 '[
   {"label":"A","text":"Semua A adalah C"},
   {"label":"B","text":"Sebagian A adalah C"},
   {"label":"C","text":"Tidak dapat disimpulkan"},
   {"label":"D","text":"Semua C adalah A"},
   {"label":"E","text":"Tidak ada A yang C"}
 ]'::jsonb,
 'C',
 'Dari premis universal dan partikular...',
 NULL, -- atau UUID stimulus jika ada bacaan bersama
 'pdf-utbk-2024',
 true);
```

### **Difficulty Weight (untuk IRT Scoring):**

| **difficulty** | **difficulty_weight** |
| -------------- | --------------------- |
| `easy`         | 8                     |
| `medium`       | 10                    |
| `hard`         | 12                    |

---

## 🖼️ Handling Gambar & Stimulus

### **1. Soal dengan Gambar:**

```sql
-- Upload gambar ke Supabase Storage dulu
-- Storage bucket: 'question-images' (public)
-- Contoh URL: https://[project].supabase.co/storage/v1/object/public/question-images/math_001.png

INSERT INTO questions (..., question_image_url, ...) VALUES
('pm', 'Geometri', 'medium', 10, 'penalaran-matematika',
 'Perhatikan grafik berikut. Luas daerah yang diarsir adalah...',
 'https://yvmfjurfcrqjtbgecyhf.supabase.co/storage/v1/object/public/question-images/math_001.png',
 '[...]'::jsonb,
 'C',
 'Luas = 1/2 × base × height...',
 NULL, 'pdf-utbk-2024', true);
```

### **2. Soal dengan Stimulus (Bacaan Bersama):**

```sql
-- Step 1: Insert stimulus
INSERT INTO question_stimulus (id, title, content, stimulus_type, section) VALUES
('550e8400-e29b-41d4-a716-446655440001',
 'Bacaan 1: Perubahan Iklim Global',
 'Perubahan iklim global merupakan fenomena... [TEKS PANJANG 500+ KATA]',
 'text',
 'literasi-bahasa-indonesia');

-- Step 2: Insert soal yang menggunakan stimulus
INSERT INTO questions (..., stimulus_id, ...) VALUES
('lbi', 'Pemahaman Bacaan', 'medium', 10, 'literasi-bahasa-indonesia',
 'Berdasarkan bacaan di atas, ide pokok paragraf pertama adalah...',
 NULL,
 '[...]'::jsonb,
 'A',
 'Paragraf pertama membahas...',
 '550e8400-e29b-41d4-a716-446655440001', -- stimulus_id SAME
 'pdf-utbk-2024', true),

('lbi', 'Pemahaman Bacaan', 'medium', 10, 'literasi-bahasa-indonesia',
 'Kata "fenomena" pada kalimat pertama bermakna...',
 NULL,
 '[...]'::jsonb,
 'C',
 'Fenomena = kejadian',
 '550e8400-e29b-41d4-a716-446655440001', -- stimulus_id SAME
 'pdf-utbk-2024', true);
```

---

## 🔄 Migrasi Database Existing

Jika database Anda sudah ada dan ingin update ke struktur baru:

**Run file:** `migration-utbk-categories.sql`

```bash
# Buka Supabase SQL Editor
# Copy paste isi migration-utbk-categories.sql
# Run (Ctrl+Enter)
```

Migration akan:

- ✅ Add kolom baru: `difficulty_weight`, `utbk_section`, `question_image_url`, `stimulus_id`
- ✅ Create table `question_stimulus`
- ✅ Add indexes & RLS policies
- ✅ Update existing questions dengan `difficulty_weight`

---

## Question Format for Try-Out Mode

When adding questions for Try-Out Mode, include these fields:

```sql
INSERT INTO questions (
  category,
  subcategory,
  difficulty,
  difficulty_weight,  -- NEW: 8, 10, or 12
  utbk_section,       -- NEW: 'penalaran-umum', etc
  question,
  options,
  correct_answer,
  explanation,
  verified
) VALUES (
  'pu',               -- UPDATED: use new category
  'Penalaran Induktif',
  'medium',
  10,                 -- Medium weight
  'penalaran-umum',   -- UTBK section
  'Jika semua A adalah B...',
  '[
    {"label": "A", "text": "..."},
    {"label": "B", "text": "..."},
    {"label": "C", "text": "..."},
    {"label": "D", "text": "..."},
    {"label": "E", "text": "..."}
  ]'::jsonb,
  'C',
  'Penjelasan lengkap...',
  true
);
```

---

## Troubleshooting

### Error: "relation already exists"

Schema sudah dibuat sebelumnya. Aman untuk ignore atau drop tables dulu:

```sql
DROP TABLE IF EXISTS game_results CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP MATERIALIZED VIEW IF EXISTS global_leaderboard CASCADE;
```

### Error: "permission denied"

Check RLS policies. User harus authenticated untuk insert data.

### Questions tidak muncul

Check `verified` column. Hanya questions dengan `verified = true` yang bisa diakses.

---

**Database Ready!** 🚀 Lanjut ke game integration.
