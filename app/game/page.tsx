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
      router.push(`/hasil?score=${score}&correct=${correctAnswers}&time=${300 - timer}`);
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
        router.push(`/hasil?score=${score + (selectedAnswer === currentQuestion.correctAnswer ? 10 : 0)}&correct=${correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}&time=${300 - timer}`);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF] px-3 py-4 sm:px-6 md:px-10 lg:px-16">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#3F72AF] opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-[#112D4E] opacity-30 blur-3xl [animation-delay:1s]"></div>
      </div> */}

      {/* Energy Lines */}
      {/* <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => {
          const randomTop = Math.random() * 100;
          const randomDuration = 2 + Math.random() * 2;
          const randomDelay = Math.random() * 2;
          return (
            <div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#3F72AF] to-transparent opacity-30"
              style={{
                top: `${randomTop}%`,
                animation: `shimmer ${randomDuration}s linear infinite`,
                animationDelay: `${randomDelay}s`,
              }}
            ></div>
          );
        })}
      </div> */}

      {/* Top Bar */}
      <div className="relative z-10 mx-auto mb-6 max-w-5xl ">
        <div className="rounded-2xl bg-[#F9F7F7]/90 p-5 backdrop-blur-xl border border-[#3F72AF]/30 shadow-2xl shadow-[#3F72AF]/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#DBE2EF]/40 to-[#3F72AF]/20 px-5 py-3 transition-all hover:scale-105 border border-[#3F72AF]/50">
              <span className="text-3xl animate-pulse">⏱️</span>
              <div>
                <div className="text-xs text-[#3F72AF]">Waktu Tersisa</div>
                <span className={`text-2xl font-bold ${timer < 60 ? 'text-red-500 animate-pulse' : 'text-[#112D4E]'}`}>
                  {formatTime(timer)}
                </span>
              </div>
            </div>
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 px-5 py-3 transition-all hover:scale-105 border border-[#3F72AF]/50">
              <span className="text-3xl transition-transform group-hover:rotate-12">⭐</span>
              <div>
                <div className="text-xs text-[#3F72AF]">Skor</div>
                <span className="text-2xl font-bold text-[#112D4E]">{score}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 px-5 py-3 border border-[#3F72AF]/50">
              <LifeIndicator lives={lives} />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      
        <div className="rounded-3xl bg-[#F9F7F7]/20 p-1 backdrop-blur-xl border border-[#3F72AF]/30 shadow-2xl shadow-[#3F72AF]/20">
          <div className="rounded-3xl bg-[#F9F7F7]/95 
                          p-4 sm:p-6 md:p-8 max-h-[99vh] 
                          ">
                              {/* Question Number & Progress */}
                              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                <span className="rounded-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] px-5 py-2 text-sm font-bold text-white shadow-lg">
                                  🎯 Soal {currentQuestionIndex + 1} dari {questions.length}
                                </span>
                                <div className="flex-1 ml-6 h-3 overflow-hidden rounded-full bg-[#DBE2EF] border border-[#3F72AF]/30">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] transition-all duration-500 shadow-lg shadow-[#3F72AF]/50"
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                  />
                                </div>
                              </div>

            {/* Question Text */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#DBE2EF]/40 to-[#3F72AF]/10 p-6 backdrop-blur-sm border border-[#3F72AF]/30">
              <h2 className="text-2xl font-bold text-[#112D4E] md:text-3xl">{currentQuestion.question}</h2>
            </div>

            {/* Options */}
            <div className="mb-6 space-y-4">
              {currentQuestion.options.map((option) => {
              const status =
                    isAnswered
                      ? option.label === currentQuestion.correctAnswer
                        ? 'correct'
                        : option.label === selectedAnswer
                        ? 'wrong'
                        : 'disabled'
                      : option.label === selectedAnswer
                      ? 'selected'
                      : 'idle';
              const isCorrect = status === 'correct';
              const isWrong = status === 'wrong';
              const isSelected = status === 'selected'; 
                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                   className={`group w-full rounded-2xl p-4 sm:p-5
                              transition-all duration-300 border-2
                              ${status === 'correct' && 'border-green-500 bg-green-200'}
                              ${status === 'wrong' && 'border-red-500 bg-red-200'}
                              ${status === 'selected' && 'border-[#3F72AF] bg-[#DBE2EF]'}
                              ${status === 'idle' && 'border-[#DBE2EF] hover:border-[#3F72AF]/50'}
                              `}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold transition-all ${
                        isCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-[#3F72AF] text-white'
                          : 'bg-[#DBE2EF] text-[#112D4E] group-hover:bg-[#3F72AF] group-hover:text-white'
                      }`}>
                        {option.label}
                      </span>
                      <span className={`flex-1 text-lg transition-colors ${
                        isCorrect || isWrong || isSelected ? 'text-[#112D4E] font-semibold' : 'text-[#3F72AF] group-hover:text-[#112D4E]'
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
                    ? 'bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-2xl shadow-[#3F72AF]/50 hover:scale-105 active:scale-95'
                    : 'bg-[#DBE2EF] text-[#3F72AF]/50 cursor-not-allowed'
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
                  ? 'border-green-500 bg-gradient-to-r from-green-200 to-emerald-200'
                  : 'border-red-500 bg-gradient-to-r from-red-200 to-pink-200'
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
    
  );
}
