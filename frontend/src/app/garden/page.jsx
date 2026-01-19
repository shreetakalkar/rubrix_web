"use client";
import { useEffect, useState } from "react";

export default function GamesPage() {
  const [shelf, setShelf] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("plantShelf")) || [];
    setShelf(stored);
  }, []);

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
          Your Botanical Garden
        </h1>
      </div>

      {/* SHELF */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {shelf.map((plant, i) => (
            <div
              key={i}
              className="bg-transparent rounded-xl p-6 -mt-38 chalk-text text-center"
            >
              <img
                src={plant.image}
                className="h-45 mx-auto drop-shadow-lg"
                alt={plant.name}
              />
              <h3 className=" text-xl text-green-300 font-bold">
                {plant.name}
              </h3>
            </div>
          ))}

          {shelf.length === 0 && (
            <p className="text-white text-lg col-span-3 text-center">
              🌱 No plants built yet
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
