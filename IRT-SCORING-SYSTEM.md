# 📊 IRT Scoring System - QuizQuest Try-Out Mode

**Last Updated:** January 7, 2026

## 🎯 Apa itu IRT (Item Response Theory)?

**Item Response Theory (IRT)** adalah model statistik yang digunakan oleh LTMPT untuk scoring SNBT/UTBK yang lebih **fair** dan **akurat** dibandingkan sistem scoring tradisional.

### **Format Try-Out QuizQuest:**

Setiap Rabu & Minggu, tersedia **2 pilihan Try-Out:**

**A. TPS (Tes Potensi Skolastik) - 90 soal, 135 menit:**
- PU (Penalaran Umum): 30 soal, 45 menit
- PPU (Pengetahuan & Pemahaman Umum): 20 soal, 30 menit
- PBM (Pemahaman Bacaan & Menulis): 20 soal, 30 menit
- PK (Pengetahuan Kuantitatif): 20 soal, 30 menit

**B. Literasi - 70 soal, 75 menit:**
- LBI (Literasi Bahasa Indonesia): 30 soal, 30 menit
- LBE (Literasi Bahasa Inggris): 20 soal, 30 menit
- PM (Penalaran Matematika): 20 soal, 15 menit

**Peserta dapat:**
- Pilih salah satu (TPS saja atau Literasi saja)
- Ikut kedua Try-Out di hari yang sama
- Leaderboard terpisah untuk TPS & Literasi

### **Perbedaan dengan Scoring Tradisional:**

| Aspek | Scoring Tradisional | IRT Scoring |
|-------|---------------------|-------------|
| **Formula** | Fixed points per soal | Dynamic based on difficulty |
| **Fairness** | Semua soal nilai sama | Soal susah = nilai lebih tinggi |
| **Luck Factor** | High (menebak = sama dengan tahu) | Low (soal susah membedakan) |
| **Comparison** | Hanya compare total benar | Compare skill/ability level |

### **Contoh Kasus:**

**Siswa A:**
- Jawab benar 15 soal **hard** (correct_rate = 30%)
- IRT Score: **High** (karena soal yang dijawab susah)

**Siswa B:**
- Jawab benar 15 soal **easy** (correct_rate = 90%)
- IRT Score: **Medium** (karena soal yang dijawab mudah)

**Kesimpulan:** Siswa A lebih tinggi nilainya walaupun jumlah benar sama!

---

## 📐 Formula IRT yang Digunakan

### **1. Per Soal - Point Calculation:**

```javascript
// Base difficulty dari database
difficulty_weight = 8 (easy) | 10 (medium) | 12 (hard)

// Dynamic rarity bonus berdasarkan performa peserta lain
correct_rate = (jumlah_jawab_benar / usage_count) // dari database
rarity_bonus = 1 + (1 - correct_rate)

// Point yang didapat jika jawaban benar
points = difficulty_weight × rarity_bonus
```

**Contoh Perhitungan:**

| Soal | Difficulty | Weight | Correct Rate | Rarity Bonus | Points |
|------|------------|--------|--------------|--------------|--------|
| A    | Hard       | 12     | 30% (0.30)   | 1.70         | **20.4** |
| B    | Medium     | 10     | 70% (0.70)   | 1.30         | **13.0** |
| C    | Easy       | 8      | 90% (0.90)   | 1.10         | **8.8**  |

**Insight:**
- Soal Hard yang hanya 30% peserta bisa jawab → nilai 20.4 points
- Soal Easy yang 90% peserta bisa jawab → nilai 8.8 points
- **Difference:** 2.3x lebih tinggi!

### **2. Per Section - Score Scaling:**

```javascript
// Total raw points dari semua soal yang dijawab benar
raw_score = Σ points_earned

// Maximum possible points (asumsi semua soal hard & correct_rate = 0%)
max_possible = jumlah_soal × 12 × 2 // 12 = hard weight, 2 = rarity max

// Scale ke range 200-1000
scaled_score = 200 + (raw_score / max_possible) × 800
```

**Contoh untuk Section PU (30 soal):**

```
Peserta menjawab benar 22 soal:
- 15 soal hard (avg correct_rate = 35%) → 15 × 12 × 1.65 = 297 points
- 7 soal medium (avg correct_rate = 60%) → 7 × 10 × 1.40 = 98 points

raw_score = 297 + 98 = 395 points
max_possible = 30 × 12 × 2 = 720 points

scaled_score = 200 + (395 / 720) × 800
             = 200 + (0.5486 × 800)
             = 200 + 438.9
             = 638.9 ≈ 639
```

**Section Score PU:** **639 / 1000** ✅

### **3. Total Score - Simple Average:**

