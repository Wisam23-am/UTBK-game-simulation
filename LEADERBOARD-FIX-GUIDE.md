# 🔧 Panduan Memperbaiki Leaderboard Total Games

## Masalah
`total_games` di leaderboard tidak update setelah menghapus data di tabel `game_results`.

## Penyebab
Menggunakan **MATERIALIZED VIEW** yang perlu di-refresh manual setelah perubahan data.

---

## ✅ Solusi 1: Refresh Materialized View (Cepat)

### Langkah:
1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan query ini:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY global_leaderboard;
```

3. Atau jalankan semua kode di file: **`fix-leaderboard-refresh.sql`**
4. Refresh halaman leaderboard di browser
5. Klik tombol **"🔄 Refresh Data"** di halaman

### Kelebihan:
- ✅ Query lebih cepat (data di-cache)
- ✅ Bagus untuk leaderboard dengan banyak user

### Kekurangan:
- ❌ Perlu refresh manual atau via trigger
- ❌ Kadang trigger tidak jalan saat DELETE

---

## ✅ Solusi 2: Ubah ke Real-Time View (Direkomendasikan)

### Langkah:
1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan semua kode di file: **`leaderboard-realtime-view.sql`**
3. Refresh halaman leaderboard di browser

### Kelebihan:
- ✅ **Selalu real-time** - tidak perlu refresh
- ✅ Otomatis update saat data berubah
- ✅ Tidak perlu trigger atau RPC

### Kekurangan:
- ⚠️ Sedikit lebih lambat (tapi tidak signifikan untuk <1000 user)

---

## 🧪 Cara Verifikasi

Setelah menjalankan salah satu solusi, cek dengan query ini:

```sql
-- Cek jumlah game AKTUAL di tabel game_results
SELECT 
  p.username,
  COUNT(gr.id) as actual_games,
  MAX(gr.score) as best_score
FROM profiles p
LEFT JOIN game_results gr ON p.id = gr.user_id
WHERE p.username = 'aqilamadani23'
GROUP BY p.id, p.username;

-- Cek data di view leaderboard
SELECT username, total_games, best_score, rank
FROM global_leaderboard
WHERE username = 'aqilamadani23';
```

Kedua query harus menunjukkan angka yang **sama**.

---

## 📌 Rekomendasi

Untuk aplikasi baru dengan <10,000 user, gunakan **Solusi 2 (Real-Time View)**.

Untuk aplikasi besar dengan jutaan user, gunakan **Solusi 1 (Materialized View)** dan pastikan trigger berjalan dengan baik.
