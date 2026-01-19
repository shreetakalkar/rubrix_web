"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import PlantModal from "@/src/components/PlantModal";
import BookmarkButton from "@/src/components/plantStudy/BookmarkButton";

export default function PlantLibrary() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const loadBookmarks = () => {
    const stored = JSON.parse(
      localStorage.getItem("bookmarked_plants") || "[]"
    );
    setBookmarkedIds(stored);
  };

  useEffect(() => {
    loadBookmarks();

    const handleBookmarkChange = () => {
      loadBookmarks();
    };

    window.addEventListener("bookmarkChanged", handleBookmarkChange);

    return () => {
      window.removeEventListener("bookmarkChanged", handleBookmarkChange);
    };
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [showBookmarkedOnly]);

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.plant_name?.toLowerCase().includes(search.toLowerCase());

    const matchesBookmark = showBookmarkedOnly
      ? bookmarkedIds.includes(plant.id)
      : true;

    return matchesSearch && matchesBookmark;
  });

  if (loading) {
    return <div className="text-center mt-10">Loading plants...</div>;
  }

  return (
    <main className="h-screen flex flex-col p-18 overflow-hidden chalk-text">
      <div className="flex-shrink-0">
        <h1 className="chalk-text text-5xl text-center mb-6 font-bold">
          Plant Library
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg bg-white/30 px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={() => setShowBookmarkedOnly((prev) => !prev)}
            className={`px-4 py-2 rounded-3xl font-medium transition ${
              showBookmarkedOnly
                ? "bg-yellow-500 text-black"
                : "bg-yellow-800 text-white hover:bg-yellow-600"
            }`}
          >
            {showBookmarkedOnly ? "Showing Bookmarked" : "All Plants"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide bg-white/20 backdrop-blur-sm rounded-4xl w-4/5 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-20">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white/20 rounded-3xl backdrop-blur-md border-yellow-800 border-2 shadow-md overflow-hidden relative hover:scale-105 transition"
            >
              <div
                onClick={() => setSelectedPlant(plant)}
                className="cursor-pointer relative"
              >
                <Image
                  src={plant.photos?.[0] || "/placeholder.png"}
                  alt={plant.plant_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                  unoptimized
                />

                <div className="absolute top-2 right-2 z-10">
                  <BookmarkButton plantId={plant.id} />
                </div>

                <div className="p-4 text-center font-medium bg-yellow-800 text-white">
                  {plant.plant_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlant && (
        <PlantModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}

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