```javascript
// Untuk Try-Out TPS (average dari 4 sections)
final_score_tps = (pu_score + ppu_score + pbm_score + pk_score) / 4

// Untuk Try-Out Literasi (average dari 3 sections)
final_score_literasi = (lbi_score + lbe_score + pm_score) / 3

// TIDAK ADA weighted average karena TPS & Literasi terpisah
// User bisa ikut salah satu atau kedua Try-Out
```

**Contoh Perhitungan untuk Try-Out TPS:**

| Section | Score |
|---------|-------|
| PU      | 639   |
| PPU     | 720   |
| PBM     | 580   |
| PK      | 650   |

```
Final Score TPS = (639 + 720 + 580 + 650) / 4 = 647.25 ≈ 647
```

**Score Try-Out TPS:** **647 / 1000** 🎯

**Contoh Perhitungan untuk Try-Out Literasi:**

| Section | Score |
|---------|-------|
| LBI     | 750   |
| LBE     | 680   |
| PM      | 620   |

```
Final Score Literasi = (750 + 680 + 620) / 3 = 683.33 ≈ 683
```

**Score Try-Out Literasi:** **683 / 1000** 🎯

---

## 🔄 Dynamic Update System

### **Tracking per Soal:**

Setiap soal di database punya 2 kolom penting:

```sql
usage_count INTEGER DEFAULT 0      -- Berapa kali soal ini digunakan
correct_rate DECIMAL DEFAULT 0.5   -- % peserta yang jawab benar
```

### **Update Trigger:**

Setiap kali peserta selesai Try-Out:

```sql
-- Update usage_count dan correct_rate per soal
UPDATE questions
SET 
  usage_count = usage_count + 1,
  correct_rate = (
    (correct_rate × usage_count) + is_correct
  ) / (usage_count + 1)
WHERE id = question_id;
```

**Contoh:**

Soal ID `abc-123` (Hard):
- Awal: `usage_count = 100`, `correct_rate = 0.35` (35%)
- Peserta baru jawab **benar**:
  ```
  new_correct_rate = (0.35 × 100 + 1) / 101
                   = 36 / 101
                   = 0.356 (35.6%)
  ```
- Update: `usage_count = 101`, `correct_rate = 0.356`

**Benefit:**
- Soal otomatis ter-kalibrasi seiring waktu
- Nilai soal makin akurat setelah banyak peserta
- Fair untuk semua peserta (same baseline)

---

## 📈 Interpretasi Score

### **Range Score per Section:**

| Range | Kategori | Interpretasi |
|-------|----------|--------------|
| 800-1000 | **Excellent** | Top 5% peserta |
| 700-799 | **Very Good** | Top 10-20% |
| 600-699 | **Good** | Top 30-40% |
| 500-599 | **Average** | Middle 50% |
| 400-499 | **Below Average** | Bottom 30% |
| 200-399 | **Poor** | Bottom 10% |

### **Target PTN Berdasarkan Score:**

| Total Score | Target PTN |
|-------------|------------|
| 750-1000    | UI, ITB, UGM (top tier) |
| 650-749     | UNPAD, UNDIP, UNAIR |
| 550-649     | ITS, UNS, UNHAS |
| 450-549     | PTN regional |
| 200-449     | Perlu belajar lebih giat |

---

## 🎮 Implementasi di Try-Out Mode

### **Database Schema:**

```sql
-- Tambah kolom untuk IRT tracking
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS correct_rate DECIMAL DEFAULT 0.5;

-- Trigger auto-update setelah Try-Out
CREATE OR REPLACE FUNCTION update_question_irt_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Loop through all questions in user_answers
  UPDATE questions q
  SET 
    usage_count = usage_count + 1,
    correct_rate = (
      (correct_rate * usage_count) + 
      CASE WHEN (NEW.user_answers->>q.id->>'is_correct')::boolean 
        THEN 1 ELSE 0 END
    ) / (usage_count + 1)
  FROM jsonb_array_elements(NEW.user_answers) AS answer
  WHERE q.id = (answer->>'question_id')::uuid;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tryout_update_irt
AFTER INSERT ON tryout_sessions
FOR EACH ROW
EXECUTE FUNCTION update_question_irt_stats();
```

### **Helper Function (TypeScript):**

