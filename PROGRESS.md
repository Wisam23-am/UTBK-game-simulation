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

   - Current: 10 sample questions
   - Target: 200+ questions
   - Categories needed:
     - Matematika (50+)
     - Bahasa Indonesia (50+)
     - Bahasa Inggris (50+)
     - TPS (50+)

2. **Testing & Bug Fixes** (30 min)

   - End-to-end testing: Register → Login → Play → Leaderboard
   - Fix any UI/UX issues
   - Test on mobile devices

3. **Deploy to Production** (1 hour)
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

## 📚 Phase 2: Bank Soal UTBK (IN PROGRESS)

### **Tujuan:**

- ✅ 100+ soal per kategori
- ✅ Level UTBK asli
- ✅ Include penjelasan

### **Target:**

```
Total: 500+ soal

Matematika (150 soal):
├─ Aljabar (40)
├─ Geometri (40)
├─ Trigonometri (30)
└─ Kalkulus (20)

Bahasa Indonesia (150 soal):
├─ Tata Bahasa (50)
├─ Pemahaman Bacaan (50)
└─ Ejaan (30)

Bahasa Inggris (100 soal):
├─ Grammar (40)
├─ Reading (40)
└─ Vocabulary (20)

TPS (100 soal):
├─ Penalaran Umum (40)
├─ Kuantitatif (30)
└─ Pemahaman Bacaan (30)
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
