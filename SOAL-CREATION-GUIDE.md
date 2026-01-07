# ✅ Panduan Pembuatan Soal SNBT - QuizQuest

**Last Updated:** January 7, 2026

## 🎯 Tujuan Dokumen

Panduan ini memastikan setiap soal yang dibuat:
- ✅ Sesuai standar SNBT resmi
- ✅ Memenuhi kriteria kategori
- ✅ Konsisten dalam format & kualitas
- ✅ Siap untuk IRT scoring system

---

## 📋 Checklist Wajib SEMUA Soal

Sebelum submit soal ke database, pastikan:

- [ ] **Category** valid: `pu`, `ppu`, `pbm`, `pk`, `lbi`, `lbe`, `pm`
- [ ] **Subcategory** sesuai dengan materi (lihat [TRYOUT-MATERIALS-ROTATION.md](TRYOUT-MATERIALS-ROTATION.md))
- [ ] **Difficulty** valid: `easy`, `medium`, `hard`
- [ ] **Difficulty_weight** sesuai: `8` (easy), `10` (medium), `12` (hard)
- [ ] **Question_text** jelas, lengkap, tidak ambigu
- [ ] **Options** JSONB array dengan 5 opsi A-E
- [ ] **Correct_answer** huruf kapital A/B/C/D/E (1 jawaban saja)
- [ ] **Explanation** lengkap kenapa jawaban benar
- [ ] **Verified** set `true` setelah QA
- [ ] **Source** dicantumkan (contoh: 'internal-2026', 'pdf-utbk-2025')

---

## 🧠 PU – Penalaran Umum

### **Kriteria Wajib:**
✅ Logika murni, tidak butuh pengetahuan luar  
✅ Informasi cukup dari soal (self-contained)  
✅ Jawaban konsisten secara logika  
✅ Tidak ada asumsi di luar soal  
✅ **Bisa diselesaikan dengan diagram/tabel sederhana** ⚡

### **⚡ Teknik Cepat PU:**

**PENTING:** PU terlihat rumit, tapi bisa dipermudah dengan **visualisasi**!

**Teknik Efisien:**

1. **Diagram Venn (untuk silogisme):**
   ```
   Semua A adalah B
   Semua B adalah C
   → Gambar 3 lingkaran (A dalam B dalam C)
   → Langsung terlihat: Semua A adalah C ✓
   ```

2. **Tabel Kebenaran (untuk logika proposisi):**
   ```
   Jika P maka Q
   Tidak Q
   → Tabel: P=T,Q=F → Kontradiksi
   → Kesimpulan: Tidak P ✓
   ```

3. **Tree Diagram (untuk urutan logika):**
   ```
   A > B, B > C, C > D
   → Buat tree: A → B → C → D
   → Yang terbesar? A ✓
   ```

4. **Eliminasi (untuk pola bilangan):**
   ```
   2, 5, 10, 17, ?
   Selisih: 3, 5, 7, ... (pola +2)
   Berikutnya: +9 → 17+9 = 26 ✓
   ```

**⚠️ WARNING:**
- ❌ Jangan buat soal yang butuh hitung aljabar panjang
- ✅ Harus bisa diselesaikan dengan diagram/gambar
- ✅ Pattern harus konsisten & jelas

### **Tipe Soal:**
1. Hubungan pernyataan (jika–maka)
2. Benar–salah–tidak dapat ditentukan
3. Silogisme
4. Pola simbol/gambar
5. Analogi logis
6. Penarikan kesimpulan
7. Kontradiksi pernyataan
8. Urutan logika
9. Sebab-akibat
10. Logika proposisi

### **Format Soal:**

**Subcategory:** `hubungan-pernyataan`, `silogisme`, `sebab-akibat`, `pola-bilangan`, `pola-gambar`, `analogi`, `penarikan-kesimpulan`, `kontradiksi`, `urutan-logika`, `logika-proposisi`

**Contoh Baik:**
```
Category: pu
Subcategory: silogisme
Difficulty: medium
Question: 
Semua mahasiswa rajin belajar.
Budi adalah mahasiswa.
Kesimpulan yang tepat adalah...

A. Budi rajin belajar
B. Budi tidak rajin belajar
C. Budi mungkin rajin belajar
D. Tidak dapat disimpulkan
E. Semua orang rajin belajar

Correct: A
Explanation: Menggunakan silogisme: Premis mayor (semua mahasiswa...) + Premis minor (Budi mahasiswa) = Kesimpulan (Budi rajin belajar).
```

