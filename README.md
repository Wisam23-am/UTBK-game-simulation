# 🎮 UTBK Game Simulation

Platform latihan UTBK (Ujian Tulis Berbasis Komputer) yang inovatif dengan **Dual Mode System**: **Game Mode** untuk practice cepat dengan leaderboard, dan **Try-Out Mode** untuk simulasi UTBK lengkap dengan scoring realistis.

## 🌟 Status Proyek

**Phase 2 Complete ✅** - Full Integration with Real-time Data  
**Phase 3 Planning ✅** - Dual Mode System Design Complete  
**Migration Applied ✅** - Leaderboard ranking optimized (Jan 4, 2026)  
**Current:** Ready for Enhanced Game Mode & Try-Out Mode development

### ✅ Completed Features:

#### Database & Game Core (Phase 1-2)

- Database fully integrated with Supabase PostgreSQL
- Real-time question fetching & caching
- Game result saving with auto-stats update
- Materialized view leaderboard (top 100)
- Dev mode for easy testing & development
- Comprehensive diagnostic tools
- Robust error handling & logging

#### User Features (Phase 2)

- ✅ User authentication (Supabase Auth with JWT)
- ✅ Dashboard with personalized greeting
- ✅ Real-time leaderboard (global rankings)
- ✅ Profile page (game history & detailed stats)
- ✅ Responsive navbar (mobile-first)
- ✅ LeaderboardCard component (top 5 live)

### 🚀 Planned Features (Phase 3):

#### 🎮 **Dual Mode System:**

**1. Game Mode (Enhanced)**

- 🎮 Quick practice (10-20 soal, ~20 menit)
- ⚡ Speed bonus system (faster = bonus points)
- 🔥 Streak bonus (consecutive correct)
- 🏆 **Public leaderboard** with tiebreaker
- ❤️ Life system (3 nyawa)
- 🎯 Category selection

**2. Try-Out Mode (NEW!)**

- 📝 Full UTBK simulation (95-175 soal)
- ⏱️ Real section timers (25-35 min/section)
- 🎯 IRT-based scoring (0-1000 like real UTBK)
- 📊 **Private analytics** (no leaderboard)
- 🔍 Strength/weakness identification
- 📈 University target comparison
- 📖 Complete review mode

### 🔥 Next Priorities:

1. **Add 200+ Questions** (HIGH) - TPS sections first
2. **Try-Out Mode Implementation** (HIGH) - 5-7 hours
3. **Enhanced Game Mode** (MEDIUM) - Bonus systems, 2-3 hours
4. **Deploy to Production** - Vercel + testing

## 📋 Deskripsi

UTBK Game Simulation adalah aplikasi web komprehensif yang membantu siswa mempersiapkan UTBK dengan **Dual Mode System**:

- **🎮 Game Mode**: Practice cepat & menyenangkan dengan leaderboard kompetitif
- **📝 Try-Out Mode**: Simulasi UTBK lengkap dengan scoring & analytics realistis

Aplikasi ini menggabungkan gamifikasi untuk motivasi dengan simulasi realistis untuk persiapan maksimal.

### ✨ Fitur Utama

#### 🎮 Game Mode Features:

- ⚡ **Quick Practice**: 15 soal campuran, selesai dalam 10 menit
- 🎲 **Mixed Categories**: Soal dari SEMUA kategori UTBK (PU, PK, PPU, PBM, LBI, LBE, PM)
- 🎯 **Smart Difficulty**: 60% hard, 40% medium untuk challenge optimal
- ❤️ **Life System**: 3 nyawa untuk tantangan ekstra
- 🏆 **Leaderboard Global**: Kompetisi dengan ribuan siswa
- 🔥 **Bonus System**: Speed & streak bonuses

#### 📝 Try-Out Mode Features:

- 📊 **Full UTBK Simulation**: 95-175 soal (TPS + Skolastik)
- ⏱️ **Real Timing**: Timer per section (25-35 menit)
- 🎯 **IRT Scoring**: Scoring 0-1000 seperti UTBK asli
- 📈 **Detailed Analytics**: Breakdown per section & topik
- 🔍 **Weakness Identification**: Rekomendasi materi untuk dipelajari
- 🎓 **University Comparison**: Bandingkan dengan passing grade PTN
- 📖 **Review Mode**: Lihat semua jawaban & penjelasan
- 🔒 **Private Results**: Tidak ada leaderboard, fokus ke improvement

#### ⚙️ General Features:

- 👤 **Authentication**: Login dengan Supabase Auth (aman & cepat)
- 📊 **Progress Tracking**: Riwayat lengkap semua latihan & try-out
- 📱 **Responsive Design**: Perfect di HP, tablet, & desktop
- 💡 **Detailed Explanations**: Penjelasan lengkap setiap soal
- 🔧 **Dev Mode**: Testing mode untuk development
- 🔧 **Dev Mode**: Testing mode untuk development tanpa database

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
│   └── diagnostic/          # Halaman diagnostik ✅ NEW
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
├── supabase-schema.sql     # Complete database schema ✅ NEW
├── DATABASE_SETUP.md       # Setup instructions ✅ NEW
├── TROUBLESHOOTING.md      # Common issues guide ✅ NEW
├── PROGRESS.md             # Development progress ✅ UPDATED
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

## 🚀 Instalasi dan Menjalankan Aplikasi

### Prasyarat

- Node.js 20.x atau lebih tinggi
- npm, yarn, pnpm, atau bun

### Langkah-langkah Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd UTBK-game-simulation
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   # atau
   bun dev
   ```

4. **Akses aplikasi**

   Buka browser dan akses [http://localhost:3000](http://localhost:3000)

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
