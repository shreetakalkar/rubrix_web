"use client";

import { useEffect, useState } from "react";

const plantData = [
  { plant: "Tulsi", use: "Boosts immunity" },
  { plant: "Neem", use: "Skin care & blood purification" },
  { plant: "Aloe Vera", use: "Wound healing & skin hydration" },
  { plant: "Mint", use: "Aids digestion" },
  { plant: "Ashwagandha", use: "Reduces stress & anxiety" },
  { plant: "Turmeric", use: "Anti-inflammatory properties" },
];

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function PlantMatchPage() {
  const [plants, setPlants] = useState([]);
  const [uses, setUses] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [matchedPlants, setMatchedPlants] = useState({});
  const [useStatus, setUseStatus] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setPlants(shuffleArray(plantData));
    setUses(shuffleArray(plantData));
  }, []);

  function handleUseClick(useItem) {
    if (!selectedPlant) return;

    const correct = selectedPlant.use === useItem.use;

    if (correct) {
      setMatchedPlants((prev) => ({
        ...prev,
        [selectedPlant.plant]: true,
      }));

      setUseStatus((prev) => ({
        ...prev,
        [useItem.use]: "correct",
      }));

      setScore((s) => s + 1);
      setSelectedPlant(null);

      if (Object.keys(matchedPlants).length + 1 === plantData.length) {
        setCompleted(true);
      }
    } else {
      // ❌ Wrong → blink red, then reset
      setUseStatus((prev) => ({
        ...prev,
        [useItem.use]: "wrong",
      }));

      setTimeout(() => {
        setUseStatus((prev) => {
          const copy = { ...prev };
          delete copy[useItem.use];
          return copy;
        });
      }, 500);
    }
  }

  return (
    <main className="relative min-h-screen bg-[url('/bg.jpeg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 p-10 text-white">
        <h1 className="chalk-text text-4xl md:text-5xl text-center mb-3">
          🌿 Match the Plant with Its Use
        </h1>

        <p className="chalk-subtitle text-center text-green-300 mb-6">
          Click a plant → then click its correct use
        </p>

        <div className="text-center mb-10 text-xl chalk-subtitle">
          Score: <span className="text-green-400 font-bold">{score}</span> /{" "}
          {plantData.length}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 🌱 Plants */}
          <div className="rounded-2xl bg-white/90 p-6 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-green-800 chalk-text">
              Plants
            </h2>

            <div className="space-y-3">
              {plants.map((item) => (
                <button
                  key={item.plant}
                  onClick={() => setSelectedPlant(item)}
                  disabled={matchedPlants[item.plant]}
                  className={`w-full rounded-xl px-4 py-3 text-left font-medium transition
                    ${
                      matchedPlants[item.plant]
                        ? "bg-green-200 text-green-900"
                        : selectedPlant?.plant === item.plant
                        ? "bg-green-100 ring-2 ring-green-400"
                        : "bg-gray-100 hover:bg-green-50 text-black"
                    }
                  `}
                >
                  🌿 {item.plant}
                </button>
              ))}
            </div>
          </div>

          {/* 🧪 Uses */}
          <div className="rounded-2xl bg-white/90 p-6 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-green-800 chalk-text">
              Uses
            </h2>

            <div className="space-y-3">
              {uses.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUseClick(item)}
                  className={`w-full rounded-xl px-4 py-3 text-left font-medium transition
                    ${
                      useStatus[item.use] === "correct"
                        ? "bg-green-200 text-green-900"
                        : useStatus[item.use] === "wrong"
                        ? "bg-red-200 text-red-900 animate-pulse"
                        : "bg-gray-100 hover:bg-green-50 text-gray-800"
                    }
                  `}
                >
                  🧪 {item.use}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🎉 Completion Message */}
        {completed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="rounded-2xl bg-white p-8 text-center text-green-900 shadow-2xl">
              <h2 className="chalk-text text-3xl mb-4">
                🎉 Well Done!
              </h2>
              <p className="chalk-subtitle text-lg">
                You matched all plants correctly 🌿
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
