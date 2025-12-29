'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import QuestionOption from '@/components/QuestionOption';
import LifeIndicator from '@/components/LifeIndicator';
import ButtonPrimary from '@/components/ButtonPrimary';

// Dummy questions data
const questions = [
  {
    id: 1,
    question: 'Berapakah hasil dari 15 × 8?',
    options: [
      { label: 'A', text: '120' },
      { label: 'B', text: '105' },
      { label: 'C', text: '130' },
      { label: 'D', text: '115' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 2,
    question: 'Siapakah presiden pertama Indonesia?',
    options: [
      { label: 'A', text: 'Soekarno' },
      { label: 'B', text: 'Soeharto' },
      { label: 'C', text: 'B.J. Habibie' },
      { label: 'D', text: 'Megawati' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 3,
    question: 'Apa ibu kota negara Jepang?',
    options: [
      { label: 'A', text: 'Osaka' },
      { label: 'B', text: 'Kyoto' },
      { label: 'C', text: 'Tokyo' },
      { label: 'D', text: 'Hiroshima' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 4,
    question: 'Berapakah akar kuadrat dari 144?',
    options: [
      { label: 'A', text: '10' },
      { label: 'B', text: '11' },
      { label: 'C', text: '12' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 5,
    question: 'Planet mana yang paling dekat dengan matahari?',
    options: [
      { label: 'A', text: 'Venus' },
      { label: 'B', text: 'Merkurius' },
      { label: 'C', text: 'Mars' },
      { label: 'D', text: 'Bumi' },
    ],
    correctAnswer: 'B',
  },
];

export default function GamePage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && lives > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 || lives === 0) {
      // Game over
      router.push(`/result?score=${score}&correct=${correctAnswers}&time=${300 - timer}`);
    }
  }, [timer, lives, score, correctAnswers, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (label: string) => {
    if (isAnswered) return;
    setSelectedAnswer(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    setIsAnswered(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Game finished
        router.push(`/result?score=${score + (selectedAnswer === currentQuestion.correctAnswer ? 10 : 0)}&correct=${correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}&time=${300 - timer}`);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Energy Lines */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              width: '100%',
              animation: `shimmer ${2 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Top Bar */}
      <div className="relative z-10 mx-auto mb-6 max-w-5xl animate-slide-in">
        <div className="rounded-2xl bg-gray-900/70 p-5 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 px-5 py-3 transition-all hover:scale-105 border border-cyan-400/30">
              <span className="text-3xl animate-pulse">⏱️</span>
              <div>
                <div className="text-xs text-cyan-300">Waktu Tersisa</div>
                <span className={`text-2xl font-bold ${timer < 60 ? 'text-red-400 animate-pulse' : 'text-cyan-300'}`}>
                  {formatTime(timer)}
                </span>
              </div>
            </div>
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-5 py-3 transition-all hover:scale-105 border border-pink-400/30">
              <span className="text-3xl transition-transform group-hover:rotate-12">⭐</span>
              <div>
                <div className="text-xs text-pink-300">Skor</div>
                <span className="text-2xl font-bold text-pink-300">{score}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600/30 to-orange-600/30 px-5 py-3 border border-orange-400/30">
              <LifeIndicator lives={lives} />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="relative z-10 mx-auto max-w-5xl animate-scale-in">
        <div className="rounded-3xl bg-gray-900/70 p-1 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <div className="rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8">
            {/* Question Number & Progress */}
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                🎯 Soal {currentQuestionIndex + 1} dari {questions.length}
              </span>
              <div className="flex-1 ml-6 h-3 overflow-hidden rounded-full bg-gray-700 border border-cyan-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 shadow-lg shadow-cyan-500/50"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 backdrop-blur-sm border border-purple-400/30">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{currentQuestion.question}</h2>
            </div>

            {/* Options */}
            <div className="mb-6 space-y-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = isAnswered && option.label === currentQuestion.correctAnswer;
                const isWrong = isAnswered && option.label === selectedAnswer && option.label !== currentQuestion.correctAnswer;
                const isSelected = !isAnswered && option.label === selectedAnswer;

                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    className={`group w-full transform rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.02] border-2 ${
                      isCorrect
                        ? 'border-green-500 bg-gradient-to-r from-green-600/30 to-emerald-600/30 shadow-lg shadow-green-500/50'
                        : isWrong
                        ? 'border-red-500 bg-gradient-to-r from-red-600/30 to-pink-600/30 shadow-lg shadow-red-500/50'
                        : isSelected
                        ? 'border-cyan-500 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 shadow-lg shadow-cyan-500/50'
                        : 'border-gray-600 bg-gray-800/50 hover:border-cyan-500/50 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold transition-all ${
                        isCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-700 text-gray-300 group-hover:bg-cyan-600 group-hover:text-white'
                      }`}>
                        {option.label}
                      </span>
                      <span className={`flex-1 text-lg transition-colors ${
                        isCorrect || isWrong || isSelected ? 'text-white font-semibold' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {option.text}
                      </span>
                      {isCorrect && <span className="text-3xl animate-bounce">✅</span>}
                      {isWrong && <span className="text-3xl animate-bounce">❌</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!isAnswered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`group relative w-full overflow-hidden rounded-2xl px-8 py-5 text-xl font-bold transition-all duration-300 ${
                  selectedAnswer
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/50 hover:scale-105 active:scale-95'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {selectedAnswer ? (
                    <>
                      <span className="transition-transform group-hover:scale-110">🚀</span>
                      <span>Jawab Sekarang!</span>
                    </>
                  ) : (
                    <>
                      <span>⚠️</span>
                      <span>Pilih Jawaban Dulu</span>
                    </>
                  )}
                </span>
                {selectedAnswer && <div className="absolute inset-0 shimmer"></div>}
              </button>
            )}

            {/* Feedback */}
            {isAnswered && (
              <div className={`animate-scale-in rounded-2xl p-6 text-center backdrop-blur-sm border-2 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'border-green-500 bg-gradient-to-r from-green-600/30 to-emerald-600/30'
                  : 'border-red-500 bg-gradient-to-r from-red-600/30 to-pink-600/30'
              }`}>
                <p className="mb-2 text-4xl animate-bounce">
                  {selectedAnswer === currentQuestion.correctAnswer ? '🎉' : '💔'}
                </p>
                <p className="mb-2 text-2xl font-bold text-white">
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Luar Biasa!' : 'Ups, Salah!'}
                </p>
                {selectedAnswer !== currentQuestion.correctAnswer && (
                  <p className="text-lg text-gray-300">
                    Jawaban yang benar: <span className="font-bold text-green-400">{currentQuestion.correctAnswer}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
