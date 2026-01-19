"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import PlantModal from "@/components/PlantModal";

export default function PlantLibrary() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const snapshot = await getDocs(collection(db, "plants"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.plant_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-10">Loading plants...</div>;
  }

  return (
    <main className="h-screen flex flex-col p-8 overflow-hidden">
      
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="chalk-text text-5xl text-center mb-6 font-bold">
          Plant Library
        </h1>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search plants, diseases, or medicinal uses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-l-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="px-4 py-2 bg-green-200 text-white rounded-r-4xl">
            🔍
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-white/20 backdrop-blur-sm rounded-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-20">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="cursor-pointer bg-white/20 rounded-3xl backdrop-blur-md border-amber-900 border-2 shadow-md overflow-hidden relative hover:scale-105 transition"
            >
              <Image
                src={plant.photos?.[0] || "/placeholder.png"}
                alt={plant.plant_name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
                unoptimized
              />

              <div className="p-4 text-center font-medium bg-amber-900 text-white">
                {plant.plant_name}
              </div>

              <div className="absolute top-2 right-2 text-green-400 text-xl">
                ⭐
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPlant && (
        <PlantModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}

      {/* Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
