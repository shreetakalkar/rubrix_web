'use client';

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./context/LanguageContext";
import { useEffect, useState } from "react";
import homepageTranslations from "./translations/Homepage.json";
import LanguageSwitcher from "../components/LanguageSwitcher";

function Card({ title, subtitle, icon, link }) {
  return (
    <Link
      href={link}
      className="w-64 p-5 rounded-2xl bg-white/30 backdrop-blur-sm shadow-xl border border-white/70 cursor-pointer hover:scale-105 transition-transform"
    >
      <Image
        src={icon}
        alt={title}
        width={96}
        height={64}
        className="mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-center text-gray-800">
        {title}
      </h3>
      <p className="text-sm text-center text-gray-600 mt-1">
        {subtitle}
      </p>
    </Link>
  );
}

export default function Home() {
  const { t, loadTranslations } = useLanguage();
  const [leafPositions, setLeafPositions] = useState([]);

  // ✅ Correct dependency usage (NO ERROR now)
  useEffect(() => {
    loadTranslations(homepageTranslations);
    setLeafPositions([...Array(6)].map(() => Math.random() * 100));
  }, [loadTranslations]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">

      {/* Language Switcher ONLY on Home */}
      <LanguageSwitcher />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating leaves */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {leafPositions.map((pos, i) => (
          <span
            key={i}
            className={`leaf leaf-${i}`}
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      {/* Hero section */}
      <div className="text-center mt-40 md:mt-60 relative z-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg chalk-text">
          {t('virtual_botanical_garden') || 'Virtual Botanical Garden'}
        </h1>
        <p className="mt-3 text-lg text-gray-200 drop-shadow-sm chalk-subtitle">
          {t('explore_medicinal_plants') || 'Explore Medicinal Plants Digitally'}
        </p>
      </div>

      {/* Cards */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-6 justify-center mb-40 chalk-text">
          <Card
            title={t('history_of_ayurveda') || 'History of Ayurveda'}
            subtitle={t('timeline_of_ayurveda') || 'Timeline of Ayurveda'}
            icon="/timeline.png"
            link="/timeline"
          />
          <Card
            title={t('explore_plant_library') || 'Explore Plant Library'}
            subtitle={t('browse_herbal_knowledge') || 'Browse Herbal Knowledge'}
            icon="/library.png"
            link="/plant-library"
          />
          <Card
            title={t('games_and_learning') || 'Games & Learning'}
            subtitle={t('fun_quizzes_challenges') || 'Fun Quizzes & Challenges'}
            icon="/games.png"
            link="/games"
          />
          <Card
            title={t('botanical_garden') || 'Botanical Garden'}
            subtitle={t('virtual_greenhouse_tour') || 'Virtual Greenhouse Tour'}
            icon="/garden.png"
            link="/garden"
          />
        </div>
      </div>

    </main>
  );
}
