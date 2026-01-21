"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/src/app/context/LanguageContext";
import langData from "@/src/app/translations/Garden";

export default function GamesPage() {
  const [shelf, setShelf] = useState([]);
  const { language, loadTranslations, t } = useLanguage();

  useEffect(() => {
    loadTranslations(langData);
  }, [loadTranslations]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("plantShelf")) || [];
    setShelf(stored);
  }, []);

  const pageLang = langData[language] || langData.en;

  const removePlant = (index) => {
    const updated = shelf.filter((_, i) => i !== index);
    setShelf(updated);
    localStorage.setItem("plantShelf", JSON.stringify(updated));
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Floating Leaves */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`leaf leaf-${i}`} />
        ))}
      </div>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/stand.png')" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* HEADING */}
      <div className="relative z-10 pt-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold chalk-text text-white drop-shadow-lg">
          {t("title") || pageLang.title}
        </h1>
      </div>

      {/* SHELF */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {shelf.map((plant, i) => (
            <div
              key={i}
              className="bg-transparent rounded-xl p-6 -mt-38 chalk-text text-center relative"
            >
              <img
                src={plant.image}
                className="h-45 mx-auto drop-shadow-lg"
                alt={plant.name}
              />

              <h3 className="text-xl text-green-300 font-bold">
                {plant.name}
              </h3>

              <button
                onClick={() => removePlant(i)}
                className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}

          {shelf.length === 0 && (
            <p className="text-white text-lg col-span-3 text-center">
              {t("empty") || pageLang.empty}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