```typescript
// lib/game/irt-helpers.ts

export interface IRTQuestion {
  id: string;
  difficulty_weight: number; // 8, 10, atau 12
  correct_rate: number; // 0.0 - 1.0
  usage_count: number;
}

export interface IRTAnswer {
  question_id: string;
  is_correct: boolean;
  difficulty_weight: number;
  correct_rate: number;
  points_earned: number;
}

/**
 * Hitung points untuk 1 soal berdasarkan IRT
 */
export function calculateIRTPoints(
  question: IRTQuestion,
  isCorrect: boolean
): number {
  if (!isCorrect) return 0;

  const difficultyWeight = question.difficulty_weight; // 8, 10, atau 12
  const rarityBonus = 1 + (1 - question.correct_rate); // 1.0 - 2.0

  const points = difficultyWeight * rarityBonus;
  return Math.round(points * 10) / 10; // Round ke 1 decimal
}

/**
 * Scale raw score ke range 200-1000
 */
export function scaleIRTScore(
  rawScore: number,
  totalQuestions: number
): number {
  // Max possible: semua soal hard (12) dengan correct_rate = 0% (rarity = 2.0)
  const maxPossible = totalQuestions * 12 * 2;

  // Scale ke 200-1000
  const scaled = 200 + (rawScore / maxPossible) * 800;

  return Math.round(scaled);
}

/**
 * Hitung total score untuk section
 */
export function calculateSectionScore(
  answers: IRTAnswer[]
): {
  rawScore: number;
  scaledScore: number;
  correct: number;
  total: number;
} {
  const total = answers.length;
  const correct = answers.filter((a) => a.is_correct).length;
  const rawScore = answers.reduce((sum, a) => sum + a.points_earned, 0);
  const scaledScore = scaleIRTScore(rawScore, total);

  return { rawScore, scaledScore, correct, total };
}

/**
 * Hitung final score untuk Try-Out TPS
 */
export function calculateTPSFinalScore(sectionScores: {
  pu: number;
  ppu: number;
  pbm: number;
  pk: number;
}): number {
  const finalScore = (
    sectionScores.pu +
    sectionScores.ppu +
    sectionScores.pbm +
    sectionScores.pk
  ) / 4;

  return Math.round(finalScore);
}

/**
 * Hitung final score untuk Try-Out Literasi
 */
export function calculateLiterasiFinalScore(sectionScores: {
  lbi: number;
  lbe: number;
  pm: number;
}): number {
  const finalScore = (
    sectionScores.lbi +
    sectionScores.lbe +
    sectionScores.pm
  ) / 3;

  return Math.round(finalScore);
}
```

### **Usage Example:**

```typescript
// Di halaman Try-Out Results
import { 
  calculateIRTPoints, 
  calculateSectionScore, 
  calculateTPSFinalScore,
  calculateLiterasiFinalScore 
} from '@/lib/game/irt-helpers';

// Ambil data Try-Out dari database
const tryoutSession = await getTryoutSession(sessionId);
const testType = tryoutSession.test_type; // 'tps' atau 'literasi'
const userAnswers = tryoutSession.user_answers;

// Hitung score per section
const puAnswers = userAnswers.filter(a => a.category === 'pu');
const puScore = calculateSectionScore(puAnswers);

console.log('Section PU:', {
  correct: puScore.correct,
  total: puScore.total,
  rawPoints: puScore.rawScore,
  scaledScore: puScore.scaledScore
});

// Hitung final score berdasarkan test_type
let finalScore;

if (testType === 'tps') {
  finalScore = calculateTPSFinalScore({
    pu: puScore.scaledScore,
    ppu: ppuScore.scaledScore,
    pbm: pbmScore.scaledScore,
    pk: pkScore.scaledScore
  });
  console.log('Final Score TPS:', finalScore);
} else if (testType === 'literasi') {
  finalScore = calculateLiterasiFinalScore({
    lbi: lbiScore.scaledScore,
    lbe: lbeScore.scaledScore,
    pm: pmScore.scaledScore
  });
  console.log('Final Score Literasi:', finalScore);
}
```

---

## 🎓 Best Practices

### **1. Minimum Usage Count:**

Soal baru (usage_count < 30) masih **tidak stabil**. Gunakan default `correct_rate = 0.5` untuk soal baru.

```typescript
const effectiveCorrectRate = question.usage_count >= 30 
  ? question.correct_rate 
  : 0.5;
```

### **2. Outlier Detection:**

Jika `correct_rate < 0.1` atau `> 0.95`, soal mungkin **error**:
- `< 0.1` → Soal terlalu susah / key jawaban salah
- `> 0.95` → Soal terlalu mudah / bocor

**Action:** Review manual dan disable soal.

### **3. Regular Calibration:**

Setiap 100 peserta Try-Out, review distribution:
- Apakah ada soal dengan outlier `correct_rate`?
- Apakah `difficulty_weight` sesuai dengan `correct_rate` aktual?

**Adjustment Example:**
```sql
-- Soal Hard tapi correct_rate = 85% → turun jadi Medium
UPDATE questions
SET difficulty = 'medium', difficulty_weight = 10
WHERE id = 'xxx' AND correct_rate > 0.80 AND difficulty = 'hard';
```

---

## 📚 References

- [LTMPT - Sistem Penilaian SNBT](https://ltmpt.ac.id)
- [IRT in Educational Assessment (Wikipedia)](https://en.wikipedia.org/wiki/Item_response_theory)
- [Rasch Model for Test Scoring](https://en.wikipedia.org/wiki/Rasch_model)

---

**Last Updated:** January 7, 2026  
**Version:** 1.0  
**Status:** ✅ Ready for Implementation
