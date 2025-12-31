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
8. 🔥 Add more questions (target: 500+) - **IN PROGRESS** (10/500)

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
