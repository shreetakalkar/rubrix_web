"use client";
import { useState } from "react";

/* =======================
   PLANT CONFIG
======================= */
const plant = {
  name: "Rose",
  base: "/plants/base.png", // ✅ common base for all plants
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
          setTimeout(() => setCompleted(true), 400);
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
        style={{ backgroundImage: `url('/build-bg.png')` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* GAME AREA */}
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-white chalk-text mt-25 drop-shadow-lg">
          Build the Plant 🌱
        </h1>

        {/* PLANT NAME */}
        <p className="mt-2 text-lg text-green-200 font-semibold tracking-wide chalk-text">
          {plant.name}
        </p>

        {/* CENTER BOARD */}
        <div className="relative flex gap-16  -mb-30">

          {/* LEFT SLOTS */}
          <div className="flex flex-col gap-6">
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
          <div className="relative w-[300px] h-[450px] bottom-20 flex items-center justify-center">
            <img
              src={plant.base}
              className="absolute h-full object-contain opacity-90"
              alt="Plant base"
            />

            
          </div>

          {/* RIGHT SLOTS */}
          <div className="flex flex-col gap-6 ">
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

        {/* OPTIONS / TRAY AREA */}
        <div className="w-full max-w-6xl mb-20 bottom-50 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <div className="grid grid-cols-4 gap-8">
            {Object.entries(options).map(([part, imgs]) => (
              <div key={part}>
                <h3 className="text-white font-bold text-center mb-4 capitalize">
                  {part}
                </h3>

                {/* TRAY */}
                <div className="flex justify-center gap-4 bg-black/40 rounded-xl p-4 border border-white/10 shadow-inner">
                  {imgs.map((img) => (
                    <div
                      key={img}
                      className="bg-green-900/30 rounded-lg p-2 hover:bg-green-800/40 transition"
                    >
                      <img
                        src={img}
                        draggable
                        onDragStart={(e) => onDragStart(e, img)}
                        className="min-w-13 h-16 cursor-grab hover:scale-110 transition"
                        alt={part}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPLETION POPUP */}
      {completed && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="bg-green-900 p-10 rounded-2xl text-center space-y-6 animate-fade">
            <h1 className="text-4xl font-bold text-green-300">
              🌱 Plant Built!
            </h1>
            <img
              src={plant.full}
              className="h-64 mx-auto animate-grow"
              alt="Completed Plant"
            />
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg"
            >
              Build Again
            </button>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fade {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes grow {
          from { transform: scale(0.6); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        .animate-fade {
          animation: fade 0.5s ease-out;
        }
        .animate-grow {
          animation: grow 0.6s ease-out;
        }
      `}</style>
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
