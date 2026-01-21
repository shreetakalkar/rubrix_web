"use client";

import { useEffect, useState } from "react";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import QuizCard from "@/src/components/QuizCard";
import QuizModal from "@/src/components/QuizModal";
import quizData from "@/src/data/herbalQuizzes.json";              
import { useLanguage } from "@/src/app/context/LanguageContext";      
import herbalQuizTranslations from "@/src/app/translations/HerbalQuizzes.json"; 

const iconMap = {
  leaf: <FaLeaf size={42} />,
  seedling: <FaSeedling size={42} />
};

export default function HerbalQuizPage() {
  const { language, loadTranslations } = useLanguage();

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  // Load translations once
  useEffect(() => {
    loadTranslations(herbalQuizTranslations);
  }, [loadTranslations]);

  const translated = herbalQuizTranslations[language] || herbalQuizTranslations.en;

  useEffect(() => {
    const prepared = quizData.quizzes.map((q, i) => ({
      ...q,
      title: translated.quizzes[i]?.title || q.title,
      subtitle: translated.quizzes[i]?.subtitle || q.subtitle,
      buttonText: translated.quizzes[i]?.buttonText || "Start Quiz",
      icon: iconMap[q.icon],
      questions: [...q.questions].sort(() => 0.5 - Math.random()).slice(0, 5)
    }));
    setQuizzes(prepared);
  }, [translated]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`leaf leaf-${i}`} />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-20 text-center mt-[200px]">
        <h1 className="text-5xl md:text-6xl font-bold text-white chalk-text">
          {translated.heading}
        </h1>
        <p className="mt-3 text-lg text-gray-200 chalk-subtitle">
          {translated.subheading}
        </p>
      </div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-[400px] chalk-text">
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              subtitle={quiz.subtitle}
              icon={quiz.icon}
              buttonText={quiz.buttonText}
              onClick={() => setActiveQuiz(quiz)}
            />
          ))}
        </div>
      </div>

      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          onClose={() => setActiveQuiz(null)}
        />
      )}
    </main>
  );
}
