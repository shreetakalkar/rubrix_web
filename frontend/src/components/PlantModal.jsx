"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import NotesPanel from "@/src/components/plantStudy/NotesPanel";
import StudyListManager from "@/src/components/plantStudy/StudyListManager";

export default function PlantModal({ plant, onClose }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [showStudyList, setShowStudyList] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => window.speechSynthesis.cancel();
  }, []);

  if (!plant) return null;

  const speakPlantInfo = () => {
    window.speechSynthesis.cancel();
    if (isSpeaking) return setIsSpeaking(false);

    const text = [
      `Plant name: ${plant.plant_name}`,
      plant.scientific_name && `Scientific name: ${plant.scientific_name}`,
      plant.habitat && `Habitat: ${plant.habitat}`,
      plant.parts_used?.length && `Parts used: ${plant.parts_used.join(", ")}`,
      plant.medicinal_uses?.length &&
        `Medicinal uses: ${plant.medicinal_uses.map(u => u.purpose).join(", ")}`,
      plant.ayurvedic_formulations?.length &&
        `Ayurvedic formulations: ${plant.ayurvedic_formulations.join(", ")}`,
      plant.food_recipes?.length &&
        `Food recipes: ${plant.food_recipes.map(r => r.name).join(", ")}`,
      plant.precautions && `Precautions: ${plant.precautions}`,
    ].filter(Boolean).join(". ");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[92%] max-w-3xl max-h-[90vh] rounded-2xl bg-green-200 border border-green-800 shadow-2xl flex flex-col">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-red-500 hover:bg-red-600 px-3 py-1 text-white shadow"
        >
          ✕
        </button>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-green-700">

          {/* TOP SECTION */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Image
              src={plant.photos?.[0] || "/placeholder.png"}
              alt={plant.plant_name}
              width={320}
              height={160}
              className="rounded-xl object-cover shadow-lg"
              unoptimized
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-green-900 chalk-text">
                {plant.plant_name}
              </h1>
              <p className="text-green-800 mt-1 italic">
                {plant.scientific_name}
              </p>

              <button
                onClick={speakPlantInfo}
                className={`mt-4 rounded-full px-4 py-2 text-sm flex items-center gap-2 shadow ${
                  isSpeaking
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-green-700 hover:bg-green-800"
                } text-white`}
              >
                {isSpeaking ? "⏸️ Pause" : "▶️ Listen"}
              </button>

              {/* VIDEO */}
              {plant.video && (
                <div className="mt-4">
                  <p className="font-semibold text-green-900 mb-2">
                    📺 Watch Video
                  </p>
                  <div className="aspect-video w-80 rounded-xl overflow-hidden border border-green-700 shadow-lg">
                    {plant.video.includes("youtube") || plant.video.includes("embed") ? (
                      <iframe src={plant.video} className="w-full h-full" allowFullScreen />
                    ) : (
                      <video src={plant.video} controls className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* INFO TABLE */}
          <div className="rounded-xl border border-green-700 overflow-hidden shadow-lg">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-green-700">
                <Row label="Scientific Name" value={plant.scientific_name} />
                <Row label="Habitat" value={plant.habitat} />
                <Row label="Parts Used" value={plant.parts_used?.join(", ")} />
                <Row label="Medicinal Uses" value={plant.medicinal_uses?.map(u => u.purpose).join(", ")} />
                <Row label="Ayurvedic Formulations" value={plant.ayurvedic_formulations?.join(", ")} />
                <Row label="Food Recipes" value={plant.food_recipes?.map(r => r.name).join(", ")} />
                <Row label="Precautions" value={plant.precautions} />
              </tbody>
            </table>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowNotes(!showNotes);
                setShowStudyList(false);
              }}
              className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
                showNotes
                  ? "bg-green-700 text-white"
                  : "bg-green-900/30 text-green-900 hover:bg-green-900/40"
              }`}
            >
              📝 {showNotes ? "Hide Notes" : "Show Notes"}
            </button>

            <button
              onClick={() => {
                setShowStudyList(!showStudyList);
                setShowNotes(false);
              }}
              className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
                showStudyList
                  ? "bg-green-700 text-white"
                  : "bg-green-900/30 text-green-900 hover:bg-green-900/40"
              }`}
            >
              📚 {showStudyList ? "Hide Study List" : "Show Study List"}
            </button>
          </div>

          {showNotes && <NotesPanel plantId={plant.id} />}
          {showStudyList && <StudyListManager plantId={plant.id} />}

        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <tr className="bg-white/40">
      <td className="w-1/3 px-4 py-3 font-semibold text-green-900">{label}</td>
      <td className="px-4 py-3 text-green-900">{value}</td>
    </tr>
  );
}
