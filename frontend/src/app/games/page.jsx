"use client";

import React from "react";
import GameCard from "@/src/components/GameCard";
import { useLanguage } from "../context/LanguageContext"; 
import gamesTranslations from "../translations/Games.json"; 

export default function GamesPage() {
  const { language, loadTranslations } = useLanguage();

  React.useEffect(() => {
    loadTranslations(gamesTranslations);
  }, [loadTranslations]);

  const translated = gamesTranslations[language] || gamesTranslations.en;

  return (
    <main className="relative h-screen w-full overflow-hidden">

      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`leaf leaf-${i}`} />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/20" />

      
      <div className="relative z-20 text-center pt-50">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg chalk-text">
          {translated.heading} 
        </h1>
        <p className="mt-3 text-lg text-gray-200 drop-shadow-sm chalk-subtitle">
          {translated.subheading} 
        </p>
      </div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-100">

        
          <GameCard
            title={translated.games[0].title}
            subtitle={translated.games[0].subtitle}
            buttonText={translated.games[0].buttonText}
            href="/games/herbal-quiz"
            icon="/herbal-quiz.png"
          />

          <GameCard
            title={translated.games[1].title}
            subtitle={translated.games[1].subtitle}
            buttonText={translated.games[1].buttonText}
            href="/games/plant-match"
            icon="/plant-match.png"
          />

          <GameCard
            title={translated.games[2].title}
            subtitle={translated.games[2].subtitle}
            buttonText={translated.games[2].buttonText}
            href="/games/build-tree"
            icon="/herbal-quiz.png"
          />

          <GameCard
            title={translated.games[3].title}
            subtitle={translated.games[3].subtitle}
            buttonText={translated.games[3].buttonText}
            href="http://localhost:9000"
            icon="/herbal-quiz.png"
          />

        </div>
      </div>

    </main>
  );
}