**Contoh Buruk ❌:**
```
Question: Einstein adalah fisikawan jenius. Siapa yang menemukan relativitas?
→ Butuh pengetahuan luar (sejarah sains)
→ Tidak logika murni
```

---

## 📘 PPU – Pengetahuan & Pemahaman Umum

### **Kriteria Wajib:**
✅ Teks pendek (1-3 kalimat max)  
✅ Fokus kata, frasa, atau kalimat tunggal  
✅ TIDAK ada cerita panjang  
✅ Bahasa Indonesia baku

### **Tipe Soal:**
1. Sinonim / antonim
2. Makna kata dalam konteks
3. Hubungan antar kalimat
4. Kalimat efektif
5. Ide pokok singkat
6. Fakta vs opini
7. Kesalahan penggunaan kata
8. Kohesi & koherensi
9. Istilah ilmiah & populer

### **Format Soal:**

**Subcategory:** `makna-kata`, `sinonim-antonim`, `ide-pokok`, `hubungan-kalimat`, `fakta-opini`, `kalimat-efektif`, `kohesi-koherensi`, `istilah-ilmiah`, `kesalahan-kata`

**Contoh Baik:**
```
Category: ppu
Subcategory: makna-kata
Difficulty: easy
Question: 
Pemerintah akan mengimplementasikan kebijakan baru tahun depan.

Kata "mengimplementasikan" pada kalimat di atas memiliki makna...

A. Merencanakan
B. Melaksanakan
C. Mengevaluasi
D. Membatalkan
E. Mempertimbangkan

Correct: B
Explanation: Implementasi = melaksanakan/menjalankan sesuatu yang sudah direncanakan.
```

**Contoh Buruk ❌:**
```
Question: Bacalah paragraf berikut (5 paragraf panjang)... Apa ide pokok teks?
→ Terlalu panjang untuk PPU (ini masuk PBM/LBI)
```

---

## 📖 PBM – Pemahaman Bacaan & Menulis

### **Kriteria Wajib:**
✅ Bacaan 1-4 paragraf (180-250 kata)  
✅ Bahasa formal / ilmiah populer  
✅ Jawaban berdasarkan teks  
✅ Minimal 1 bacaan analitis per Try-Out

### **Tipe Soal:**
1. Ide pokok paragraf
2. Simpulan bacaan
3. Tujuan penulis
4. Makna tersirat
5. Hubungan antar paragraf
6. Perbaikan kalimat/paragraf
7. Penilaian argumen
8. Kesalahan penalaran
9. Struktur teks
10. Konsistensi gagasan

### **Format Soal:**

**Subcategory:** `ide-pokok`, `simpulan`, `tujuan-penulis`, `makna-tersirat`, `hubungan-paragraf`, `perbaikan-kalimat`, `penilaian-argumen`, `kesalahan-penalaran`, `struktur-teks`, `konsistensi-gagasan`

**Contoh Baik:**
```
Category: pbm
Subcategory: ide-pokok
Difficulty: medium
Question: 
Perhatikan paragraf berikut!

[Paragraf 180-250 kata tentang energi terbarukan]

Ide pokok paragraf tersebut adalah...

A. Energi terbarukan mahal
B. Indonesia kaya sumber energi terbarukan
C. Pemanfaatan energi terbarukan perlu ditingkatkan
D. Energi fosil akan habis
E. Panel surya sangat efisien

Correct: C
Explanation: Paragraf membahas pentingnya meningkatkan pemanfaatan energi terbarukan di Indonesia (kalimat utama paragraf 1).
```

**Contoh Buruk ❌:**
```
Question: [1 kalimat pendek] Apa makna kata "implementasi"?
→ Terlalu pendek untuk PBM (ini masuk PPU)
```

---

## 🔢 PK – Pengetahuan Kuantitatif

### **Kriteria Wajib:**
✅ Hitungan tidak panjang  
✅ Bisa dikerjakan manual (tanpa kalkulator scientific)  
✅ Fokus konsep, bukan rumus berat  
✅ Waktu ideal: 1.5 menit per soal  
✅ **WAJIB ADA TRIK CEPAT** ⚡ (sangat penting!)

### **⚡ Prinsip Trik Cepat di SNBT:**

