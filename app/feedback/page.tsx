"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";
import { getCurrentUser } from "@/lib/auth/auth-helpers";
import { createClient } from "@/lib/supabase/client";

type FeedbackType = "bug" | "question" | "comment";

export default function FeedbackPage() {
  const router = useRouter();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [userComment, setUserComment] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 300KB)
    const maxSize = 300 * 1024; // 300KB in bytes
    if (file.size > maxSize) {
      setError("Ukuran file maksimal 300KB");
      e.target.value = "";
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar");
      e.target.value = "";
      return;
    }

    setScreenshot(file);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Judul dan deskripsi harus diisi");
      return;
    }

    if (feedbackType === "question" && !questionId.trim()) {
      setError("ID Soal harus diisi untuk laporan soal");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const supabase = createClient();
      const { user } = await getCurrentUser();

      if (!user) {
        setError("Anda harus login terlebih dahulu");
        setIsSubmitting(false);
        return;
      }

      // Upload screenshot if exists
      let screenshotUrl = null;
      if (screenshot) {
        const fileName = `${user.id}-${Date.now()}-${screenshot.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("feedback-screenshots")
          .upload(fileName, screenshot);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          setError("Gagal upload screenshot");
          setIsSubmitting(false);
          return;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("feedback-screenshots")
          .getPublicUrl(fileName);

        screenshotUrl = urlData.publicUrl;
      }

      // Insert feedback to database
      const { error: insertError } = await supabase
        .from("user_feedback")
        .insert({
          user_id: user.id,
          feedback_type: feedbackType,
          title: title.trim(),
          description: description.trim(),
          question_id: feedbackType === "question" ? questionId.trim() : null,
          user_comment: userComment.trim() || null,
          screenshot_url: screenshotUrl,
          status: "pending",
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        setError("Gagal mengirim feedback");
        setIsSubmitting(false);
        return;
      }

      // Success
      setShowSuccess(true);
      setTitle("");
      setDescription("");
      setQuestionId("");
      setUserComment("");
      setScreenshot(null);
      setScreenshotPreview("");

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Terjadi kesalahan saat mengirim feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DBE2EF] via-[#F9F7F7] to-[#DBE2EF]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#112D4E] mb-3 sm:mb-4">
            💬{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F72AF] to-[#112D4E]">
              Feedback & Laporan
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#3F72AF]">
            Bantu kami meningkatkan QuizQuest dengan feedback Anda
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl animate-scale-in">
            <p className="text-green-700 font-semibold text-center mb-2">
              ✅ Feedback berhasil dikirim!
            </p>
            <p className="text-sm text-green-600 text-center">
              Terima kasih atas kontribusi Anda. Feedback Anda bersifat privat
              dan hanya akan dilihat oleh admin untuk perbaikan aplikasi.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl">
            <p className="text-red-700 font-semibold text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-scale-in"
        >
          {/* Feedback Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#112D4E] mb-3">
              Kategori Feedback
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFeedbackType("bug")}
                className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                  feedbackType === "bug"
                    ? "bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-lg scale-105"
                    : "bg-[#F9F7F7] text-[#3F72AF] border-2 border-[#3F72AF] hover:bg-[#DBE2EF]"
                }`}
              >
                🐛 Bug
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType("question")}
                className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                  feedbackType === "question"
                    ? "bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-lg scale-105"
                    : "bg-[#F9F7F7] text-[#3F72AF] border-2 border-[#3F72AF] hover:bg-[#DBE2EF]"
                }`}
              >
                📝 Soal
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType("comment")}
                className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                  feedbackType === "comment"
                    ? "bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-lg scale-105"
                    : "bg-[#F9F7F7] text-[#3F72AF] border-2 border-[#3F72AF] hover:bg-[#DBE2EF]"
                }`}
              >
                💬 Komentar
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#112D4E] mb-2">
              Judul{" "}
              {feedbackType === "bug"
                ? "Bug/Error"
                : feedbackType === "question"
                ? "Laporan"
                : "Komentar"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                feedbackType === "bug"
                  ? "Contoh: Error saat submit jawaban"
                  : feedbackType === "question"
                  ? "Contoh: Jawaban soal nomor 5 salah"
                  : "Contoh: Tambahkan fitur dark mode"
              }
              className="w-full px-4 py-3 border-2 border-[#3F72AF]/40 rounded-xl focus:border-[#3F72AF] focus:outline-none focus:ring-4 focus:ring-[#3F72AF]/20 transition-all"
              required
            />
          </div>

          {/* Question ID (only for question type) */}
          {feedbackType === "question" && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#112D4E] mb-2">
                ID Soal (opsional)
              </label>
              <input
                type="text"
                value={questionId}
                onChange={(e) => setQuestionId(e.target.value)}
                placeholder="Masukkan ID soal jika tahu"
                className="w-full px-4 py-3 border-2 border-[#3F72AF]/40 rounded-xl focus:border-[#3F72AF] focus:outline-none focus:ring-4 focus:ring-[#3F72AF]/20 transition-all"
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 ID soal bisa dilihat di URL atau nomor soal saat bermain
              </p>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#112D4E] mb-2">
              Deskripsi Detail
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                feedbackType === "bug"
                  ? "Jelaskan error yang terjadi, kapan terjadi, dan langkah-langkah untuk reproduce..."
                  : feedbackType === "question"
                  ? "Jelaskan masalah pada soal (jawaban salah, gambar hilang, typo, dll)..."
                  : "Sampaikan komentar, saran, atau rekomendasi fitur yang ingin ditambahkan..."
              }
              rows={6}
              className="w-full px-4 py-3 border-2 border-[#3F72AF]/40 rounded-xl focus:border-[#3F72AF] focus:outline-none focus:ring-4 focus:ring-[#3F72AF]/20 transition-all resize-none"
              required
            />
          </div>

          {/* User Comment / Feature Request - Only for comment type */}
          {feedbackType === "comment" && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#112D4E] mb-2">
                Komentar Tambahan / Request Fitur (Opsional)
              </label>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Apakah ada fitur yang ingin ditambahkan? Update apa yang dibutuhkan? Saran perbaikan?"
                rows={4}
                className="w-full px-4 py-3 border-2 border-[#3F72AF]/40 rounded-xl focus:border-[#3F72AF] focus:outline-none focus:ring-4 focus:ring-[#3F72AF]/20 transition-all resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 Contoh: "Tolong tambahkan timer di soal", "Butuh mode dark
                theme", dll
              </p>
            </div>
          )}

          {/* Screenshot Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#112D4E] mb-2">
              Screenshot (Opsional)
            </label>
            {!screenshotPreview ? (
              <div className="border-2 border-dashed border-[#3F72AF]/40 rounded-xl p-6 text-center hover:border-[#3F72AF] transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label
                  htmlFor="screenshot-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#DBE2EF] rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">📸</span>
                  </div>
                  <p className="text-[#3F72AF] font-semibold mb-1">
                    Klik untuk upload screenshot
                  </p>
                  <p className="text-xs text-gray-500">
                    Maksimal 300KB • PNG, JPG, JPEG
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border-2 border-[#3F72AF]">
                <img
                  src={screenshotPreview}
                  alt="Preview"
                  className="w-full h-auto"
                />
                <button
                  type="button"
                  onClick={removeScreenshot}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all"
                >
                  ❌ Hapus
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-xl font-semibold hover:from-[#112D4E] hover:to-[#3F72AF] transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "⏳ Mengirim..." : "📤 Kirim Feedback"}
            </button>
            <Link href="/" className="flex-1">
              <button
                type="button"
                className="w-full px-6 py-4 bg-[#DBE2EF] text-[#112D4E] rounded-xl font-semibold hover:bg-[#DBE2EF]/80 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                ← Kembali
              </button>
            </Link>
          </div>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-[#3F72AF]/30">
            <h3 className="font-bold text-[#112D4E] mb-2">🐛 Laporan Bug</h3>
            <p className="text-sm text-gray-600">
              Laporkan error, loading error, crash, atau masalah teknis lainnya
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-[#3F72AF]/30">
            <h3 className="font-bold text-[#112D4E] mb-2">📝 Laporan Soal</h3>
            <p className="text-sm text-gray-600">
              Laporkan soal dengan jawaban salah, gambar hilang, atau typo
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-[#DBE2EF]/50 rounded-xl p-4 mt-6 border-2 border-[#3F72AF]/20">
          <p className="text-sm text-[#112D4E] text-center">
            🔒 <span className="font-semibold">Privasi Terjamin:</span> Feedback
            Anda bersifat privat dan hanya dapat dilihat oleh admin untuk
            meningkatkan kualitas aplikasi.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
      <Footer />
    </div>
  );
}
