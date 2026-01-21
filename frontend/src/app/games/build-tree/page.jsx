"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/src/app/context/LanguageContext";
import langData from "@/src/app/translations/PlantBuilder";

/* =======================
   PLANT CONFIG
======================= */
const plant = {
  name: "Ashvagandha",
  base: "/plants/base.png",
  full: "/plants/ashvagandha/full.png",
  parts: {
    roots: "/plants/ashvagandha/roots.png",
    stem: "/plants/ashvagandha/stem.png",
    leaves: "/plants/ashvagandha/leaves.png",
    flower: "/plants/ashvagandha/flower.png",
  },
};

const options = {
  roots: [
    "/plants/rose/roots.png",
    "/plants/cactus/roots.png",
    "/plants/ashvagandha/roots.png",
  ],
  stem: [
    "/plants/rose/stem.png",
    "/plants/cactus/stem.png",
    "/plants/ashvagandha/stem.png",
  ],
  leaves: [
    "/plants/rose/leaves.png",
    "/plants/cactus/leaves.png",
    "/plants/ashvagandha/leaves.png",
  ],
  flower: [
    "/plants/rose/flower.png",
    "/plants/cactus/flower.png",
    "/plants/ashvagandha/flower.png",
  ],
};

export default function PlantBuilderGame() {
  const { language, loadTranslations, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    loadTranslations(langData);
  }, [loadTranslations]);

  const pageLang = langData[language] || langData.en;

  const [placed, setPlaced] = useState({
    roots: null,
    stem: null,
    leaves: null,
    flower: null,
  });

  const [completed, setCompleted] = useState(false);

  const saveToShelf = () => {
    const shelf = JSON.parse(localStorage.getItem("plantShelf")) || [];
    if (!shelf.find((p) => p.name === plant.name)) {
      shelf.push({ name: plant.name, image: plant.full });
    }
    localStorage.setItem("plantShelf", JSON.stringify(shelf));
  };

  const onDragStart = (e, img) => {
    e.dataTransfer.setData("img", img);
  };

  const onDrop = (e, part) => {
    e.preventDefault();
    const img = e.dataTransfer.getData("img");

    if (img === plant.parts[part]) {
      setPlaced((prev) => {
        const updated = { ...prev, [part]: img };
        if (Object.values(updated).every(Boolean)) {
          setTimeout(() => {
            setCompleted(true);
            saveToShelf();
          }, 400);
        }
        return updated;
      });
    }
  };

  const resetGame = () => {
    setPlaced({ roots: null, stem: null, leaves: null, flower: null });
    setCompleted(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/build-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center min-h-screen p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-20 chalk-text">
          {t("title") || pageLang.title}
        </h1>

        <p className="mt-2 text-green-300 chalk-text text-xl font-semibold">
          {pageLang.plants[plant.name]}
        </p>

        {/* BOARD */}
        <div className="relative flex gap-16 mt-3">
          <div className="flex flex-col gap-6 chalk-subtitle">
            {["roots", "stem"].map((part) => (
              <DropSlot
                key={part}
                label={pageLang.parts[part]}
                part={part}
                placed={placed[part]}
                onDrop={onDrop}
              />
            ))}
          </div>

          <div className="relative w-[280px] h-[420px] flex items-center justify-center bottom-20">
            <img
              src={plant.base}
              className="absolute h-full object-contain opacity-90"
            />
          </div>

          <div className="flex flex-col gap-6 chalk-subtitle">
            {["leaves", "flower"].map((part) => (
              <DropSlot
                key={part}
                label={pageLang.parts[part]}
                part={part}
                placed={placed[part]}
                onDrop={onDrop}
              />
            ))}
          </div>
        </div>

        {/* OPTIONS */}
        <div className="w-full max-w-6xl mb-20 bg-black/40 -mt-20 rounded-2xl p-6 chalk-text">
          <div className="grid grid-cols-4 gap-8">
            {Object.entries(options).map(([part, imgs]) => (
              <div key={part}>
                <h3 className="text-white text-center font-bold mb-4">
                  {pageLang.parts[part]}
                </h3>

                <div className="flex justify-center gap-4 bg-black/40 rounded-xl p-4">
                  {imgs.map((img) => (
                    <img
                      key={img}
                      src={img}
                      draggable
                      onDragStart={(e) => onDragStart(e, img)}
                      className="h-16 w-16 cursor-grab hover:scale-110 transition"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPLETION */}
      {completed && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-yellow-800 p-10 rounded-2xl text-center space-y-6 chalk-text">
            <h1 className="text-4xl font-bold text-green-300">
              🌱 {pageLang.plants[plant.name]} Built!
            </h1>

            <img src={plant.full} className="h-64 mx-auto" />

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-green-600 rounded-lg text-white font-bold"
              >
                {t("buildAgain") || pageLang.buildAgain}
              </button>

              <button
                onClick={() => router.push("/garden")}
                className="px-8 py-3 bg-green-600 rounded-lg text-white font-bold"
              >
                {t("viewGarden") || pageLang.viewGarden}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =======================
   DROP SLOT
======================= */
function DropSlot({ part, placed, onDrop, label }) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, part)}
      className="w-40 h-32 border-2 border-dashed border-green-400/70 rounded-xl
                 flex flex-col items-center justify-center text-white bg-black/40"
    >
      <h4 className="font-bold mb-2">{label}</h4>
      {placed && <img src={placed} className="h-16" />}
    </div>
  );
}
