"use client";
import { usePlantNotes } from "./usePlantNotes";

export default function NotesPanel({ plantId }) {
  const { note, saveNote } = usePlantNotes(plantId);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-white mb-2">
        Personal Notes
      </h3>

      <textarea
        value={note}
        onChange={(e) => saveNote(e.target.value)}
        placeholder="Write your observations, exam points, dosage notes..."
        className="w-full h-28 rounded-xl bg-green-900 border border-green-700 p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