**PENTING:** Soal PK di SNBT dirancang agar terlihat sulit, tapi **PASTI ada trik cepat**!

**Ciri-ciri soal dengan trik cepat:**
- ✅ Angka "bulat" atau proporsional (2, 3, 5, 10, 25, 50, 100)
- ✅ Perbandingan sederhana (2:3, 3:5, 1:2:3)
- ✅ Pola tertentu yang bisa dieliminasi
- ✅ Bisa diselesaikan dengan **logika** tanpa hitung panjang

**Contoh Trik Cepat:**

1. **Eliminasi Opsi:**
   ```
   Soal: 17 × 23 = ?
   Trik: Lihat digit terakhir (7 × 3 = 21 → digit terakhir 1)
   Eliminasi opsi yang tidak berakhiran 1
   ```

2. **Perkalian Silang (Butterfly Method):**
   ```
   Soal: 2/3 + 3/5 = ?
   Trik: (2×5 + 3×3) / (3×5) = 19/15
   Tanpa perlu nyamakan penyebut dulu
   ```

3. **Pattern Recognition:**
   ```
   Soal: 99 × 97 = ?
   Trik: (100-1)(100-3) = 10000 - 300 - 100 + 3 = 9603
   Atau: (98-1)(98+1) = 98² - 1 = 9604 - 1
   ```

4. **Perbandingan Tanpa Hitung Total:**
   ```
   Soal: A:B = 3:5, B:C = 2:7. A:B:C = ?
   Trik: Samakan B → A:B = 6:10, B:C = 10:35
   Jadi A:B:C = 6:10:35 (tanpa hitung nilai riil)
   ```

5. **Estimasi Cerdas:**
   ```
   Soal: √97 × √103 ≈ ?
   Trik: √(97 × 103) = √(100² - 3×100 + something) ≈ √9991 ≈ 99.9
   Atau lebih cepat: √(100×100) = 100 (karena 97×103 sangat dekat 10000)
   ```

**⚠️ WARNING untuk Pembuat Soal:**
- ❌ JANGAN buat soal yang HANYA bisa dikerjakan dengan hitung panjang
- ✅ SELALU sediakan jalur "trik cepat" selain jalur "normal"
- ✅ Test dengan stopwatch: trik cepat harus ≤ 45 detik
- ✅ Angka harus "disengaja" untuk memicu trik tertentu

### **Tipe Soal:**
1. Hitung cepat (aritmetika)
2. Perbandingan & rasio
3. Persamaan sederhana
4. Log, turunan, matriks (level dasar)
5. Barisan & deret
6. Statistik dasar
7. Geometri sederhana
8. Peluang dasar
9. Fungsi
10. Aritmetika sosial

### **Format Soal:**

**Subcategory:** `hitung-cepat`, `perbandingan`, `persamaan-sederhana`, `logaritma`, `turunan`, `matriks`, `barisan-deret`, `statistika`, `geometri`, `peluang`, `fungsi`, `aritmetika-sosial`

**Contoh Baik (dengan trik cepat):**
```
Category: pk
Subcategory: perbandingan
Difficulty: medium
Question: 
Perbandingan uang A dan B adalah 3:5. Jika jumlah uang mereka Rp 800.000, berapa uang A?

A. Rp 200.000
B. Rp 300.000
C. Rp 400.000
D. Rp 500.000
E. Rp 600.000

Correct: B
Explanation: 
Jalur Normal:
Total bagian = 3 + 5 = 8
Uang A = (3/8) × 800.000 = 300.000

Trik Cepat:
800.000 ÷ 8 bagian = 100.000 per bagian
A dapat 3 bagian = 3 × 100.000 = 300.000 ✅
(Hitung dalam pikiran, < 30 detik)
```

**Contoh Sangat Baik (angka proporsional):**
```
Category: pk
Subcategory: perbandingan
Difficulty: hard
Question:
Dalam sebuah kelas, perbandingan siswa laki-laki dan perempuan adalah 5:7.
Jika ada 36 siswa total, berapa selisih siswa perempuan dan laki-laki?

A. 4 siswa
B. 6 siswa
C. 8 siswa
D. 10 siswa
E. 12 siswa

Correct: B
Explanation:
Jalur Normal:
Total bagian = 5 + 7 = 12
Laki-laki = (5/12) × 36 = 15
Perempuan = (7/12) × 36 = 21
Selisih = 21 - 15 = 6

Trik Cepat:
Selisih bagian = 7 - 5 = 2 bagian
36 ÷ 12 = 3 per bagian
Selisih = 2 × 3 = 6 ✅
(Tidak perlu hitung jumlah masing-masing!)

Angka 36 dipilih karena habis dibagi 12 → menunjukkan ada trik!
```

