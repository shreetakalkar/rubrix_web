"use client";
import { useEffect, useState } from "react";

const plantData = {
  Tulasi: [
    {
      stage: "Seed (Bīja)",
      content: "Dormant Prāṇa rests within the seed.",
      ayush: "AYUSH recommends planting in purified soil for optimal medicinal potency.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Germination (Aṅkura)",
      content: "Prāṇa awakens as roots touch Bhūmi tattva.",
      ayush: "Proper germination ensures bioactive compounds develop effectively.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth (Vṛddhi)",
      content: "Leaves grow lush and aromatic, rich in medicinal oils.",
      ayush: "Sunlight exposure increases therapeutic compound concentration.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Sacred blossoms bloom, spiritual energy peaks.",
      ayush: "Flowers are vital for herbal formulations and extracts.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Seed Setting",
      content: "Seeds mature, completing the life cycle.",
      ayush: "Seeds are used for propagation and medicinal preparations.",
      icon: "/growth/fruit.png",
    },
  ],

  Amalaki: [
    {
      stage: "Seed (Bīja)",
      content: "Tiny seeds hold rejuvenating potential.",
      ayush: "Well-drained soil preserves vitamin-C richness.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Germination",
      content: "Sprouts emerge, establishing strong roots.",
      ayush: "Moist soil enhances antioxidant development.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Branches and leaves develop medicinal compounds.",
      ayush: "Sunlight improves antioxidant density.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Small blossoms prepare for fruiting.",
      ayush: "Healthy flowering ensures quality fruit yield.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Fruiting",
      content: "Fruits mature, rich in nutrients.",
      ayush: "Used in rejuvenation and immunity formulations.",
      icon: "/growth/fruit.png",
    },
  ],

  Ashvagandha: [
    {
      stage: "Seed",
      content: "Seeds contain dormant adaptogenic power.",
      ayush: "Sow in sandy soil for optimal root growth.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Sprouting",
      content: "Roots anchor as shoots rise.",
      ayush: "Moderate watering enhances root potency.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Leaves grow while roots strengthen underground.",
      ayush: "Sunlight increases alkaloid synthesis.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Greenish flowers indicate maturity.",
      ayush: "Flowering signals readiness for harvest.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Berry Formation",
      content: "Berries develop; roots reach peak strength.",
      ayush: "Roots harvested for rejuvenation therapies.",
      icon: "/growth/fruit.png",
    },
  ],

  Bala: [
    {
      stage: "Seed",
      content: "Seeds hold restorative energy.",
      ayush: "Fertile soil improves alkaloid potency.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Germination",
      content: "Sprouts emerge with rising Prāṇa.",
      ayush: "Balanced moisture ensures steady growth.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Leaves and stems become medicinally active.",
      ayush: "Soil enrichment maximizes therapeutic value.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Blooms signal full maturity.",
      ayush: "Flowers support herbal extract preparations.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Seed Maturity",
      content: "Seeds mature for reuse and medicine.",
      ayush: "Seeds used in strengthening formulations.",
      icon: "/growth/fruit.png",
    },
  ],

  Brahmi: [
    {
      stage: "Seed",
      content: "Tiny seeds with cognitive potential.",
      ayush: "Moist soil preserves memory-boosting properties.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Germination",
      content: "Roots spread through Bhūmi tattva.",
      ayush: "Partial sunlight improves neuro-active compounds.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Leaves accumulate brain-supportive compounds.",
      ayush: "Regular watering maintains potency.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Tiny blossoms appear.",
      ayush: "Flowers are used in cognitive tonics.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Seed Setting",
      content: "Seeds mature for future propagation.",
      ayush: "High-quality seeds ensure medicinal continuity.",
      icon: "/growth/fruit.png",
    },
  ],

  Guduchi: [
    {
      stage: "Seed",
      content: "Seeds store immune-boosting energy.",
      ayush: "Rich soil supports vine strength.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Sprouting",
      content: "Vines emerge and climb.",
      ayush: "Moderate sunlight preserves medicinal quality.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Stems thicken with bioactive compounds.",
      ayush: "Water balance is crucial for immunity benefits.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Small flowers indicate maturity.",
      ayush: "Flowers assist herbal extraction.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Fruiting",
      content: "Fruits mature for medicinal use.",
      ayush: "Used in immunity-boosting formulations.",
      icon: "/growth/fruit.png",
    },
  ],

  Haridra: [
    {
      stage: "Rhizome Seed",
      content: "Dormant curcumin potential within rhizomes.",
      ayush: "Loose fertile soil enhances curcumin content.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Sprouting",
      content: "Shoots emerge from rhizomes.",
      ayush: "Moisture aids curcumin synthesis.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Leaves expand as rhizomes thicken.",
      ayush: "Nutrient-rich soil improves potency.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "Flowers bloom above ground.",
      ayush: "Signals rhizome maturity.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Rhizome Harvest",
      content: "Rhizomes reach medicinal peak.",
      ayush: "Used in anti-inflammatory formulations.",
      icon: "/growth/fruit.png",
    },
  ],

  Nimba: [
    {
      stage: "Seed",
      content: "Seeds hold antimicrobial power.",
      ayush: "Nutrient-rich soil ensures strong growth.",
      icon: "/growth/seed.png",
    },
    {
      stage: "Germination",
      content: "Roots anchor firmly into soil.",
      ayush: "Proper germination improves medicinal compounds.",
      icon: "/growth/sprout.png",
    },
    {
      stage: "Vegetative Growth",
      content: "Leaves grow rich in bioactive agents.",
      ayush: "Sunlight increases potency.",
      icon: "/growth/plant.png",
    },
    {
      stage: "Flowering",
      content: "White flowers bloom gently.",
      ayush: "Flowers contribute to herbal extracts.",
      icon: "/growth/flower.png",
    },
    {
      stage: "Seed Maturity",
      content: "Seeds mature for medicine and propagation.",
      ayush: "Used in blood-purifying formulations.",
      icon: "/growth/fruit.png",
    },
  ],
};


