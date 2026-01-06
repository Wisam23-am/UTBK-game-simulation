# 🎮 QuizQuest - SNBT Game Platform

Platform latihan SNBT (Seleksi Nasional Berbasis Tes) yang inovatif dengan **Game Mode** untuk practice cepat dengan leaderboard kompetitif. **Try-Out Mode** coming soon!

**Brand**: QuizQuest - Misi kami adalah menciptakan revolusi belajar SNBT untuk generasi juara Indonesia! 🎯✨

## 🌟 Status Proyek

**Production Ready ✅** - January 7, 2026  
**Game Mode** - Fully functional with 350 questions  
**Authentication** - Complete with enhanced user onboarding  
**Leaderboard** - Advanced filtering (Global, Sekolah-mu, Kampus-mu)  
**Feedback System** - Private feedback with admin-only access  
**Current Status:** Ready for Vercel deployment

### ✅ Completed Features:

#### Database & Game Core

- ✅ Database fully integrated with Supabase PostgreSQL
- ✅ 350 verified questions (50 per category × 7 categories)
- ✅ Real-time question fetching with Fisher-Yates shuffle
- ✅ Game result saving with auto-stats update
- ✅ Materialized view leaderboard (optimized with CTE)
- ✅ Dev mode for testing & development
- ✅ Robust error handling & logging

#### Authentication & User Management

- ✅ Supabase Auth with JWT tokens
- ✅ Enhanced registration form (full name + school + university)
- ✅ Strong password validation (8+ chars, letters, numbers, special chars)
- ✅ Real-time password strength indicator
- ✅ Client-side & server-side password validation
- ✅ Auto-profile creation on first login
- ✅ Session management with reduced warnings
- ✅ Protected routes (game/study require login)
- ✅ Dev mode fallback for development

#### Game Features

- ✅ 15 mixed questions (PU: 3, others: 2 each)
- ✅ 80% hard (12 questions), 20% medium (3 questions)
- ✅ 10-minute timer with countdown
- ✅ Life system (3 lives)
- ✅ Streak bonus (≥3 consecutive correct = 1.5x multiplier)
- ✅ Speed bonus (5 points per second remaining)
- ✅ Score formula: 1000 base + 5pts/sec + streak bonus
- ✅ Question review after game ends
- ✅ Real-time answer validation

#### User Interface

