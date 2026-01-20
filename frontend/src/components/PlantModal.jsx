"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

/* ------------------ Dynamic Imports ------------------ */

const DiscoveryTimeline = dynamic(
  () => import("@/src/components/plantStudy/DiscoveryTimeline"),
  { ssr: false }
);

const GrowthTimelineModal = dynamic(
  () => import("@/src/components/plantStudy/GrowthTimelineModal"),
  { ssr: false }
);

/* ------------------ Small Panels ------------------ */

function NotesPanel({ plantId }) {
  return (
    <div className="p-4 bg-white/40 rounded-lg">
      Notes for plant {plantId}
    </div>
  );
}

function StudyListManager({ plantId }) {
  return (
    <div className="p-4 bg-white/40 rounded-lg">
      Study list for plant {plantId}
    </div>
  );
}

/* ------------------ Compare Selector ------------------ */

function ComparePlantSelector({ plants, onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);

  const togglePlant = (plant) => {
    if (selected.find((p) => p.id === plant.id)) {
      setSelected((prev) => prev.filter((p) => p.id !== plant.id));
    } else {
      setSelected((prev) => [...prev, plant]);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl space-y-4">

        <h2 className="text-xl font-bold text-green-800">
          Select 1 or more plants to compare
        </h2>

        <div className="max-h-[320px] overflow-y-auto space-y-2">
          {plants.map((plant) => {
            const checked = selected.some((p) => p.id === plant.id);
            return (
              <label
                key={plant.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition ${
                  checked
                    ? "bg-green-100 border-green-700"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePlant(plant)}
                />
                <span className="font-medium">
                  {plant.plant_name}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-white"
          >
            Cancel
          </button>

          <button
            disabled={selected.length === 0}
            onClick={() => onConfirm(selected)}
            className="flex-1 rounded-lg bg-green-700 disabled:bg-gray-300 px-4 py-2 text-white"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Main Modal / Panel ------------------ */

export default function PlantModal({ plant, onClose, allPlants, isComparison = false }) {
  const router = useRouter();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showStudyList, setShowStudyList] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showGrowthTimeline, setShowGrowthTimeline] = useState(false);

  /* Compare */
  const [showCompareSelector, setShowCompareSelector] = useState(false);
  const [comparePlants, setComparePlants] = useState([]);

  /* Lesson completion */
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  /* Lock background scroll for main modal only */
  useEffect(() => {
    if (!isComparison) document.body.style.overflow = "hidden";
    return () => {
      if (!isComparison) document.body.style.overflow = "";
      window?.speechSynthesis.cancel();
    };
  }, [isComparison]);

  /* Load lesson completion */
  useEffect(() => {
    if (!plant?.id) return;
    const saved = localStorage.getItem(`lesson-complete-${plant.id}`);
    setLessonCompleted(saved === "true");
  }, [plant?.id]);

  /* Save lesson completion */
  useEffect(() => {
    if (!plant?.id) return;
    localStorage.setItem(
      `lesson-complete-${plant.id}`,
      lessonCompleted.toString()
    );
  }, [lessonCompleted, plant?.id]);

  if (!plant) return null;

  /* ------------------ Speech ------------------ */

  const speakPlantInfo = useCallback(() => {
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const text = [
      `Plant name: ${plant.plant_name}`,
      plant.scientific_name && `Scientific name: ${plant.scientific_name}`,
      plant.habitat && `Habitat: ${plant.habitat}`,
      plant.parts_used?.length &&
        `Parts used: ${plant.parts_used.join(", ")}`,
      plant.medicinal_uses?.length &&
        `Medicinal uses: ${plant.medicinal_uses
          .map((u) => u.purpose)
          .join(", ")}`,
    ]
      .filter(Boolean)
      .join(". ");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, plant]);

  const handleMarkCompleted = () => {
    setLessonCompleted(true);
    setShowCompletionModal(true);
  };

  const handleClose = () => {
    window?.speechSynthesis.cancel();
    onClose();
  };

  return (
    <>
      {/* 🌿 Main Modal */}
      {!isComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-[92%] max-w-3xl max-h-[90vh] rounded-2xl bg-green-200 border border-green-800 shadow-2xl flex flex-col overflow-hidden">

            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-white"
            >
              ✕
            </button>

            <div className="overflow-y-auto px-6 py-6 space-y-6">
              <HeaderSection />
              <InfoTable />
              <ActionButtons />
              {showNotes && <NotesPanel plantId={plant.id} />}
              {showStudyList && <StudyListManager plantId={plant.id} />}
            </div>
          </div>
        </div>
      )}

      {/* 🌿 Panel version for comparison */}
      {isComparison && (
        <div className="rounded-2xl bg-green-200 border border-green-800 shadow-2xl flex-1 min-w-[280px] sm:min-w-[320px] overflow-hidden flex flex-col p-4">
          <HeaderSection />
          <InfoTable />
          <ActionButtons />
        </div>
      )}


      {/* ------------------ Compare Selector ------------------ */}
      {showCompareSelector && (
        <ComparePlantSelector
          plants={allPlants.filter((p) => p.id !== plant.id)}
          onClose={() => setShowCompareSelector(false)}
          onConfirm={(plants) => {
            setComparePlants(plants);
            setShowCompareSelector(false);
          }}
        />
      )}

      {/* ------------------ Side-by-Side Comparison ------------------ */}
      {comparePlants.length > 0 && !isComparison && (
        <div className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm p-4 overflow-auto">
          <div className="flex flex-col sm:flex-row gap-4 min-w-fit">
            {/* Original Plant */}
            <PlantModal
              plant={plant}
              allPlants={allPlants}
              isComparison
              onClose={() => setComparePlants([])}
            />

            {/* Compared Plants */}
            {comparePlants.map((p) => (
              <PlantModal
                key={p.id}
                plant={p}
                allPlants={allPlants}
                isComparison
                onClose={() => setComparePlants([])}
              />
            ))}
          </div>

          {/* Close comparison */}
          <button
            onClick={() => setComparePlants([])}
            className="fixed top-6 right-6 z-[90] rounded-full bg-red-600 px-4 py-2 text-white shadow-lg"
          >
            ✕ Close Comparison
          </button>
        </div>
      )}


      {/* ------------------ Timelines ------------------ */}
      {showTimeline && (
        <DiscoveryTimeline
          plantId={plant.id}
          plantName={plant.plant_name}
          onClose={() => setShowTimeline(false)}
        />
      )}

      {showGrowthTimeline && (
        <GrowthTimelineModal
          plantName={plant.plant_name}
          onClose={() => setShowGrowthTimeline(false)}
        />
      )}

      {/* ------------------ Completion Modal ------------------ */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-green-800">
              Lesson Completed 🎉
            </h2>

            <p className="text-gray-700">
              What would you like to do next?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  handleClose();
                }}
                className="flex-1 rounded-lg bg-gray-600 hover:bg-gray-700 px-4 py-2 text-white"
              >
                ✖ Close
              </button>

              <button
                onClick={() => router.push("/games")}
                className="flex-1 rounded-lg bg-blue-700 hover:bg-blue-800 px-4 py-2 text-white"
              >
                🎮 Test Your Knowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  /* ------------------ Inner Components ------------------ */

  function HeaderSection() {
    return (
      <div className="flex gap-6 flex-col sm:flex-row">
        <Image
          src={plant.photos?.[0] || "/placeholder.png"}
          alt={plant.plant_name}
          width={320}
          height={180}
          className="rounded-xl object-cover shadow-lg"
          unoptimized
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-green-900">
            {plant.plant_name}
          </h1>

          {lessonCompleted && (
            <span className="inline-block mt-2 rounded-full bg-green-700 px-3 py-1 text-xs text-white">
              Lesson Completed
            </span>
          )}

          <p className="mt-1 text-green-800">
            {plant.scientific_name}
          </p>

          <div className="mt-4 flex gap-3 flex-wrap">
            <button
              onClick={speakPlantInfo}
              className={`rounded-full px-4 py-2 text-sm text-white ${
                isSpeaking ? "bg-orange-500" : "bg-green-700"
              }`}
            >
              {isSpeaking ? "⏸ Pause" : "▶ Listen"}
            </button>

            <button
              onClick={() => setShowTimeline(true)}
              className="rounded-full px-4 py-2 text-sm bg-blue-700 text-white"
            >
              🕰 Discovery Timeline
            </button>

            <button
              onClick={() => setShowGrowthTimeline(true)}
              className="rounded-full px-4 py-2 text-sm bg-emerald-700 text-white"
            >
              🌱 Growth Timeline
            </button>

            {plant.video && (
              <a
                href={plant.video}
                target="_blank"
                className="rounded-full px-4 py-2 text-sm bg-red-600 text-white"
              >
                ▶ YouTube
              </a>
            )}

            {!isComparison && (
              <button
                onClick={() => setShowCompareSelector(true)}
                className="rounded-full px-4 py-2 text-sm bg-purple-700 text-white"
              >
                🔍 Compare Plants
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  function InfoTable() {
    return (
      <div className="rounded-xl border border-green-700 overflow-hidden shadow-lg chalk-subtitle mt-4">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-green-700">
            <Row label="Habitat" value={plant.habitat} />
            <Row label="Parts Used" value={plant.parts_used?.join(", ")} />
            <Row
              label="Medicinal Uses"
              value={plant.medicinal_uses?.map((u) => u.purpose).join(", ")}
            />
            <Row
              label="Ayurvedic Formulations"
              value={plant.ayurvedic_formulations?.join(", ")}
            />
            <Row
              label="Food Recipes"
              value={plant.food_recipes?.map((r) => r.name).join(", ")}
            />
            <Row label="Precautions" value={plant.precautions} />
          </tbody>
        </table>
      </div>
    );
  }

  function ActionButtons() {
    return (
      <div className="flex gap-3 flex-wrap mt-4">
        <button
          onClick={() => setShowNotes((v) => !v)}
          className={`flex-1 rounded-lg px-4 py-2 ${
            showNotes ? "bg-green-700" : "bg-green-900/30"
          }`}
        >
          📝 Notes
        </button>

        <button
          onClick={() => setShowStudyList((v) => !v)}
          className={`flex-1 rounded-lg px-4 py-2 ${
            showStudyList ? "bg-green-700" : "bg-green-900/30"
          }`}
        >
          📚 Study List
        </button>

        {!lessonCompleted && !isComparison && (
          <button
            onClick={handleMarkCompleted}
            className="rounded-full px-4 py-2 text-sm shadow text-white bg-gray-700 hover:bg-gray-800"
          >
            ⬜ Mark Lesson Complete
          </button>
        )}
      </div>
    );
  }
}

/* ------------------ Table Row ------------------ */

function Row({ label, value }) {
  if (!value) return null;
  return (
    <tr className="bg-white/40">
      <td className="w-1/3 px-4 py-3 font-semibold text-green-900">
        {label}
      </td>
      <td className="px-4 py-3 text-green-900">{value}</td>
    </tr>
  );
}
