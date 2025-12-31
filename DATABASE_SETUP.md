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

Bank soal UTBK:

```sql
- id (UUID)
- category (matematika, bahasa-indonesia, bahasa-inggris, tps)
- subcategory (Aljabar, Geometri, Tata Bahasa, etc)
- difficulty (easy, medium, hard)
- question (text)
- options (JSONB array)
- correct_answer (A-E)
- explanation
- source (curated, ai-generated, utbk-2024, etc)
- verified (boolean)
- usage_count, correct_rate
```

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

## Next Steps

After database setup:

1. ✅ Update game page to fetch questions from Supabase - **DONE**
2. ✅ Update game page to save results to Supabase - **DONE**
3. ✅ Update leaderboard to fetch from global_leaderboard - **DONE**
4. ✅ Update profile to fetch from profiles table - **DONE**
5. ✅ Update dashboard to detect login status - **DONE**
6. ✅ Update navbar with Supabase auth - **DONE**
7. ✅ Update LeaderboardCard with real-time data - **DONE**
8. 🔥 Add more questions (target: 500+) with UTBK sections - **IN PROGRESS** (10/500)
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

```sql
-- ============================================
-- NEW TABLE: Try-Out Sessions
-- ============================================
CREATE TABLE IF NOT EXISTS tryout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,

  -- Session Info
  test_type VARCHAR(20) NOT NULL, -- 'tps-only', 'saintek', 'soshum', 'campuran'
  status VARCHAR(20) DEFAULT 'in-progress', -- 'in-progress', 'completed', 'abandoned'

  -- Timing
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  total_time_spent INTEGER, -- in seconds

  -- Overall Scores (IRT-based, 0-1000 per section)
  tps_score INTEGER,
  skolastik_score INTEGER,
  final_score INTEGER, -- average of both

  -- Section breakdown (JSONB for flexibility)
  section_scores JSONB,
  /* Example:
  {
    "penalaran_umum": {"score": 667, "correct": 15, "total": 20, "time": 1800},
    "kuantitatif": {"score": 720, "correct": 12, "total": 15, "time": 1200},
    "penalaran_matematika": {"score": 580, "correct": 13, "total": 20, "time": 1650},
    ...
  }
  */

  -- Question IDs used (for review)
  questions_used JSONB,

  -- User answers (for detailed review)
  user_answers JSONB,
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

ALTER TABLE questions ADD COLUMN IF NOT EXISTS utbk_section VARCHAR(50);
/* Valid values:
  TPS: 'penalaran-umum', 'kuantitatif', 'penalaran-matematika',
       'literasi-indonesia', 'literasi-inggris'
  SAINTEK: 'matematika', 'fisika', 'kimia', 'biologi'
  SOSHUM: 'sejarah', 'geografi', 'sosiologi', 'ekonomi'
*/

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
  'tps',
  'Penalaran Umum',
  'medium',
  10,                           -- Medium weight
  'penalaran-umum',            -- UTBK section
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
