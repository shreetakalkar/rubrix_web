"use client";

import Image from "next/image";
import { useState } from "react";

// Sample plant data
const plants = [
  { name: "Tulsi", img: "/plants/tulsi.jpg" },
  { name: "Ashwagandha", img: "/plants/ashwagandha.jpg" },
  { name: "Amla", img: "/plants/amla.jpg" },
  { name: "Neem", img: "/plants/neem.jpg" },
  { name: "Shatavari", img: "/plants/shatavari.jpg" },
  { name: "Brahmi", img: "/plants/brahmi.jpg" },
  { name: "Aloe Vera", img: "/plants/aloe_vera.jpg" },
  { name: "Turmeric", img: "/plants/turmeric.jpg" },
];

export default function PlantLibrary() {
  const [search, setSearch] = useState("");

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen p-8">
      <h1 className="chalk-text text-5xl text-center mb-6 font-bold">Plant Library</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search plants, diseases, or medicinal uses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-l-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button className="px-4 py-2 bg-green-200 text-white rounded-r-4xl hover:bg-green-500">
          🔍
        </button>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredPlants.map((plant) => (
          <div
            key={plant.name}
            className="bg-white/20 rounded-3xl backdrop-blur-md chalk-subtitle shadow-md overflow-hidden relative"
          >
            <Image
              src={plant.img}
              alt={plant.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center font-medium bg-amber-800">{plant.name}</div>
            {/* Example bookmark/favorite icon */}
            <div className="absolute top-2 right-2 text-green-400 text-xl cursor-pointer">
              ⭐
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
