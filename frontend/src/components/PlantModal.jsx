"use client";

import Image from "next/image";

export default function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      {/* Modal Card */}
      <div className="relative w-[90%] max-w-3xl rounded-2xl bg-[#f6f2ec] p-6 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-red-400 px-3 py-1 text-lg shadow"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex gap-6 mb-6">
          <Image
            src={plant.photos?.[0] || "/placeholder.png"}
            alt={plant.plant_name}
            width={220}
            height={160}
            className="rounded-xl object-cover"
            unoptimized
          />

          <div>
            <h1 className="text-3xl chalk-text font-bold text-[#2f3a22] mt-10">
              {plant.plant_name}
            </h1>
            <p className="italic chalk-subtitle text-[#5c6b3c]">
              {plant.scientific_name}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-[#ddd]">
          <table className="w-full text-sm">
            <tbody className="divide-y">

              <Row label="Scientific Name" value={plant.scientific_name} />
              <Row label="Habitat" value={plant.habitat} />

              <Row
                label="Parts Used"
                value={plant.parts_used?.join(", ")}
              />

              <Row
                label="Medicinal Uses"
                value={plant.medicinal_uses
                  ?.map((u) => u.purpose)
                  .join(", ")}
              />

              <Row
                label="Ayurvedic Formulations"
                value={plant.ayurvedic_formulations?.join(", ")}
              />

              <Row
                label="Food Recipes"
                value={plant.food_recipes
                  ?.map((r) => r.name)
                  .join(", ")}
              />

              <Row
                label="Precautions"
                value={plant.precautions}
              />

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* Table Row Component */
function Row({ label, value }) {
  if (!value) return null;

  return (
    <tr className="bg-white">
      <td className="w-1/3 px-4 py-3 font-semibold text-[#3c4b24]">
        {label}
      </td>
      <td className="px-4 py-3 text-[#4b4b4b]">
        {value}
      </td>
    </tr>
  );
}