**Contoh Buruk ❌:**
```
Question: Hitunglah integral dari...
→ Terlalu rumit, butuh kalkulator
→ Bukan "pengetahuan kuantitatif" level SNBT
```

---

## 📗 LBI – Literasi Bahasa Indonesia

### **Kriteria Wajib:**
✅ Teks panjang (4-8+ paragraf, 250-500 kata)  
✅ Topik: sosial, sains, budaya, kebijakan  
✅ TIDAK menguji tata bahasa  
✅ Bahasa formal, objektif

### **Tipe Soal:**
1. Gagasan utama keseluruhan teks
2. Inferensi
3. Evaluasi argumen
4. Konsistensi ide
5. Sikap/tujuan penulis
6. Hubungan sebab–akibat
7. Kesimpulan umum
8. Kritik isi teks

### **Jenis Teks:**
- Teks narasi (cerita/pengalaman)
- Teks eksposisi (penjelasan)
- Teks argumentasi (opini)
- Teks ilmiah populer

### **Format Soal:**

**Subcategory:** `teks-narasi`, `teks-eksposisi`, `teks-argumentasi`, `teks-ilmiah-populer`, `gagasan-utama`, `inferensi`, `evaluasi-argumen`, `konsistensi-ide`, `sikap-penulis`, `hubungan-sebab-akibat`, `kritik-teks`

**Contoh Baik:**
```
Category: lbi
Subcategory: inferensi
Difficulty: hard
Question: 
Perhatikan teks berikut!

[Teks 350 kata tentang perubahan iklim dan dampaknya]

Berdasarkan teks, dapat disimpulkan bahwa...

A. Perubahan iklim tidak berbahaya
B. Pemerintah harus segera bertindak mengatasi perubahan iklim
C. Masyarakat tidak peduli lingkungan
D. Teknologi hijau sudah memadai
E. Emisi karbon sudah menurun drastis

Correct: B
Explanation: Dari paragraf 3-4, disebutkan dampak serius perubahan iklim dan perlunya tindakan cepat dari pemerintah.
```

**Contoh Buruk ❌:**
```
Question: [Teks 2 paragraf] Apa ide pokok?
→ Terlalu pendek untuk LBI (ini masuk PBM)
```

---

## 📕 LBE – Literasi Bahasa Inggris

### **Kriteria Wajib:**
✅ Teks panjang (200-400 kata)  
✅ Grammar TIDAK diuji langsung  
✅ 100% reading comprehension  
✅ Bahasa Inggris formal

### **Tipe Soal:**
1. Main idea
2. Inference
3. Reference (kata ganti)
4. Vocabulary in context
5. Author's purpose
6. Tone / attitude
7. Paraphrase makna
8. Detail (tersurat & tersirat)

### **Topik Teks:**
- Sains/teknologi
- Sosial/budaya
- Ekonomi/bisnis
- Sejarah
- Lingkungan
- Kesehatan
- Pendidikan

### **Format Soal:**

**Subcategory:** `main-idea`, `inference`, `reference`, `vocabulary-context`, `author-purpose`, `tone-attitude`, `paraphrase`, `detail`, `topik-sains`, `topik-sosial`, `topik-ekonomi`, `topik-sejarah`, `topik-lingkungan`

**Contoh Baik:**
```
Category: lbe
Subcategory: inference
Difficulty: medium
Question: 
Read the following passage:

[Passage 250 kata tentang artificial intelligence]

What can be inferred from the passage?

A. AI will replace all human jobs
B. AI development requires careful regulation
C. AI is completely safe
D. AI cannot learn from data
E. AI is only useful for gaming

Correct: B
Explanation: The passage mentions concerns about AI ethics and safety (paragraph 3), implying need for regulation.
```

**Contoh Buruk ❌:**
```
Question: Choose the correct tense: She _____ to school yesterday.
→ Grammar langsung (TIDAK DIUJI di SNBT)
```

---

## ➗ PM – Penalaran Matematika