- ✅ Modern login/register page (single page with toggle)
- ✅ Dashboard with personalized greeting
- ✅ Study page (mode selection hub)
- ✅ Profile page with detailed statistics
- ✅ Game history with category labels
- ✅ Real-time leaderboard with filtering tabs
- ✅ LeaderboardCard component (top 5)
- ✅ Feedback page with 3 categories
- ✅ Team page with animated design
- ✅ Responsive navbar with mobile menu
- ✅ macOS-style Dock navigation (6 items + Feedback)
- ✅ Fully responsive design (mobile-first)
- ✅ Consistent theme colors (#F9F7F7, #DBE2EF, #3F72AF, #112D4E)

#### Profile & Statistics

- ✅ Total games (real-time calculation)
- ✅ Best score tracking
- ✅ Average score calculation
- ✅ Accuracy percentage
- ✅ Total correct answers
- ✅ Time spent statistics
- ✅ Game history with filters
- ✅ Editable profile (name, school, university)
- ✅ School autocomplete (SMAN 1 Paciran only)
- ✅ University search with PDDikti API (4400+ universities)
- ✅ Debounced search for better performance

#### Leaderboard System

- ✅ Real-time VIEW optimization (always fresh data)
- ✅ Best game stats per user (not sum)
- ✅ Ranking by: Score DESC → Correct DESC → Time ASC
- ✅ Display: Best time + total correct answers
- ✅ Smart rank calculation (top 50 + user rank)
- ✅ **Advanced Filtering**: Global, Sekolah-mu, Kampus-mu
- ✅ Exclude non-players automatically

#### Feedback System

- ✅ Private feedback submission (admin-only access)
- ✅ Three categories: Bug, Soal, Komentar
- ✅ Screenshot upload (max 300KB, private storage)
- ✅ Bug reporting with detailed description
- ✅ Question issue reporting with question ID
- ✅ Feature requests via comment field
- ✅ User comment field for additional suggestions
- ✅ Integrated in Dock navigation (💬 icon)
- ✅ Database schema with RLS policies
- ✅ Privacy-focused UI with clear notices

### 🚀 Planned Features (Phase 3):

### 🚀 Planned Features (Future Development):

#### Try-Out Mode (Coming Soon)

- 📝 Full UTBK simulation (95-175 questions)
- ⏱️ Real section timers (25-35 min/section)
- 🎯 IRT-based scoring (0-1000 like real UTBK)
- 📊 **Private analytics** (no leaderboard)
- 🔍 Strength/weakness identification
- 📈 University target comparison
- 📖 Complete review mode

### 🔥 Future Priorities:

1. **Try-Out Mode Implementation** - Full UTBK simulation
2. **Add More Questions** - Expand question bank to 500+
3. **Analytics Dashboard** - Detailed performance tracking
4. **Mobile App** - Native iOS/Android app

## 📋 Deskripsi

**QuizQuest** adalah platform latihan SNBT yang menggabungkan gamifikasi dengan pembelajaran efektif:

- **🎮 Game Mode**: Practice cepat 15 soal dengan leaderboard kompetitif
- **📝 Try-Out Mode** (Coming Soon): Simulasi SNBT lengkap dengan scoring realistis
- **💬 Feedback System**: Laporan bug, soal bermasalah, dan request fitur
- **🏆 Advanced Leaderboard**: Filter berdasarkan Global, Sekolah-mu, Kampus-mu

### ✨ Fitur Utama

#### 🎮 Game Mode:

- ⚡ **Quick Practice**: 15 soal campuran, selesai dalam 10 menit
- 🎲 **Mixed Categories**: PU (3) + PBM, PM, PPU, PK, LBI (2 each)
- 🎯 **High Difficulty**: 80% hard (12 soal), 20% medium (3 soal)
- ❤️ **Life System**: 3 nyawa untuk tantangan ekstra
- 🏆 **Global Leaderboard**: Kompetisi real-time dengan ranking
- 🔥 **Streak Bonus**: 1.5x multiplier untuk 3+ jawaban benar beruntun
- ⚡ **Speed Bonus**: 5 poin per detik tersisa
- 📊 **Score Formula**: 1000 base + time bonus + streak multiplier

#### 👤 User Features:

- 🔐 **Secure Authentication**: Supabase Auth dengan JWT
- 📝 **Enhanced Registration**: Full name, school, target university
- 📊 **Detailed Profile**: Game stats, history, editable info
- � **School Selection**: Autocomplete dengan SMAN 1 Paciran
- 🎓 **University Search**: 4400+ universitas via PDDikti API
- 🏆 **Advanced Leaderboard**: Global, Sekolah-mu, Kampus-mu filters
- 📈 **Real-time Statistics**: Accuracy, avg score, total games
- 🎮 **Game History**: Track all games with category labels
- 💬 **Private Feedback**: Bug reports, soal issues, feature requests
- 🔒 **Protected Routes**: Login required for game/study access

#### ⚙️ General Features:

- 📱 **Responsive Design**: Perfect di mobile, tablet, desktop
- 💡 **Question Explanations**: Pembahasan lengkap setiap soal
- 🎨 **Modern UI**: Clean design dengan Tailwind CSS
- 🚀 **Fast Performance**: Next.js 16 dengan Turbopack
- 🔧 **Dev Mode**: Testing mode untuk development

## 🛠️ Teknologi yang Digunakan

### Frontend

- **Framework**: Next.js 16.1.1 (App Router with Turbopack)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React

### Backend & Database

- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Database**: PostgreSQL with RLS (Row Level Security)
- **Authentication**: Supabase Auth (JWT-based)
- **Storage**: Supabase Storage (for future assets)

### DevOps & Deployment

- **Hosting**: Vercel (Free tier - 100GB bandwidth)
- **Database**: Supabase (Free tier - 500MB, 50k MAU)
- **Version Control**: Git + GitHub

### Developer Tools

- **Linting**: ESLint 9.x
- **Diagnostics**: Custom diagnostic page (`/diagnostic`)
- **Logging**: Console logging with emoji indicators

## 📁 Struktur Proyek

```
UTBK-game-simulation/
├── app/                      # App Router pages
│   ├── page.tsx             # Halaman utama (Home)
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── game/                # Halaman simulasi game ✅ SUPABASE
│   │   └── page.tsx
│   ├── hasil/               # Halaman hasil ujian
│   │   └── page.tsx
│   ├── login/               # Halaman login ✅ NEW DESIGN
│   │   └── page.tsx
│   ├── register/            # Halaman registrasi
│   │   └── page.tsx
│   ├── profile/             # Halaman profil pengguna
│   │   └── page.tsx
│   ├── leaderboard/         # Halaman leaderboard
│   │   └── page.tsx
│   ├── feedback/            # Halaman feedback ✅ NEW
│   │   └── page.tsx
│   ├── team/                # Halaman team
│   │   └── page.tsx
│   └── diagnostic/          # Halaman diagnostik
│       └── page.tsx
├── components/              # Reusable components
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── Card.tsx            # Card wrapper
│   ├── ButtonPrimary.tsx   # Primary button
│   ├── QuestionOption.tsx  # Question option button
│   ├── LeaderboardCard.tsx # Leaderboard display
│   ├── LifeIndicator.tsx   # Life/health indicator
│   ├── FireIcon.tsx        # Animated fire icon (WebP)
│   └── Dock.tsx            # macOS-style dock navigation
├── lib/                     # Utility functions & helpers ✅
│   ├── auth/               # Authentication helpers
│   │   ├── auth-actions.ts # Server actions (signIn, signUp)
│   │   └── auth-helpers.ts # Client helpers + dev mode
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client
│   ├── game/               # Game-related helpers ✅
│   │   ├── game-helpers.ts # Question fetch, result save
│   │   └── database-check.ts # Diagnostic helpers
│   ├── leaderboard/        # Leaderboard helpers ✅ NEW
│   │   └── leaderboard-helpers.ts # Fetch leaderboard data
│   └── profile/            # Profile helpers ✅ NEW
│       └── profile-helpers.ts # User stats & game history
├── public/                  # Static assets
│   ├── logo.png            # App logo
│   ├── fire-animation.webp # Animated fire for streak indicator
│   └── team/               # Team member assets
├── supabase-schema.sql     # Complete database schema ✅
├── feedback-schema.sql     # Feedback system schema ✅ NEW
├── DATABASE_SETUP.md       # Setup instructions ✅
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind config
└── eslint.config.mjs       # ESLint config
```

## 🚀 Cara Menjalankan Proyek

### Prerequisites

- Node.js 18+
- npm atau yarn atau pnpm
- Supabase account (free tier)

### 1. Clone Repository

```bash
git clone <repository-url>
cd UTBK-game-simulation
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup Supabase

1. Buat project di [Supabase](https://supabase.com)
2. Copy API credentials
3. Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DEV_MODE=true
```

**Note:** When registering, password must meet these requirements:
- Minimal 8 karakter
- Mengandung huruf (a-z, A-Z)
- Mengandung angka (0-9)
- Mengandung karakter khusus (!@#$%^&*)

### 4. Setup Database

1. Buka Supabase Dashboard → SQL Editor
2. Copy seluruh isi `supabase-schema.sql`
3. Paste dan Run (Ctrl+Enter)
4. Verify: Visit `/diagnostic` page

### 5. Run Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 6. Test & Verify

- Visit `/diagnostic` - Check database status
- Visit `/game` - Try playing (dev mode active)
- Check console for logs (✅/❌/⚠️/🔧)

## 📖 Documentation

- **Setup Guide**: [DATABASE_SETUP.md](DATABASE_SETUP.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Progress Tracking**: [PROGRESS.md](PROGRESS.md)
- **Database Schema**: [supabase-schema.sql](supabase-schema.sql)

## 🔧 Developer Tools

### Diagnostic Page

Visit `/diagnostic` to check:

- ✅ Database connection
- ✅ Table existence
- ✅ Question count
- ✅ Authentication status
- ✅ Detailed error messages

### Dev Mode

Set `NEXT_PUBLIC_DEV_MODE=true` for:

- 🔧 Mock user authentication
- 🔧 Skip database save
- 🔧 Visual dev badge
- 🔧 Enhanced logging

### Console Logging

- ✅ Success (green)
- ❌ Error (red)
- ⚠️ Warning (yellow)
- 🔧 Dev mode (yellow)
- 💾 Database operations
- 🎮 User actions

## 📊 Database Schema

### Tables

1. **profiles** - User data & stats
2. **questions** - Question bank (UTBK)
3. **game_results** - Game session results
4. **global_leaderboard** - Materialized view (top 100)

### Features

- ✅ Auto-update profile stats (triggers)
- ✅ Auto-refresh leaderboard (triggers)
- ✅ Row Level Security (RLS)
- ✅ Indexed for performance

See [supabase-schema.sql](supabase-schema.sql) for details.

## 🚀 Deployment ke Vercel

### Prerequisites

- Akun GitHub dengan repository project ini
- Akun Vercel (gratis)
- Supabase project dengan database sudah setup

### Steps:

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Import ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import repository dari GitHub
   - Framework preset akan otomatis detect Next.js

3. **Setup Environment Variables**
   
   Di Vercel dashboard, tambahkan:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_MODE=false
   ```

4. **Deploy**
   - Click "Deploy"
   - Tunggu build selesai (2-3 menit)
   - Domain otomatis: `your-project.vercel.app`

5. **Verify Production**
   - Test login/register
   - Play game dan check leaderboard
   - Verify data tersimpan di Supabase

### Post-Deployment

- ✅ Custom domain (opsional)
- ✅ Setup analytics (Vercel Analytics)
- ✅ Monitor performance
- ✅ Check error logs di Vercel dashboard

## 🧪 Testing

### Local Development
```bash
npm run dev
# Visit http://localhost:3000
```

### Production Build Test
```bash
npm run build
npm run start
# Visit http://localhost:3000
```

### Diagnostic Check
Visit `/diagnostic` untuk verify:
- Database connection
- Question count (should be 350)
- Authentication
- Table structure

## 📝 Important Notes

### Environment Variables
- `NEXT_PUBLIC_DEV_MODE=false` untuk production
- `NEXT_PUBLIC_DEV_MODE=true` untuk development (skip auth)
- Supabase credentials wajib diisi untuk production

### Database Requirements
- 350 questions minimum (50 per category)
- Materialized view `global_leaderboard` harus di-create
- RLS policies harus aktif untuk security
- Triggers untuk auto-update stats harus ada

### Authentication Flow
- Registration: Full name → Auto-generate username
- School & target university collected at registration
- Profile auto-created on first login
- Protected routes: `/game`, `/study` require login

### Game Mechanics
- 15 mixed questions (PU: 3, others: 2 each)
- 80% hard, 20% medium difficulty
- 10-minute timer (600 seconds)
- 3 lives system
- Score: 1000 base + 5pts/sec + streak bonus (1.5x for ≥3 correct)

### Leaderboard System
- Materialized view with CTE optimization
- Shows best game per user (not sum)
- Ranking: Score DESC → Correct DESC → Time ASC
- Auto-refreshes on new game completion

## 🔧 Troubleshooting

**Auth session missing warning:**
- Normal behavior untuk non-logged users
- Warning sudah diminimalisir dengan session check
- Tidak mempengaruhi functionality

**Questions not loading:**
- Check database connection di `/diagnostic`
- Verify 350 questions exists
- Check Supabase RLS policies

**Stats not updating:**
- Verify database triggers aktif
- Check `fix-leaderboard-view.sql` sudah dijalankan
- Materialized view mungkin perlu refresh manual

**More issues?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📚 Additional Documentation

- **Setup Guide**: [DATABASE_SETUP.md](DATABASE_SETUP.md) - Complete database setup
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- **Progress**: [PROGRESS.md](PROGRESS.md) - Development timeline
- **Schema**: [supabase-schema.sql](supabase-schema.sql) - Full database schema
- **Leaderboard Fix**: [fix-leaderboard-view.sql](fix-leaderboard-view.sql) - View optimization

## 👥 Team

Developed with ❤️ by Team UTBK Game Simulation

## 📄 License

This project is for educational purposes.

---

**Status:** ✅ Production Ready | **Last Updated:** January 4, 2026

### Build untuk Production

```bash
npm run build
npm start
```

## 📖 Panduan Penggunaan

### 1. Halaman Utama (Home)

- Landing page dengan informasi tentang platform
- Tombol "Mulai Latihan Sekarang" untuk memulai simulasi
- Informasi fitur dan statistik aplikasi

### 2. Login/Register

- Pengguna baru harus mendaftar terlebih dahulu
- Pengguna terdaftar dapat login untuk menyimpan progres
- Data disimpan di localStorage (untuk prototype)

### 3. Halaman Game

- Simulasi ujian dengan pertanyaan multiple choice
- Timer countdown untuk setiap sesi
- Sistem nyawa (3 nyawa)
- Jawaban salah akan mengurangi 1 nyawa
- Game over jika nyawa habis

### 4. Halaman Hasil

- Menampilkan skor akhir
- Statistik jawaban benar/salah
- Waktu yang digunakan
- Tombol untuk mencoba lagi atau kembali ke home

### 5. Leaderboard

- Daftar 10 pemain teratas
- Ranking berdasarkan skor tertinggi
- Menampilkan nama pengguna dan skor

### 6. Profile

- Informasi pengguna
- Riwayat hasil ujian
- Statistik performa (rata-rata skor, total ujian, dll)

## 🎨 Komponen Utama

### Navbar

Navigation bar yang muncul di semua halaman dengan menu:

- Home
- Game
- Leaderboard
- Profile
- Login/Logout

### Card

Wrapper component untuk konten dengan styling konsisten.

### QuestionOption

Button component khusus untuk pilihan jawaban dengan feedback visual.

### LifeIndicator

Indikator visual untuk menampilkan sisa nyawa pemain.

### FireIcon

Animated fire icon component untuk streak indicator dengan:
- WebP animation untuk performa optimal
- Three variants: default, intense, crazy
- Dynamic scaling berdasarkan streak level
- Glow effects dan sparkles untuk active state
- Particle effects untuk high streak tiers

### ButtonPrimary

Button component dengan styling primary untuk CTA (Call to Action).

## 🗄️ Penyimpanan Data

Saat ini, aplikasi menggunakan **localStorage** untuk menyimpan:

- Status login pengguna
- Data profil pengguna
- Riwayat hasil ujian
- Data leaderboard

> **Note**: Untuk production, disarankan menggunakan backend API dengan database yang proper (PostgreSQL, MongoDB, dll)

## 🔧 Konfigurasi

### Tailwind CSS

Aplikasi menggunakan Tailwind CSS v4 dengan konfigurasi di `tailwind.config.ts`.

### TypeScript

Type checking dikonfigurasi di `tsconfig.json` dengan strict mode.

### ESLint

Linting rules dikonfigurasi di `eslint.config.mjs` menggunakan Next.js recommended config.

## 🚀 Pengembangan Lebih Lanjut

### Fitur yang Dapat Ditambahkan

1. **Backend Integration**

   - API untuk autentikasi
   - Database untuk persistent storage
   - Real-time leaderboard updates

2. **Fitur Tambahan**

   - Berbagai kategori soal (Matematika, Bahasa Indonesia, Bahasa Inggris, dll)
   - Tingkat kesulitan (Easy, Medium, Hard)
   - Mode latihan vs mode ujian
   - Pembahasan soal setelah selesai
   - Achievement system
   - Friend system dan challenges

3. **Analytics**

   - Dashboard analytics untuk guru/admin
   - Tracking performa detail per topik
   - Rekomendasi soal berdasarkan kelemahan

4. **Optimisasi**
   - Image optimization
   - SEO optimization
   - Performance monitoring
   - Progressive Web App (PWA)

## 📝 Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint untuk code quality check

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini dibuat untuk tujuan edukasi.

## 👥 Tim Pengembang

Dikembangkan dengan ❤️ untuk membantu siswa Indonesia mempersiapkan UTBK

## 📞 Kontak & Dukungan

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🔗 Deploy

Aplikasi ini dapat di-deploy ke berbagai platform:

- **Vercel** (Recommended): [Deploy Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- **Netlify**: [Deploy Guide](https://docs.netlify.com/frameworks/next-js/overview/)
- **Railway**: [Deploy Guide](https://docs.railway.app/guides/nextjs)

---

**Happy Learning! 🎓📚**
