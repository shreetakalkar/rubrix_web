"use client";
import { useState } from "react";

export default function GamesPage() {
  const [placed, setPlaced] = useState({
    roots: false,
    plant: false,
    leaves: false,
    flower: false,
  });

  const [showComplete, setShowComplete] = useState(false);
  const [showGarden, setShowGarden] = useState(false);

  const parts = [
    { id: "roots", img: "/roots.png", zone: "bottom" },
    { id: "plant", img: "/potted_plant.png", zone: "middle" },
    { id: "leaves", img: "/leaves.png", zone: "top" },
    { id: "flower", img: "/flowering_plant.png", zone: "flower" },
  ];

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const allowDrop = (e) => e.preventDefault();

  const onDrop = (e, zone) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const part = parts.find((p) => p.id === id);

    if (part && part.zone === zone) {
      setPlaced((prev) => {
        const newPlaced = { ...prev, [id]: true };
        
        // Check if all parts are placed
        if (Object.values(newPlaced).every((v) => v === true)) {
          setTimeout(() => setShowComplete(true), 500);
        }
        
        return newPlaced;
      });
    }
  };

  const placeInGarden = () => {
    setShowGarden(true);
  };

  const resetGame = () => {
    setPlaced({
      roots: false,
      plant: false,
      leaves: false,
      flower: false,
    });
    setShowComplete(false);
    setShowGarden(false);
  };

  const allPlaced = Object.values(placed).every((v) => v === true);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/build-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {showGarden && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-green-400 animate-pulse">
              🌳 Tree Complete! 🌳
            </h1>
            <div className="relative">
              <img
                src="/plant.png"
                className="h-96 object-contain mx-auto animate-bounce"
                alt="Complete Plant"
              />
            </div>
            <p className="text-2xl text-white">
              Plant placed in Botanical Garden! 🌺
            </p>
            <button
              onClick={resetGame}
              className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-lg"
            >
              Build Another Plant
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-between p-6">

        <div className="relative w-[600px] h-[600px] mt-4">
          <img
            src="/board.png"
            className="absolute inset-0 w-full h-full object-contain"
            alt="Board"
          />

          <div className="absolute inset-0 flex flex-col justify-center gap-4 px-20 py-16">

            <div
              onDragOver={allowDrop}
              onDrop={(e) => onDrop(e, "flower")}
              className="h-24 flex items-center justify-center border-2 border-dashed border-green-400/50 rounded-lg"
            >
              {placed.flower && (
                <img src="/flowering_plant.png" className="h-20 object-contain" />
              )}
            </div>

            <div
              onDragOver={allowDrop}
              onDrop={(e) => onDrop(e, "top")}
              className="h-24 flex items-center justify-center border-2 border-dashed border-green-400/50 rounded-lg"
            >
              {placed.leaves && (
                <img src="/leaves.png" className="h-20 object-contain" />
              )}
            </div>

            <div
              onDragOver={allowDrop}
              onDrop={(e) => onDrop(e, "middle")}
              className="h-32 flex items-center justify-center border-2 border-dashed border-green-400/50 rounded-lg"
            >
              {placed.plant && (
                <img src="/potted_plant.png" className="h-28 object-contain" />
              )}
            </div>

            <div
              onDragOver={allowDrop}
              onDrop={(e) => onDrop(e, "bottom")}
              className="h-24 flex items-center justify-center border-2 border-dashed border-green-400/50 rounded-lg"
            >
              {placed.roots && (
                <img src="/roots.png" className="h-20 object-contain" />
              )}
            </div>

          </div>

          {allPlaced && (
            <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
              <img 
                src="/plant.png" 
                className="h-[500px] object-contain animate-grow" 
                alt="Complete Plant"
              />
            </div>
          )}
        </div>

        {allPlaced && !showGarden && (
          <div className="text-center space-y-4 mb-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg animate-bounce">
              Tree Complete!
            </h2>
            <button
              onClick={placeInGarden}
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-lg shadow-lg"
            >
              Place in Botanical Garden
            </button>
          </div>
        )}

        <div className="relative w-[700px] h-[320px] mb-4">
          <img
            src="/whiteboard.png"
            className="absolute inset-0 w-full h-full object-contain"
            alt="Whiteboard"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-8 px-20">
              {parts.map(
                (p) =>
                  !placed[p.id] && (
                    <div key={p.id} className="flex items-center justify-center">
                      <img
                        src={p.img}
                        draggable
                        onDragStart={(e) => onDragStart(e, p.id)}
                        className="w-16 h-16 object-contain cursor-grab hover:scale-110 transition"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes grow {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-grow {
          animation: grow 1s ease-out;
        }
      `}</style>
    </main>
  );
}