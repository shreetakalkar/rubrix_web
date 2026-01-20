"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";


const DiscoveryTimeline = dynamic(
  () => import("@/src/components/plantStudy/DiscoveryTimeline"),
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

/* ------------------ Main Modal ------------------ */

export default function PlantModal({ plant, onClose }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showStudyList, setShowStudyList] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCompletionBox, setShowCompletionBox] = useState(false);
  const router = useRouter();

  /* 🔒 Lock background scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      window?.speechSynthesis.cancel();
    };
  }, []);

  if (!plant) return null;

  /* ------------------ Speech ------------------ */

  const speakPlantInfo = useCallback(() => {
    if (typeof window === "undefined") return;

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
      plant.ayurvedic_formulations?.length &&
        `Ayurvedic formulations: ${plant.ayurvedic_formulations.join(", ")}`,
      plant.precautions && `Precautions: ${plant.precautions}`,
    ]
      .filter(Boolean)
      .join(". ");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, plant]);

  /* ------------------ Close ------------------ */

  const handleClose = () => {
    window?.speechSynthesis.cancel();
    onClose();
  };

  return (
    <>
      {/* 🌿 Plant Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative w-[92%] max-w-3xl max-h-[90vh] rounded-2xl bg-green-200 border border-green-800 shadow-2xl flex flex-col">

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-red-500 hover:bg-red-600 px-3 py-1 text-white shadow"
          >
            ✕
          </button>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-6 space-y-6 scrollbar-none">

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Image
                src={plant.photos?.[0] || "/placeholder.png"}
                alt={plant.plant_name}
                width={320}
                height={180}
                className="rounded-xl object-cover shadow-lg"
                unoptimized
              />

              <div className="flex-1">
                <h1 className="text-3xl font-bold chalk-text text-green-900">
                  {plant.plant_name}
                </h1>
                <p className="text-green-800 chalk-subtitle">
                  {plant.scientific_name}
                </p>

                <div className="mt-4 flex gap-3 flex-wrap">
                  {/* Listen Button */}
                  <button
                    onClick={speakPlantInfo}
                    className={`rounded-full px-4 py-2 text-sm shadow text-white ${
                      isSpeaking ? "bg-orange-500" : "bg-green-700"
                    }`}
                  >
                    {isSpeaking ? "⏸ Pause" : "▶ Listen"}
                  </button>

                  {/* Timeline Button */}
                  <button
                    onClick={() => setShowTimeline(true)}
                    className="rounded-full px-4 py-2 text-sm shadow bg-blue-700 text-white"
                  >
                    🕰 Discovery Timeline
                  </button>

                  {/* YouTube Button */}
                  {plant.video && (
                    <a
                      href={plant.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-4 py-2 text-sm shadow bg-red-600 text-white hover:bg-red-700"
                    >
                      ▶ Watch on YouTube
                    </a>
                  )}
                </div>

              </div>
            </div>

            {/* Info Table */}
            <div className="rounded-xl border border-green-700 overflow-hidden shadow-lg chalk-subtitle">
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
                  <Row label="Precautions" value={plant.precautions} />
                </tbody>
              </table>
            </div>

            {/* Notes / Study / Complete */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => {
                  setShowNotes((v) => !v);
                  setShowStudyList(false);
                }}
                className={`flex-1 rounded-lg px-4 py-2 chalk-text ${
                  showNotes ? "bg-green-700" : "bg-green-900/30"
                }`}
              >
                📝 Notes
              </button>

              <button
                onClick={() => {
                  setShowStudyList((v) => !v);
                  setShowNotes(false);
                }}
                className={`flex-1 rounded-lg px-4 py-2 chalk-text ${
                  showStudyList ? "bg-green-700" : "bg-green-900/30"
                }`}
              >
                📚 Study List
              </button>

              <button
                onClick={() => setShowCompletionBox(true)}
                className="flex-1 rounded-lg px-4 py-2 bg-emerald-700 text-white font-semibold"
              >
                ✅ Mark Chapter Completed
              </button>
            </div>

            {showNotes && <NotesPanel plantId={plant.id} />}
            {showStudyList && <StudyListManager plantId={plant.id} />}
          </div>
        </div>
      </div>

      {/* 🎉 Completion Box */}
      {showCompletionBox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-green-700">
              🎉 Chapter Completed!
            </h2>
            <p className="text-gray-700">
              Great job! You’ve completed this plant.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowCompletionBox(false);
                  onClose();
                  router.push("/games"); // 👈 navigate here
                }}
                className="px-4 py-2 rounded-lg bg-green-700 text-white"
              >
                Test Your Knowledge
              </button>

              <button
                onClick={() => setShowCompletionBox(false)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🕰 Timeline Modal */}
      {showTimeline && (
        <DiscoveryTimeline
          plantId={plant.id}
          plantName={plant.plant_name}
          onClose={() => setShowTimeline(false)}
        />
      )}
    </>
  );
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
