"use client";

import { useEffect, useState } from "react";

export default function QuizModal({ quiz, onClose }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setFinished(true);
      setTimeout(onClose, 2000);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onClose]);

  const question = quiz.questions[currentQ];

  function handleOptionClick(index) {
    if (selected !== null || finished) return;

    setSelected(index);

    if (index === question.answer) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQ < quiz.questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setFinished(true);
        setTimeout(onClose, 2000);
      }
    }, 1000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 text-green-950 relative">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{quiz.title}</h2>
          <span className="text-lg font-mono">⏱ {timeLeft}s</span>
        </div>

        {!finished && (
          <>
            <h3 className="mb-4 text-lg">{question.q}</h3>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                let bg = "bg-yellow-800/60 hover:bg-yellow-700";

                if (selected !== null) {
                  if (idx === question.answer) bg = "bg-green-600";
                  else if (idx === selected) bg = "bg-red-600";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full rounded-lg px-4 py-2 text-left transition ${bg}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {finished && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-2">Quiz Completed</h3>
            <p className="text-lg">
              Score: {score} / {quiz.questions.length}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="text-sm text-red-300 hover:text-red-400"
          >
            Exit
          </button>

          {!finished && (
            <span className="text-sm text-gray-300">
              Question {currentQ + 1} / {quiz.questions.length}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