### **Kriteria Wajib:**
✅ Cerita panjang (kontekstual)  
✅ Banyak informasi → harus disaring  
✅ Bisa dibuat flowchart/tabel/grafik  
✅ Fokus penalaran, bukan hitung rumit  
✅ **Harus ada jalur "filter informasi" yang efisien** ⚡

### **⚡ Prinsip Efisiensi di PM:**

**PENTING:** PM bukan tentang hitung rumit, tapi tentang **memilih informasi yang relevan**!

**Teknik Efisien:**

1. **Buat Tabel/Diagram:**
   - Cerita panjang → visualisasi
   - Lebih cepat lihat pola
   - Hindari baca ulang berkali-kali

2. **Identifikasi Info Penting vs Noise:**
   - Garis bawahi angka kunci
   - Abaikan detail tidak relevan
   - Fokus pada yang ditanya

3. **Working Backwards:**
   - Mulai dari yang ditanya
   - Cari info yang dibutuhkan
   - Abaikan sisanya

4. **Pattern Matching:**
   - Cari pola dalam angka
   - Proporsi sederhana → trik cepat
   - Angka bulat → ada shortcut

**Contoh Strategi Cepat:**
```
Soal Panjang: (5 paragraf tentang bisnis, 15+ angka)
Yang ditanya: Profit bulan Maret

Trik:
1. Skip paragraf 1-2 (background story)
2. Cari tabel/data bulan Maret
3. Rumus profit = Revenue - Cost
4. Hanya hitung untuk Maret
5. Selesai (2 menit max)

❌ JANGAN baca semua detail!
✅ Langsung cari info kunci!
```

### **Tipe Soal:**
1. Cerita kontekstual (kehidupan nyata)
2. Informasi berlebih yang harus disaring
3. Penalaran bertahap (multi-step)
4. Pemodelan matematika
5. Interpretasi grafik & tabel
6. Estimasi & pendekatan
7. Perbandingan hasil
8. Optimasi sederhana
9. Konsistensi proses

### **Konteks:**
- Keuangan (bisnis, investasi, tabungan)
- Jarak & waktu (perjalanan, kecepatan)
- Produksi & distribusi
- Analisis data
- Pola & tren

### **Format Soal:**

**Subcategory:** `soal-cerita`, `informasi-berlebih`, `penalaran-bertahap`, `pemodelan`, `grafik-tabel`, `estimasi`, `perbandingan-hasil`, `optimasi`, `konsistensi-proses`, `konteks-keuangan`, `konteks-jarak`, `konteks-produksi`

**Contoh Baik:**
```
Category: pm
Subcategory: soal-cerita
Difficulty: hard
Question: 
Sebuah toko menjual 3 jenis produk: A, B, dan C.
- Produk A dijual Rp 50.000, margin 20%
- Produk B dijual Rp 80.000, margin 25%
- Produk C dijual Rp 120.000, margin 30%
- Biaya operasional tetap Rp 500.000/bulan
- Target laba bersih: Rp 2.000.000/bulan

Jika dalam sebulan terjual 50 unit A, 30 unit B, dan 20 unit C, 
apakah target laba tercapai?

A. Ya, dengan surplus Rp 150.000
B. Ya, dengan surplus Rp 250.000
C. Tidak, kurang Rp 100.000
D. Tidak, kurang Rp 200.000
E. Tepat sesuai target

Correct: A
Explanation: 
[Step-by-step calculation dengan filtering info penting]
```

**Contoh Buruk ❌:**
```
Question: Hitunglah √(144 × 25)
→ Terlalu sederhana, tidak ada penalaran
→ Ini masuk PK, bukan PM
```

---

## 🔍 Quality Assurance Checklist

### **Level 1: Self-Check (Pembuat Soal)**
- [ ] Soal sesuai kategori & subcategory
- [ ] Grammar/spelling correct
- [ ] Tidak ada typo
- [ ] Jawaban hanya 1 yang benar
- [ ] Distractor (opsi salah) masuk akal
- [ ] Explanation lengkap & jelas

### **Level 2: Peer Review**
- [ ] Soal tidak ambigu
- [ ] Tidak ada clue ke jawaban dari opsi lain
- [ ] Difficulty sesuai dengan kompleksitas
- [ ] Format JSONB options benar
- [ ] Source tercantum

