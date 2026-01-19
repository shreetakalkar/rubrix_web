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
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!plant) return null;

  const speakPlantInfo = () => {
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const textParts = [
      `Plant name: ${plant.plant_name}`,
      plant.scientific_name ? `Scientific name: ${plant.scientific_name}` : "",
      plant.habitat ? `Habitat: ${plant.habitat}` : "",
      plant.parts_used?.length ? `Parts used: ${plant.parts_used.join(", ")}` : "",
      plant.medicinal_uses?.length ? `Medicinal uses: ${plant.medicinal_uses.map(u => u.purpose).join(", ")}` : "",
      plant.ayurvedic_formulations?.length ? `Ayurvedic formulations: ${plant.ayurvedic_formulations.join(", ")}` : "",
      plant.food_recipes?.length ? `Food recipes: ${plant.food_recipes.map(r => r.name).join(", ")}` : "",
      plant.precautions ? `Precautions: ${plant.precautions}` : "",
    ];

    const fullText = textParts.filter(Boolean).join(". ");

    const utterance = new SpeechSynthesisUtterance(fullText);
    
    const englishVoice = voices.find(voice => voice.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      <div className="relative w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl border border-gray-700 scrollbar-hide">

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <button
          onClick={onClose}
          className="sticky top-0 left-full ml-2 float-right rounded-full bg-red-500 hover:bg-red-600 px-3 py-1 text-lg shadow-lg text-white transition-colors z-50 -mt-2"
        >
          ✕
        </button>

        <div className="flex flex-col sm:flex-row gap-6 mb-6 mt-2">
          <Image
            src={plant.photos?.[0] || "/placeholder.png"}
            alt={plant.plant_name}
            width={220}
            height={160}
            className="rounded-xl object-cover shadow-lg"
            unoptimized
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">
              {plant.plant_name}
            </h1>
            <p className="italic text-gray-300 mt-2">
              {plant.scientific_name}
            </p>
            
            <button
              onClick={speakPlantInfo}
              className={`mt-4 rounded-full px-4 py-2 text-sm shadow-lg transition-colors flex items-center gap-2 ${
                isSpeaking 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              <span>{isSpeaking ? '⏸️' : '▶️'}</span>
              <span>{isSpeaking ? 'Pause' : 'Listen'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg mb-6">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-700">

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

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => {
              setShowNotes(!showNotes);
              if (!showNotes) setShowStudyList(false);
            }}
            className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
              showNotes
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📝 {showNotes ? 'Hide Notes' : 'Show Notes'}
          </button>

          <button
            onClick={() => {
              setShowStudyList(!showStudyList);
              if (!showStudyList) setShowNotes(false);
            }}
            className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
              showStudyList
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📚 {showStudyList ? 'Hide Study List' : 'Show Study List'}
          </button>
        </div>

        {showNotes && <NotesPanel plantId={plant.id} />}
        
        {showStudyList && <StudyListManager plantId={plant.id} />}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;

  return (
    <tr className="bg-gray-800/50">
      <td className="w-1/3 px-4 py-3 font-semibold text-indigo-300">
        {label}
      </td>
      <td className="px-4 py-3 text-gray-200">
        {value}
      </td>
    </tr>
  );
}