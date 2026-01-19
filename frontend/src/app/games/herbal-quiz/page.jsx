"use client";

import { useState } from "react";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import QuizCard from "@/src/components/QuizCard";
import QuizModal from "@/src/components/QuizModal";

const quizzes = [
  {
    id: 1,
    title: "Medicinal Plants Basics",
    subtitle: "Learn core herbal knowledge",
    icon: <FaLeaf size={42} />,
    questions: [
      {
        q: "Which plant is known as the 'Queen of Herbs'?",
        options: ["Tulsi", "Neem", "Aloe Vera", "Mint"],
        answer: 0,
      },
      {
        q: "Neem is mainly used for?",
        options: ["Digestion", "Skin care", "Sleep", "Memory"],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Herbal Uses & Benefits",
    subtitle: "Test practical plant uses",
    icon: <FaSeedling size={42} />,
    questions: [
      {
        q: "Which plant helps in wound healing?",
        options: ["Aloe Vera", "Rose", "Lavender", "Jasmine"],
        answer: 0,
      },
      {
        q: "Tulsi boosts?",
        options: ["Immunity", "Vision", "Hearing", "Taste"],
        answer: 0,
      },
    ],
  },
];

export default function HerbalQuizPage() {
  const [activeQuiz, setActiveQuiz] = useState(null);

  return (
    <main className="relative h-screen w-full overflow-hidden">

      {/* Floating leaves */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`leaf leaf-${i}`} />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Heading */}
      <div className="relative z-20 text-center mt-[200px]">
        <h1 className="text-5xl md:text-6xl font-bold text-white chalk-text">
          Herbal Quiz
        </h1>
        <p className="mt-3 text-lg text-gray-200 chalk-subtitle">
          Choose a quiz to begin
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-[400px] chalk-text">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              subtitle={quiz.subtitle}
              icon={quiz.icon}
              buttonText="Start Quiz"
              onClick={() => setActiveQuiz(quiz)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          onClose={() => setActiveQuiz(null)}
        />
      )}

    </main>
  );
}