### **Level 3: Final Verification**
- [ ] Test soal dengan 3+ orang
- [ ] 80%+ pilih jawaban yang benar
- [ ] Explanation mudah dipahami
- [ ] Set `verified = true`

---

## 📊 Difficulty Guidelines

### **Easy (8 points):**
- Konsep dasar
- 1-2 langkah penyelesaian
- Informasi jelas & langsung
- Target: 80%+ peserta benar

### **Medium (10 points):**
- Konsep menengah
- 2-3 langkah penyelesaian
- Perlu analisis sederhana
- Target: 50-70% peserta benar

### **Hard (12 points):**
- Konsep advanced
- 3+ langkah penyelesaian
- Perlu analisis mendalam
- Target: 20-40% peserta benar

---

## 🚫 Common Mistakes

### **❌ JANGAN:**
1. Soal yang butuh pengetahuan luar (PU)
2. Grammar langsung di LBE
3. Teks pendek di LBI
4. **Hitungan rumit tanpa trik cepat di PK** ⚠️ PENTING!
5. Soal hafalan di PM
6. Teks panjang di PPU
7. Jawaban ambigu (2+ jawaban benar)
8. Distractor terlalu jelas salah
9. Clue ke jawaban dari opsi lain
10. Explanation tidak menjelaskan
11. **Angka acak di PK/PM (harus proporsional untuk trik)** ⚠️

### **✅ LAKUKAN:**
1. Test soal dengan target audience
2. Review explanation dengan fresh eyes
3. Validate JSON format
4. Check typo & grammar
5. Ensure subcategory sesuai
6. Set difficulty berdasarkan complexity
7. Tambah context jika perlu
8. Buat distractor yang challenging
9. Peer review sebelum submit
10. Track performance soal (IRT)
11. **Test dengan stopwatch: PK harus < 1.5 menit dengan trik** ⚠️
12. **Sediakan 2 jalur penyelesaian: normal + trik cepat** ⚠️

---

## ⚡ Panduan Khusus: Trik Cepat SNBT

### **Mengapa Trik Cepat Penting?**

Soal SNBT dirancang untuk:
- ✅ Menguji **penalaran**, bukan kemampuan hitung
- ✅ Bisa dikerjakan dalam waktu singkat (1-1.5 menit)
- ✅ Memisahkan siswa yang "paham konsep" vs "hafal rumus"

**Filosofi SNBT:**
> Soal terlihat sulit → siswa yang hanya hafal rumus akan kesulitan  
> Soal punya trik cepat → siswa yang paham konsep akan cepat selesai

---

### **🎯 Checklist Trik Cepat per Kategori:**

#### **PU (Penalaran Umum):**
- [ ] Bisa diselesaikan dengan diagram sederhana
- [ ] Pattern harus konsisten & terlihat
- [ ] Tidak butuh hitung aljabar panjang
- [ ] Visualisasi membantu jawab < 1 menit

#### **PK (Pengetahuan Kuantitatif):**
- [ ] **Angka "proporsional" atau "bulat"** (2, 3, 5, 10, 25, 50, 100, dst)
- [ ] **Ada minimal 1 jalur trik cepat** (eliminasi, pattern, estimasi)
- [ ] **Test dengan trik: < 45 detik** ⏱️
- [ ] Explanation harus mention trik cepat
- [ ] **Angka bukan random** (disengaja untuk trigger trik)

**Contoh Angka Bagus vs Buruk:**
```
✅ BAGUS:
- 36 siswa, ratio 5:7 → 36 habis dibagi (5+7)=12
- 800.000, ratio 3:5 → 800 habis dibagi 8
- 99 × 97 → dekat dengan 100²
- √97 × √103 → dekat dengan √(100×100)

❌ BURUK:
- 37 siswa, ratio 5:7 → 37 tidak habis dibagi 12 (susah)
- 735.219, ratio 3:5 → angka aneh, tidak ada trik
- 87 × 53 → tidak ada pattern jelas
```

#### **PM (Penalaran Matematika):**
- [ ] Informasi berlebih yang jelas bisa diskip
- [ ] Ada pola yang bisa ditabel/diagram
- [ ] Tidak semua angka harus dihitung
- [ ] Fokus pada info kunci, bukan semua detail
- [ ] Working backwards lebih cepat dari forward

---

### **📊 Template Explanation dengan Trik Cepat:**

