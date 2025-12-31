# 📋 Progress & Roadmap - UTBK Game Simulation

## ✅ Yang Sudah Selesai

### **Phase 0 - MVP Complete** ✅

#### 1. **Core Features**

- ✅ Halaman Home/Dashboard dengan LeaderboardCard
- ✅ Halaman Login & Register (new clean design)
- ✅ Halaman Profile (dengan edit profile)
- ✅ Halaman Game (timer, scoring, life system) - **UPGRADED TO SUPABASE**
- ✅ Halaman Hasil (dengan feedback + LeaderboardCard)
- ✅ Halaman Leaderboard (dummy data) - **NEXT: Upgrade to real data**
- ✅ Navbar & Footer components
- ✅ LeaderboardCard component (top 5)

#### 2. **UI/UX**

- ✅ Responsive design untuk mobile & desktop
- ✅ Gradient themes konsisten (#3F72AF, #112D4E, #DBE2EF)
- ✅ Animations (slide-up, scale-in, pulse)
- ✅ Hover effects & transitions
- ✅ Mobile-first approach
- ✅ Loading states & error handling
- ✅ Dev mode indicator badge

### **Phase 1 - Database & Supabase Integration** ✅

#### 1. **Supabase Setup** ✅ COMPLETE

- ✅ Dependencies installed (@supabase/ssr, @supabase/supabase-js)
- ✅ Environment variables configured (.env.local)
- ✅ Client setup (browser & server)
- ✅ Auth actions (signIn, signUp, signOut)
- ✅ Auth helpers with dev mode support
- ✅ Database schema created (`supabase-schema.sql`)

#### 2. **Database Structure** ✅ COMPLETE

- ✅ Tables created:
  - `profiles` - User profiles with stats
  - `questions` - Bank soal UTBK
  - `game_results` - Individual game sessions
  - `global_leaderboard` - Materialized view (top 100)
- ✅ Triggers & functions:
  - Auto-update profile stats after game
  - Auto-refresh leaderboard
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ 10 sample questions (5 Matematika, 5 Bahasa Indonesia)

#### 3. **Game Integration** ✅ COMPLETE

- ✅ Created `lib/game/game-helpers.ts`:
  - Fetch questions from Supabase
  - Save game results to database
  - Get user game history
  - Update question usage stats
- ✅ Updated `app/game/page.tsx`:
  - Fetch real questions from database
  - Save results automatically
  - Loading & error states
  - Display question explanations
  - Dev mode handling (skip save)
  - Better error logging
- ✅ Auto-update profile stats via database trigger

#### 4. **Developer Tools** ✅ COMPLETE

- ✅ Diagnostic page (`/diagnostic`):
  - Check database status
  - Verify tables
  - Show question count
  - Check authentication
  - Display detailed errors
- ✅ Database check helpers (`lib/game/database-check.ts`)
- ✅ Documentation:
  - `DATABASE_SETUP.md` - Setup instructions
  - `TROUBLESHOOTING.md` - Common issues & solutions
  - `supabase-schema.sql` - Complete database schema

#### 5. **Dev Mode Support** ✅ COMPLETE

- ✅ Mock user for development
- ✅ Skip database save in dev mode
- ✅ Visual indicator badge
- ✅ Clear console logging
- ✅ No authentication required for testing

---

## 🎯 Current Status

### **✅ Working Features:**

- Database fully set up and operational
- Questions loading from Supabase
- Game flow working perfectly
- Results saving to database (production mode)
- Dev mode fully functional
- Error handling & logging
- Diagnostic tools

### **⏳ In Progress:**

None - all Phase 1 & 2 features completed! ✅

### **🎯 Next Priorities:**

1. **Add More Questions** (Ongoing) - HIGH PRIORITY 🔥

   - Current: 10 questions
   - Target: 200+ questions with UTBK section classification
   - Include `utbk_section` field (penalaran-umum, kuantitatif, etc)
   - Include `difficulty_weight` (8=easy, 10=medium, 12=hard)
   - Priority: TPS sections first (needed for Try-Out Mode)

2. **Phase 3A: Enhanced Game Mode** (2-3 hours) - MEDIUM PRIORITY

   - Speed bonus system (based on answer time)
   - Streak bonus system (consecutive correct answers)
   - Enhanced leaderboard with tiebreaker logic
   - Real-time bonus display in game UI

3. **Phase 3B: Try-Out Mode** (5-7 hours) - HIGH PRIORITY

   - Full UTBK simulation (TPS + Skolastik)
   - IRT-based scoring (0-1000 per section)
   - Multi-section navigation with timer
   - Private results with detailed analytics
   - Review mode for all answers

4. **Testing & Bug Fixes** (30 min)

   - End-to-end testing: Register → Login → Play Both Modes → Results
   - Test Try-Out Mode flow (multi-section, scoring, analytics)
   - Fix any UI/UX issues
   - Test on mobile devices

5. **Deploy to Production** (1 hour)
   - Deploy to Vercel
   - Configure environment variables
   - Test production build
   - Share with beta testers

---

## 🎯 Arsitektur & Stack Technology (FINAL DECISION)

Berdasarkan diskusi sebelumnya, ini adalah arsitektur final yang 100% GRATIS untuk 2000+ users:

### **Deployment Stack:**

```
┌──────────────────────────────────────────┐
│  Frontend: Vercel (FREE)                 │
│  ├─ Next.js 16+ hosting                  │
│  ├─ 100 GB bandwidth/month               │
│  ├─ Unlimited deployments                │
│  ├─ Edge Functions                       │
│  ├─ Auto SSL + CDN                       │
│  └─ Perfect untuk Next.js                │
└──────────────────────────────────────────┘
              ↓ API Calls
┌──────────────────────────────────────────┐
│  Backend: Supabase (FREE) ⭐ PILIHAN!    │
│  ├─ PostgreSQL (500 MB)                  │
│  ├─ Authentication (50k MAU)             │
│  ├─ Realtime subscriptions               │
│  ├─ Row Level Security                   │
│  ├─ Auto REST API                        │
│  └─ No compute hour limits! ✅           │
└──────────────────────────────────────────┘
              ↓ Optional (untuk variasi)
┌──────────────────────────────────────────┐
│  AI: Gemini Flash (FREE)                 │
│  ├─ 1500 requests/day                    │
│  ├─ 15 RPM                               │
│  ├─ Generate soal tambahan               │
│  └─ Validate soal quality                │
└──────────────────────────────────────────┘

💰 Total Cost: $0/month untuk 2000+ users!
```

### **Kenapa Supabase + Vercel?**

#### **Supabase (Backend):**

- ✅ PostgreSQL = Perfect untuk **relational data** (leaderboard, game results)
- ✅ **Unlimited compute hours** (vs Vercel Postgres 60 hours/month)
- ✅ 500 MB storage = cukup untuk 100k+ game results
- ✅ 50k MAU >> 2000 users needed
- ✅ Built-in Auth (JWT, OAuth, Magic Link)
- ✅ **Realtime subscriptions** = live leaderboard updates!
- ✅ Row Level Security = data privacy

#### **Vercel (Frontend):**

- ✅ Built for Next.js
- ✅ Global CDN (fast worldwide)
- ✅ 100 GB bandwidth >> 20 GB needed untuk 2000 users

#### **Gemini Flash (AI - Optional):**

- ✅ FREE 1500 requests/day
- ✅ Generate soal variasi (bukan core feature)
- ✅ Validate soal quality

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### **Complete Schema:**

```sql
-- ============================================
-- 1. USER PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  school VARCHAR(100),
  target_university VARCHAR(100),
  total_games INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. QUESTIONS BANK
-- ============================================
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(50) NOT NULL,
    -- 'matematika', 'bahasa-indonesia', 'bahasa-inggris', 'tps'
  subcategory VARCHAR(100),
  difficulty VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard'
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer VARCHAR(1) NOT NULL,
  explanation TEXT,
  source VARCHAR(30) DEFAULT 'curated',
    -- 'curated', 'ai-generated', 'utbk-2024', 'utbk-2023'
  year INTEGER,
  verified BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  correct_rate FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3. GAME RESULTS
-- ============================================
CREATE TABLE game_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  wrong_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_spent INTEGER,
  category VARCHAR(50),
  difficulty VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 4. GLOBAL LEADERBOARD (Materialized View)
-- ============================================
CREATE MATERIALIZED VIEW global_leaderboard AS
SELECT
  p.id,
  p.username,
  p.full_name,
  p.avatar_url,
  MAX(gr.score) as best_score,
  COUNT(gr.id) as total_games,
  AVG(gr.score)::INTEGER as avg_score,
  SUM(gr.correct_answers) as total_correct,
  RANK() OVER (ORDER BY MAX(gr.score) DESC) as rank
FROM profiles p
LEFT JOIN game_results gr ON p.id = gr.user_id
GROUP BY p.id, p.username, p.full_name, p.avatar_url
ORDER BY best_score DESC
LIMIT 100;

-- ============================================
-- 5. INDEXES
-- ============================================
CREATE INDEX idx_game_results_user ON game_results(user_id);
CREATE INDEX idx_game_results_score ON game_results(score DESC);
CREATE INDEX idx_questions_category ON questions(category, difficulty);

-- ============================================
-- 6. ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert own game results"
  ON game_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Verified questions viewable by everyone"
  ON questions FOR SELECT USING (verified = true);
```

---

## 🚀 Phase 1: Database & Auth Migration ✅ COMPLETE

### **Tujuan:**

- ✅ Migrate dari localStorage ke Supabase
- ✅ Real authentication
- ✅ **GLOBAL LEADERBOARD** yang real
- ✅ Save game results ke database

### **Status: ALL COMPLETED** ✅

#### 1. **Setup Supabase** ✅ COMPLETED

```bash
# Install ✅
npm install @supabase/supabase-js @supabase/ssr

# Environment (.env.local) ✅
NEXT_PUBLIC_SUPABASE_URL=https://yvmfjurfcrqjtbgecyhf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_DEV_MODE=true
```

- ✅ Supabase client (browser)
- ✅ Supabase server client
- ✅ Auth actions (signIn, signUp, signOut)
- ✅ Auth helpers with dev mode support
- ✅ Database schema created and run

#### 2. **Database Tables** ✅ COMPLETED

- ✅ `profiles` - User profiles with stats
- ✅ `questions` - Bank soal (10 sample questions)
- ✅ `game_results` - Game session results
- ✅ `global_leaderboard` - Materialized view (top 100)
- ✅ Triggers for auto-update stats
- ✅ RLS policies enabled
- ✅ Indexes for performance

#### 3. **Game Integration** ✅ COMPLETED

- ✅ Created `lib/game/game-helpers.ts`
- ✅ Updated `app/game/page.tsx`
- ✅ Fetch questions from Supabase
- ✅ Save results to database
- ✅ Auto-update profile stats
- ✅ Dev mode handling
- ✅ Error handling & logging

#### 4. **Developer Tools** ✅ COMPLETED

- ✅ `/diagnostic` page for database checks
- ✅ `lib/game/database-check.ts` helpers
- ✅ `DATABASE_SETUP.md` documentation
- ✅ `TROUBLESHOOTING.md` guide

#### 5. **Next Steps** ✅ COMPLETE

- ✅ Update Leaderboard page (fetch real data) - DONE!
- ✅ Update Profile page (fetch real data + game history) - DONE!
- ✅ Update Login/Register (Supabase auth integration) - DONE!

---

## 🚀 Phase 2: UI Integration & Real-Time Data ✅ COMPLETE

### **Completed Features (January 1, 2026):**

#### 1. **Dashboard Integration** ✅

- ✅ Login detection with Supabase auth (no more localStorage)
- ✅ Welcome greeting for logged-in users
- ✅ Dynamic CTA buttons based on auth status
- ✅ Proper error handling for profile not found

#### 2. **Navbar Enhancement** ✅

- ✅ Real-time auth status detection
- ✅ Fetch username from profile database
- ✅ Logout functionality with Supabase
- ✅ Mobile menu support

#### 3. **LeaderboardCard Component** ✅

- ✅ Real-time data from global_leaderboard view
- ✅ Loading states with spinner
- ✅ Error handling with retry button
- ✅ Empty state for no players
- ✅ Top 5 players display

#### 4. **Profile Page** ✅

- ✅ Game history display (last 10 games)
- ✅ Detailed stats: avg score, accuracy, time spent
- ✅ 4 stat cards UI
- ✅ Indonesian date/time formatting

#### 5. **Leaderboard Page** ✅

- ✅ Real data from materialized view
- ✅ Top 3 podium display
- ✅ Full ranking table
- ✅ User rank indicator
- ✅ Loading & error states

#### 6. **Authentication Flow** ✅

- ✅ Login with Supabase Auth
- ✅ Register with auto profile creation
- ✅ Error validation & handling
- ✅ Removed all localStorage dependencies

---

## 🎮 Phase 3A: Enhanced Game Mode (PLANNED)

### **Tujuan:**

- ✅ Scoring lebih dinamis dengan speed & streak bonus
- ✅ Leaderboard dengan tiebreaker yang jelas
- ✅ Real-time feedback untuk bonus points
- ✅ Gamifikasi lebih engaging

### **Features:**

#### 1. **Speed Bonus System**

```javascript
Speed Bonus per Question:
- Jawab < 20s  → +5 points
- Jawab 20-40s → +3 points
- Jawab 40-60s → +1 point
- Jawab > 60s  → +0 bonus
```

#### 2. **Streak Bonus System**

```javascript
Streak Bonus:
- 3 benar berturut-turut → +10 points
- 5 benar berturut-turut → +25 points
- 10 benar berturut-turut → +50 points
```

#### 3. **Final Score Calculation**

```javascript
Final Score = (Correct × 10) + Speed Bonus + Streak Bonus

Example:
- 15 correct answers = 150 points
- Speed bonus (avg 30s) = 45 points
- Streak bonus (1x5 streak) = 25 points
→ Total = 220 points
```

#### 4. **Leaderboard Tiebreaker**

When scores are equal:

1. Total score (higher = better)
2. Time spent (faster = better)
3. Accuracy % (higher = better)

### **Database Changes:**

```sql
ALTER TABLE game_results ADD COLUMN mode VARCHAR(20) DEFAULT 'game';
ALTER TABLE game_results ADD COLUMN speed_bonus INTEGER DEFAULT 0;
ALTER TABLE game_results ADD COLUMN streak_bonus INTEGER DEFAULT 0;
```

### **Implementation Steps:**

- [ ] Update database schema (add columns)
- [ ] Update `game-helpers.ts` with bonus calculations
- [ ] Update Game page UI to show real-time bonuses
- [ ] Update leaderboard logic with tiebreaker
- [ ] Add bonus animations & feedback
- [ ] Test scoring system

**Estimated Time:** 2-3 hours

---

## 📝 Phase 3B: Try-Out Mode (PLANNED)

### **Tujuan:**

- ✅ Full UTBK simulation experience
- ✅ Real timing per section (25-35 menit)
- ✅ IRT-based scoring (like real UTBK)
- ✅ Private results with detailed analytics
- ✅ Strength/weakness identification

### **UTBK Structure:**

```
═══════════════════════════════════════════════════════════
1. TPS (Tes Potensi Skolastik)
═══════════════════════════════════════════════════════════
   ├─ Penalaran Umum: 20 soal - 35 menit
   ├─ Pengetahuan Kuantitatif: 15 soal - 25 menit
   ├─ Penalaran Matematika: 20 soal - 30 menit
   ├─ Literasi B. Indonesia: 20 soal - 25 menit
   └─ Literasi B. Inggris: 20 soal - 25 menit
   TOTAL: 95 soal - 140 menit (2 jam 20 menit)

═══════════════════════════════════════════════════════════
2. Tes Skolastik (SAINTEK)
═══════════════════════════════════════════════════════════
   ├─ Matematika: 20 soal - 30 menit
   ├─ Fisika: 20 soal - 30 menit
   ├─ Kimia: 20 soal - 30 menit
   └─ Biologi: 20 soal - 30 menit
   TOTAL: 80 soal - 120 menit (2 jam)

═══════════════════════════════════════════════════════════
3. Tes Skolastik (SOSHUM)
═══════════════════════════════════════════════════════════
   ├─ Sejarah: 20 soal - 30 menit
   ├─ Geografi: 20 soal - 30 menit
   ├─ Sosiologi: 20 soal - 30 menit
   └─ Ekonomi: 20 soal - 30 menit
   TOTAL: 80 soal - 120 menit (2 jam)
```

### **IRT-Based Scoring:**

```javascript
// Approximation of UTBK IRT scoring
Raw Score = Σ (difficulty_weight × is_correct)

Difficulty Weights:
- Easy: 8 points
- Medium: 10 points
- Hard: 12 points

Scaled Score = (Raw Score / Max Possible) × 1000
Range: 200-1000 per section

Example (20 soal, mix difficulty):
- 15 correct (10 medium, 5 hard)
- Raw = (10×10) + (5×12) = 160
- Max possible = (20×12) = 240
- Scaled = (160/240) × 1000 = 667 points
```

### **Database Schema:**

```sql
CREATE TABLE tryout_sessions (
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

-- Update questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS difficulty_weight INTEGER DEFAULT 10;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS utbk_section VARCHAR(50);
-- Values: 'penalaran-umum', 'kuantitatif', 'penalaran-matematika',
--         'literasi-indonesia', 'literasi-inggris',
--         'matematika', 'fisika', 'kimia', 'biologi',
--         'sejarah', 'geografi', 'sosiologi', 'ekonomi'

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tryout_user ON tryout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_tryout_status ON tryout_sessions(status);
CREATE INDEX IF NOT EXISTS idx_questions_section ON questions(utbk_section);

-- RLS Policies
ALTER TABLE tryout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tryout sessions"
  ON tryout_sessions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tryout sessions"
  ON tryout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tryout sessions"
  ON tryout_sessions FOR UPDATE USING (auth.uid() = user_id);
```

### **UI/UX Flow:**

```
Home → Mode Selection → Try-Out Setup → Section 1 → Section 2 → ...
     → Completion → Results Page → Review Answers

Features per page:
1. Mode Selection: Choose Game or Try-Out
2. Try-Out Setup: Choose test type (TPS/Saintek/Soshum)
3. Section Page: Multi-section nav, timer, flag questions
4. Results: Overall score, section breakdown, analytics
5. Review: See all answers, explanations, time spent
```

### **Features:**

#### 1. **Mode Selection Page**

- Card: Game Mode vs Try-Out Mode
- Game: Quick, fun, leaderboard
- Try-Out: Full simulation, private, realistic

#### 2. **Try-Out Setup Page**

- Select test type:
  - TPS Only (95 soal, 140 menit)
  - TPS + Saintek (175 soal, 260 menit)
  - TPS + Soshum (175 soal, 260 menit)
- Show time commitment warning
- Start button

#### 3. **Try-Out Session Page**

- Multi-section navigation (tabs/sidebar)
- Timer per section (countdown)
- Question navigator (jump to question)
- Flag/mark questions for review
- Progress indicator (X/20 answered)
- No life system (realistic UTBK)
- Auto-save progress
- Submit section button

#### 4. **Results Page (Private)**

```
═══════════════════════════════════════════════════════════
HASIL TRY-OUT UTBK
═══════════════════════════════════════════════════════════

TPS (Tes Potensi Skolastik):
├─ Penalaran Umum: 667/1000 (15/20) ⭐⭐⭐
├─ Kuantitatif: 720/1000 (12/15) ⭐⭐⭐⭐
├─ Penalaran Matematika: 580/1000 (13/20) ⭐⭐
├─ Literasi B. Indonesia: 640/1000 (14/20) ⭐⭐⭐
└─ Literasi B. Inggris: 700/1000 (16/20) ⭐⭐⭐⭐
RATA-RATA TPS: 661/1000

Tes Skolastik (Saintek):
├─ Matematika: 625/1000 (13/20) ⭐⭐⭐
├─ Fisika: 680/1000 (15/20) ⭐⭐⭐⭐
├─ Kimia: 590/1000 (12/20) ⭐⭐
└─ Biologi: 710/1000 (16/20) ⭐⭐⭐⭐
RATA-RATA SAINTEK: 651/1000

═══════════════════════════════════════════════════════════
TOTAL SCORE: 656/1000
PREDIKSI RANKING: Top 30% Nasional (Estimasi)
═══════════════════════════════════════════════════════════

📊 Analisis Performa:
✅ Kekuatan: Biologi (710), Kuantitatif (720), B. Inggris (700)
⚠️  Perlu Improvement: Penalaran Matematika (580), Kimia (590)
⏱️  Waktu: Rata-rata 1.2 menit/soal (Baik!)

💡 Rekomendasi:
1. Focus practice: Penalaran Matematika & Kimia
2. Review materi: Stoikiometri, Termokimia
3. Latih kecepatan: Penalaran Umum (terlalu lama)
4. Pertahankan: Biologi, Kuantitatif, B. Inggris

🎯 Target Universitas:
- UI (Teknik): Butuh 700+ → Masih 44 poin lagi
- ITB (STEI): Butuh 720+ → Masih 64 poin lagi
- UGM (Teknik): Butuh 680+ → Masih 24 poin lagi
```

#### 5. **Review Mode**

- List all questions by section
- Show user answer vs correct answer
- Display explanation
- Time spent per question
- Filter: All / Correct / Wrong / Flagged
- Navigate by section

### **Implementation Roadmap:**

#### **Week 1: Database & Backend** (2 hours)

- [ ] Run updated schema (tryout_sessions, question columns)
- [ ] Create `lib/tryout/tryout-helpers.ts` for scoring logic
- [ ] Implement IRT scoring calculation
- [ ] Create session management functions
- [ ] Test RLS policies

#### **Week 2: UI Foundation** (2 hours)

- [ ] Create `/tryout` route structure
- [ ] Mode selection page (`/game-or-tryout`)
- [ ] Try-out setup page (`/tryout/setup`)
- [ ] Section navigation component
- [ ] Timer component (per section)
- [ ] Question navigator component

#### **Week 3: Session & Flow** (2 hours)

- [ ] Try-out session page (`/tryout/session`)
- [ ] Multi-section state management
- [ ] Auto-save progress
- [ ] Section completion flow
- [ ] Flag/mark questions functionality

#### **Week 4: Results & Review** (2 hours)

- [ ] Results page (`/tryout/results`)
- [ ] Score calculation & display
- [ ] Analytics & recommendations
- [ ] Review mode (`/tryout/review`)
- [ ] Historical progress tracking

#### **Week 5: Polish & Test** (1 hour)

- [ ] UI/UX refinements
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Bug fixes & edge cases
- [ ] Documentation

**Total Estimated Time:** 5-7 hours

### **Success Metrics:**

- [ ] User can complete full TPS simulation (95 soal)
- [ ] Scoring accurately reflects difficulty (IRT-based)
- [ ] Results show detailed analytics
- [ ] Review mode helps identify weaknesses
- [ ] Average session completion rate > 60%

---

## 📚 Phase 4: Bank Soal UTBK (IN PROGRESS)javascript

Speed Bonus per Question:

- Jawab < 20s → +5 points
- Jawab 20-40s → +3 points
- Jawab 40-60s → +1 point
- Jawab > 60s → +0 bonus

````

#### 2. **Streak Bonus System**

```javascript
Streak Bonus:
- 3 benar berturut-turut → +10 points
- 5 benar berturut-turut → +25 points
- 10 benar berturut-turut → +50 points
````

#### 3. **Final Score Calculation**

```javascript
Final Score = (Correct × 10) + Speed Bonus + Streak Bonus
```

#### 4. **Leaderboard Tiebreaker**

1. Total score (higher = better)
2. Time spent (faster = better)
3. Accuracy % (higher = better)

### **Database Changes:**

```sql
ALTER TABLE game_results ADD COLUMN mode VARCHAR(20) DEFAULT 'game';
ALTER TABLE game_results ADD COLUMN speed_bonus INTEGER DEFAULT 0;
ALTER TABLE game_results ADD COLUMN streak_bonus INTEGER DEFAULT 0;
```

### **Implementation Steps:**

- [ ] Update database schema (add columns)
- [ ] Update `game-helpers.ts` with bonus calculations
- [ ] Update Game page UI to show real-time bonuses
- [ ] Update leaderboard logic with tiebreaker
- [ ] Add bonus animations & feedback
- [ ] Test scoring system

**Estimated Time:** 2-3 hours

---

## 📝 Phase 3B: Try-Out Mode (PLANNED)

### **Tujuan:**

- ✅ Full UTBK simulation experience
- ✅ Real timing per section (25-35 menit)
- ✅ IRT-based scoring (like real UTBK)
- ✅ Private results with detailed analytics
- ✅ Strength/weakness identification

### **UTBK Structure:**

```
1. TPS (Tes Potensi Skolastik)
   ├─ Penalaran Umum: 20 soal - 35 menit
   ├─ Pengetahuan Kuantitatif: 15 soal - 25 menit
   ├─ Penalaran Matematika: 20 soal - 30 menit
   ├─ Literasi B. Indonesia: 20 soal - 25 menit
   └─ Literasi B. Inggris: 20 soal - 25 menit
   TOTAL: 95 soal - 140 menit

2. Tes Skolastik (SAINTEK)
   ├─ Matematika: 20 soal - 30 menit
   ├─ Fisika: 20 soal - 30 menit
   ├─ Kimia: 20 soal - 30 menit
   └─ Biologi: 20 soal - 30 menit
   TOTAL: 80 soal - 120 menit

3. Tes Skolastik (SOSHUM)
   ├─ Sejarah: 20 soal - 30 menit
   ├─ Geografi: 20 soal - 30 menit
   ├─ Sosiologi: 20 soal - 30 menit
   └─ Ekonomi: 20 soal - 30 menit
   TOTAL: 80 soal - 120 menit
```

### **IRT-Based Scoring:**

```javascript
// Approximation of UTBK IRT scoring
Raw Score = Σ (difficulty_weight × is_correct)

Difficulty Weights:
- Easy: 8 points
- Medium: 10 points
- Hard: 12 points

Scaled Score = (Raw Score / Max Possible) × 1000
Range: 200-1000 per section
```

### **Database Schema:**

```sql
CREATE TABLE tryout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  test_type VARCHAR(20) NOT NULL, -- 'tps-only', 'saintek', 'soshum'
  status VARCHAR(20) DEFAULT 'in-progress',
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  total_time_spent INTEGER,
  tps_score INTEGER,
  skolastik_score INTEGER,
  final_score INTEGER,
  section_scores JSONB,
  questions_used JSONB,
  user_answers JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE questions ADD COLUMN difficulty_weight INTEGER DEFAULT 10;
ALTER TABLE questions ADD COLUMN utbk_section VARCHAR(50);
```

### **UI/UX Flow:**

```
Home → Mode Selection → Try-Out Setup → Section 1 → Section 2 → ...
     → Results Page → Review Answers
```

### **Features:**

1. **Mode Selection Page**

   - Game Mode vs Try-Out Mode
   - Test type selection (TPS-only, Saintek, Soshum, Campuran)

2. **Try-Out Session Page**

   - Multi-section navigation
   - Timer per section (countdown)
   - Flag/mark questions for review
   - Progress indicator
   - No life system (realistic UTBK)

3. **Results Page (Private)**

   - Overall score (0-1000)
   - Score per section
   - Correct/wrong breakdown
   - Time analysis
   - Strength & weakness identification
   - Comparison with target university
   - Detailed recommendations

4. **Review Mode**
   - Review all answers
   - See correct answers
   - Read explanations
   - Track by section

### **Implementation Roadmap:**

**Week 1: Database & Backend** (2 hours)

- [ ] Create `tryout_sessions` table
- [ ] Add `difficulty_weight` & `utbk_section` to questions
- [ ] Create helper functions for IRT scoring
- [ ] Add RLS policies for try-out sessions
- [ ] Update question categorization script

**Week 2: UI & Flow** (3 hours)

- [ ] Create mode selection page
- [ ] Create try-out setup page (choose test type)
- [ ] Create try-out session page (multi-section)
- [ ] Section navigation component
- [ ] Timer per section component
- [ ] Question flag/mark system

**Week 3: Scoring & Results** (2 hours)

- [ ] Implement IRT scoring calculation
- [ ] Create results page with analytics
- [ ] Section breakdown visualization
- [ ] Strength/weakness analysis
- [ ] University comparison (optional)
- [ ] Recommendations generator

**Week 4: Review & Polish** (1 hour)

- [ ] Review answers functionality
- [ ] Historical progress tracking
- [ ] Performance charts
- [ ] UI/UX refinements
- [ ] Testing & bug fixes

**Estimated Time:** 5-7 hours total

---

## 📚 Phase 4: Bank Soal UTBK (IN PROGRESS)

### **Tujuan:**

- ✅ 100+ soal per kategori
- ✅ Level UTBK asli
- ✅ Include penjelasan

### **Target:** 500+ soal dengan UTBK Section Classification

```
TOTAL: 500+ soal

═══════════════════════════════════════════════════
TPS (Tes Potensi Skolastik) - 200 soal
═══════════════════════════════════════════════════
1. Penalaran Umum (50 soal)
2. Pengetahuan Kuantitatif (40 soal)
3. Penalaran Matematika (50 soal)
4. Literasi Bahasa Indonesia (30 soal)
5. Literasi Bahasa Inggris (30 soal)

═══════════════════════════════════════════════════
TES SKOLASTIK SAINTEK - 200 soal
═══════════════════════════════════════════════════
1. Matematika (50 soal)
   ├─ Aljabar (15)
   ├─ Geometri (15)
   ├─ Trigonometri (10)
   └─ Kalkulus (10)

2. Fisika (50 soal)
   ├─ Mekanika (15)
   ├─ Listrik & Magnet (15)
   ├─ Gelombang & Optik (10)
   └─ Fisika Modern (10)

3. Kimia (50 soal)
   ├─ Stoikiometri (15)
   ├─ Termokimia (10)
   ├─ Kesetimbangan (15)
   └─ Organik (10)

4. Biologi (50 soal)
   ├─ Sel & Molekuler (15)
   ├─ Genetika (15)
   ├─ Ekologi (10)
   └─ Evolusi (10)

═══════════════════════════════════════════════════
TES SKOLASTIK SOSHUM - 100 soal
═══════════════════════════════════════════════════
1. Sejarah (25 soal)
2. Geografi (25 soal)
3. Sosiologi (25 soal)
4. Ekonomi (25 soal)

═══════════════════════════════════════════════════
Priority Order:
1. TPS (200) - Dibutuhkan untuk semua test type
2. Saintek (200) - Popular choice
3. Soshum (100) - Completing the set
═══════════════════════════════════════════════════
```

### **Sources:**

1. **Soal UTBK Asli** (2023-2025)
2. **Soal SBMPTN** (2020-2022)
3. **Buat manual** (mengikuti format UTBK)
4. **AI-Generated** (optional, harus diverifikasi)

---

## 🤖 Phase 3: AI Features (ENHANCEMENT)

### **Use Cases Gemini Flash:**

#### 1. **Generate Soal Variasi**

```typescript
// Generate soal tambahan untuk practice
const generateQuestion = async (category: string, difficulty: string) => {
  const prompt = `
Buat 1 soal UTBK:
- Kategori: ${category}
- Tingkat: ${difficulty}

Format JSON:
{
  "question": "...",
  "options": [{"label": "A", "text": "..."}, ...],
  "correct_answer": "B",
  "explanation": "..."
}

Pastikan level UTBK, 5 opsi, penjelasan jelas.
  `;

  // Call Gemini API
  // Save dengan verified=false
};
```

#### 2. **Validate Soal Quality**

- Check apakah soal jelas
- Validasi opsi jawaban
- Saran perbaikan

#### 3. **Generate Penjelasan Detail**

- Step-by-step explanation
- Tips & tricks

**Note:** AI = OPTIONAL feature, bukan core!

---

## 📊 Phase 4: Analytics & Features

- [ ] Progress tracking charts
- [ ] Weak areas identification
- [ ] Achievement badges
- [ ] Daily challenges
- [ ] Study streak
- [ ] Review mode (review wrong answers)

---

## 🚀 Deployment Plan

### **Steps:**

1. Setup Supabase project
2. Run database schema
3. Seed 50+ questions per category (minimum)
4. Test authentication flow
5. Deploy to Vercel
6. Set environment variables
7. Test end-to-end

### **Vercel:**

```bash
# Connect GitHub
# Set environment variables
# Deploy
vercel --prod
```

---

## 🎯 Success Metrics

### **Week 1:**

- 50+ users
- 500+ games
- 0 critical bugs

### **Month 1:**

- 500+ users
- 5,000+ games
- Global leaderboard aktif

### **Month 3:**

- 2,000+ users
- 20,000+ games
- Featured di komunitas UTBK

---

## 📝 Important Reminders

### **Cost:**

- $0/month untuk 2000+ users ✅
- Supabase FREE: 500MB, 50k MAU, unlimited compute
- Vercel FREE: 100 GB bandwidth
- Gemini FREE: 1500 req/day

### **Priority:**

1. **Database migration** (Supabase + Global Leaderboard)
2. **Bank soal UTBK** (100+ per kategori)
3. **AI features** (optional enhancement)

### **Design:**

- Primary: #3F72AF
- Secondary: #112D4E
- Background: #DBE2EF
- Light: #F9F7F7

---

**Last Updated:** January 1, 2026  
**Current Phase:** Phase 1 Complete ✅ → Phase 2 In Progress 📚  
**Status:** ✅ Database & Game Integration Complete → 🎯 Next: Leaderboard & Profile Pages  
**Focus:** Real Leaderboard + Real Profile + More Questions

---

## 📊 Quick Stats

### **Database Status:**

- ✅ Tables: 4 tables created (profiles, questions, game_results, global_leaderboard)
- ✅ Questions: 10 sample questions available
- ✅ Features: Auto-update stats, RLS policies, triggers
- ✅ Dev Tools: Diagnostic page, error logging, documentation

### **Pages Status:**

- ✅ Game Page: Supabase integrated, working perfectly
- ✅ Login/Register: Supabase auth fully integrated ✨ NEW!
- ✅ Leaderboard: Real data from global_leaderboard ✨ NEW!
- ✅ Profile: Real stats + game history display ✨ NEW!
- ✅ Diagnostic: Complete and functional

### **Integration Status:**

- ✅ Fetch questions from database
- ✅ Save game results to database
- ✅ Auto-update profile stats
- ✅ Leaderboard with real data ✨
- ✅ Profile with game history ✨
- ✅ Authentication (Login/Register) ✨
- ✅ Dev mode support
- ✅ Error handling & logging

---

## 🎯 Next Immediate Actions

### ✅ **COMPLETED** (January 1, 2026)

1. ✅ **Leaderboard Integration** - DONE!

   - Created `lib/leaderboard/leaderboard-helpers.ts`
   - Fetch from `global_leaderboard` materialized view
   - Loading states, error handling, empty states
   - User rank display

2. ✅ **Profile Enhancement** - DONE!

   - Created `lib/profile/profile-helpers.ts`
   - Game history display (last 10 games)
   - Detailed stats (avg score, accuracy, time spent)
   - Better UI with 4 stat cards

3. ✅ **Auth Integration** - DONE!
   - Login with Supabase Auth
   - Register with profile creation
   - Error handling & validation
   - Removed localStorage dependency

### 🎯 **NEXT PRIORITY**

4. **Add More Questions** (Ongoing) 🔥
   - Current: 10 questions
   - Target: 200+ questions
   - 50+ per category
   - **This is the main blocker for launch!**

---

### 🎯 6. **Update Profile Page** (30 minutes)

- [ ] Fetch user data from `profiles` table
- [ ] Display real stats (total_games, best_score)
- [ ] Update profile functionality
- [ ] Show game history

### 📚 7. **Add More Questions** (Ongoing)

- [ ] Target: 50+ per category (total 200+)
- [ ] Categories: Matematika, Bahasa Indonesia, Bahasa Inggris, TPS
- [ ] Format: Follow `supabase-schema.sql` sample structure
- [ ] Include explanations for each question
