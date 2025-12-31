# 🎮 UTBK Game Simulation

Platform latihan UTBK (Ujian Tulis Berbasis Komputer) yang inovatif dengan pendekatan gamifikasi untuk membuat persiapan ujian lebih menyenangkan dan efektif.

## � Status Proyek

**Phase 2 Complete ✅** - Full Integration with Real-time Data  
**Current:** Production-ready, needs more questions for launch

### ✅ Completed Features:

#### Database & Game Core

- Database fully integrated with Supabase
- Real-time question fetching
- Game result saving
- Auto-update leaderboard stats
- Dev mode for easy testing
- Diagnostic tools
- Error handling & logging

#### User Features (Phase 2)

- ✅ Leaderboard page with real-time data from database
- ✅ Profile page with game history & statistics
- ✅ Supabase authentication (login/register)
- ✅ Dashboard login detection via Supabase
- ✅ Navbar with proper auth state management
- ✅ LeaderboardCard real-time data fetch

### 🎯 Next Steps:

- Add 200+ questions (currently only 10)
- Deploy to production (Vercel)
- Performance optimization
- Add more question categories

## 📋 Deskripsi

UTBK Game Simulation adalah aplikasi web yang dirancang untuk membantu siswa mempersiapkan diri menghadapi UTBK dengan cara yang lebih interaktif dan menarik. Aplikasi ini menggunakan konsep gamifikasi dengan sistem nyawa, timer, dan leaderboard untuk meningkatkan motivasi belajar.

### ✨ Fitur Utama

- 🎯 **Simulasi Ujian Real-time**: Timer dan sistem penilaian otomatis yang menyerupai ujian UTBK sebenarnya
- ❤️ **Sistem Nyawa**: Game mechanics dengan 3 nyawa untuk meningkatkan fokus dan tantangan
- 🏆 **Leaderboard**: Kompetisi global dengan pengguna lain (powered by Supabase)
- 📊 **Pelacakan Progress**: Riwayat hasil ujian dan analisis performa tersimpan di database
- 👤 **Sistem Autentikasi**: Login dan register dengan Supabase Auth
- 📱 **Responsive Design**: Dapat diakses dari desktop, tablet, dan mobile
- 💡 **Penjelasan Soal**: Setiap soal dilengkapi dengan penjelasan detail
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
│   └── LifeIndicator.tsx   # Life/health indicator
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
│   └── logo.png            # App logo
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