export default function GrowthTimeline({ plantName = "Tulasi", onClose }) {
  const stages = plantData[plantName] || [];
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const progressPercent =
    stages.length > 1
      ? (currentStage / (stages.length - 1)) * 100
      : 0;

  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-7xl h-[70vh] bg-white/90 rounded-3xl shadow-2xl overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-green-700 text-white w-10 h-10 rounded-full"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold text-green-900 text-center pt-10 pb-6">
          Growth Timeline – {plantName}
        </h2>

        {/* Timeline wrapper */}
        <div className="relative px-14 pt-16">

          {/* Muted base line */}
          <div className="absolute top-[110px] left-14 right-14 h-1 bg-gray-300 rounded-full" />

          {/* Active progress line */}
          <div
            className="absolute top-[110px] left-14 h-1 bg-green-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Stages */}
          <div className="flex justify-between relative">
            {stages.map((stage, i) => {
              const isCompleted = i <= currentStage;
              const isActive = i === currentStage;

              return (
                <div
                  key={i}
                  className={`flex flex-col items-center w-60 transition-all duration-500
                    ${isCompleted ? "opacity-100" : "opacity-40 grayscale"}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center border-4 bg-white transition-all duration-500
                      ${
                        isCompleted
                          ? "border-green-700 shadow-xl"
                          : "border-gray-300"
                      }
                      ${isActive ? "scale-110" : ""}
                    `}
                  >
                    <img
                      src={stage.icon}
                      alt={stage.stage}
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`mt-6 p-5 rounded-2xl border text-center transition-all duration-500
                      ${
                        isCompleted
                          ? "bg-white border-green-300 shadow-md"
                          : "bg-gray-100 border-gray-200"
                      }
                    `}
                  >
                    <p className="font-bold text-green-900 mb-2">
                      {stage.stage}
                    </p>
                    <p className="text-sm text-green-800 mb-3">
                      {stage.content}
                    </p>
                    <p className="text-xs italic text-green-700">
                      <strong>AYUSH:</strong> {stage.ayush}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex gap-4">
          <button
            onClick={() => setCurrentStage((p) => Math.max(p - 1, 0))}
            disabled={currentStage === 0}
            className="px-5 py-2 rounded-full bg-gray-200 disabled:opacity-40"
          >
            ← Prev
          </button>

          <button
            onClick={() =>
              setCurrentStage((p) =>
                Math.min(p + 1, stages.length - 1)
              )
            }
            disabled={currentStage === stages.length - 1}
            className="px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
