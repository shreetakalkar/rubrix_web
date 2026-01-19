"use client";
import { useState } from "react";

/* =======================
   PLANT CONFIG
======================= */
const plant = {
  name: "Rose",
  base: "/plants/base.png",
  full: "/plants/rose/full.png",
  parts: {
    roots: "/plants/rose/roots.png",
    stem: "/plants/rose/stem.png",
    leaves: "/plants/rose/leaves.png",
    flower: "/plants/rose/flower.png",
  },
};

const options = {
  roots: [
    "/plants/rose/roots.png",
    "/plants/cactus/roots.png",
    "/plants/sunflower/roots.png",
  ],
  stem: [
    "/plants/rose/stem.png",
    "/plants/cactus/stem.png",
    "/plants/sunflower/stem.png",
  ],
  leaves: [
    "/plants/rose/leaves.png",
    "/plants/cactus/leaves.png",
    "/plants/sunflower/leaves.png",
  ],
  flower: [
    "/plants/rose/flower.png",
    "/plants/cactus/flower.png",
    "/plants/sunflower/flower.png",
  ],
};

/* =======================
   MAIN COMPONENT
======================= */
export default function PlantBuilderGame() {
  const [placed, setPlaced] = useState({
    roots: null,
    stem: null,
    leaves: null,
    flower: null,
  });

  const [completed, setCompleted] = useState(false);

  /* SAVE BUILT PLANT */
  const saveToShelf = () => {
    const shelf = JSON.parse(localStorage.getItem("plantShelf")) || [];

    if (!shelf.find((p) => p.name === plant.name)) {
      shelf.push({
        name: plant.name,
        image: plant.full,
      });
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
    setPlaced({
      roots: null,
      stem: null,
      leaves: null,
      flower: null,
    });
    setCompleted(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/build-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center min-h-screen p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-20 chalk-text">
          Build the Plant 🌱
        </h1>

        <p className="mt-2 text-green-300 chalk-text text-xl font-semibold">
          {plant.name}
        </p>

        {/* BOARD */}
        <div className="relative flex gap-16 mt-3">
          {/* LEFT */}
          <div className="flex flex-col gap-6 chalk-subtitle">
            {["roots", "stem"].map((part) => (
              <DropSlot
                key={part}
                part={part}
                placed={placed[part]}
                onDrop={onDrop}
              />
            ))}
          </div>

          {/* BASE */}
          <div className="relative w-[280px] h-[420px] flex items-center justify-center bottom-20">
            <img
              src={plant.base}
              className="absolute h-full object-contain opacity-90"
              alt="Base"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6 chalk-subtitle">
            {["leaves", "flower"].map((part) => (
              <DropSlot
                key={part}
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
                <h3 className="text-white text-center font-bold capitalize mb-4">
                  {part}
                </h3>

                <div className="flex justify-center gap-4 bg-black/40 rounded-xl p-4">
                  {imgs.map((img) => (
                    <img
                      key={img}
                      src={img}
                      draggable
                      onDragStart={(e) => onDragStart(e, img)}
                      className="h-16 w-16 cursor-grab hover:scale-110 transition"
                      alt={part}
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
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="bg-green-900 p-10 rounded-2xl text-center space-y-6">
            <h1 className="text-4xl font-bold text-green-300">
              🌱 Plant Built! & Added to Your Botanical Garden
            </h1>
            <img
              src={plant.full}
              className="h-64 mx-auto"
              alt="Completed"
            />
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold"
            >
              Build Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* =======================
   DROP SLOT
======================= */
function DropSlot({ part, placed, onDrop }) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, part)}
      className="w-40 h-32 border-2 border-dashed border-green-400/70 rounded-xl
                 flex flex-col items-center justify-center text-white bg-black/40"
    >
      <h4 className="font-bold capitalize mb-2">{part}</h4>
      {placed && <img src={placed} className="h-16" alt={part} />}
    </div>
  );
}