**Format Wajib untuk PK:**
```
Explanation:

📌 Jalur Normal (untuk pemahaman):
[Step-by-step calculation lengkap]

⚡ Trik Cepat (untuk SNBT):
[Shortcut yang efisien, < 45 detik]

💡 Kenapa Angka Ini Dipilih:
[Jelaskan kenapa angka sengaja proporsional]

Contoh:
"Angka 36 dipilih karena habis dibagi 12 (5+7), 
sehingga bisa langsung lihat 1 bagian = 3 siswa.
Ini ciri khas soal SNBT: angka disengaja untuk ada trik!"
```

**Format untuk PM:**
```
Explanation:

📌 Info Kunci:
[Hanya info yang relevan untuk jawaban]

❌ Info yang Bisa Diabaikan:
[List info berlebih yang sengaja ditambahkan]

⚡ Strategi Cepat:
[Cara filter informasi efisien]

💡 Estimasi Waktu:
- Baca semua detail: 5 menit ❌
- Filter + hitung kunci: 2 menit ✅
```

---

### **🎓 Training untuk Pembuat Soal:**

**Latihan Membuat Soal dengan Trik:**

1. **Start from the trick:**
   - Tentukan trik cepat yang ingin diuji
   - Baru buat soal yang memicu trik itu
   - Contoh: Ingin uji "selisih bagian" → buat soal ratio + selisih

2. **Pilih angka strategis:**
   - Untuk ratio a:b, total harus habis dibagi (a+b)
   - Untuk kuadrat, pilih angka dekat dengan perfect square
   - Untuk perkalian, pilih yang bisa difaktorkan

3. **Test dengan stopwatch:**
   - Jalur normal: berapa lama?
   - Jalur trik: berapa lama?
   - Target: trik 2-3x lebih cepat

4. **Ask: "Kenapa angka ini?"**
   - Jika jawaban: "Random" → REVISI!
   - Harus ada alasan: "Agar bisa pakai trik X"

---

### **📈 Quality Metrics:**

**Soal PK Berkualitas SNBT:**
- ⏱️ Waktu dengan trik: < 45 detik
- ⏱️ Waktu tanpa trik: 2-3 menit
- 📊 Ratio: trik 3-4x lebih cepat
- ✅ Angka proporsional/bulat
- ✅ Pattern jelas untuk yang "paham"
- ✅ Terlihat sulit untuk yang "hafalan"

**Red Flags (Soal Buruk):**
- ❌ Tidak ada trik cepat sama sekali
- ❌ Angka random/decimal banyak
- ❌ Butuh kalkulator scientific
- ❌ Trik sama sulitnya dengan normal
- ❌ Hanya bisa dengan hafal rumus

---

## 📝 Template INSERT SQL

```sql
INSERT INTO questions (
  category,
  subcategory,
  difficulty,
  difficulty_weight,
  question_text,
  options,
  correct_answer,
  explanation,
  verified,
  source,
  created_at
) VALUES (
  'pu',  -- category
  'silogisme',  -- subcategory
  'medium',  -- difficulty
  10,  -- difficulty_weight (8/10/12)
  'Semua mahasiswa rajin belajar. Budi adalah mahasiswa. Kesimpulan yang tepat adalah...',  -- question_text
  '[
    {"label": "A", "text": "Budi rajin belajar"},
    {"label": "B", "text": "Budi tidak rajin belajar"},
    {"label": "C", "text": "Budi mungkin rajin belajar"},
    {"label": "D", "text": "Tidak dapat disimpulkan"},
    {"label": "E", "text": "Semua orang rajin belajar"}
  ]'::jsonb,  -- options
  'A',  -- correct_answer
  'Menggunakan silogisme: Premis mayor (semua mahasiswa rajin) + Premis minor (Budi mahasiswa) = Kesimpulan (Budi rajin belajar).',  -- explanation
  true,  -- verified
  'internal-2026',  -- source
  NOW()
);
```

---

## 📚 Resources

- [TRYOUT-MATERIALS-ROTATION.md](TRYOUT-MATERIALS-ROTATION.md) - Sistem rotasi materi
- [IRT-SCORING-SYSTEM.md](IRT-SCORING-SYSTEM.md) - IRT scoring formula
- [QUESTION_VALIDATION.md](QUESTION_VALIDATION.md) - Validation checklist
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Database schema

---

**Last Updated:** January 7, 2026  
**Version:** 1.0  
**Status:** ✅ Ready for Use
