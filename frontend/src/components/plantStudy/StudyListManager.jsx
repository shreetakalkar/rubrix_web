"use client";
import { useState } from "react";
import { useStudyLists } from "./useStudyLists";

export default function StudyListManager({ plantId }) {
  const { lists, addToList, removeFromList } = useStudyLists();
  const [listName, setListName] = useState("");

  const plantLists = Object.keys(lists).filter(name => 
    lists[name]?.includes(plantId)
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-white mb-2">
        Study Lists
      </h3>

      <div className="flex gap-2">
        <input
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Eg: Exam Plants"
          className="flex-1 rounded-lg bg-green-900 border border-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={() => {
            if (!listName.trim()) return;
            addToList(listName.trim(), plantId);
            setListName("");
          }}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>

      {plantLists.length > 0 && (
        <div className="mt-3 space-y-2">
          {plantLists.map(name => (
            <div 
              key={name}
              className="flex items-center justify-between bg-green-800 rounded-lg px-3 py-2"
            >
              <span className="text-sm text-gray-300">📚 {name}</span>
              <button
                onClick={() => removeFromList(name, plantId)}
                className="text-red-400 hover:text-red-300 transition text-lg"
                aria-label="Remove from list"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {plantLists.length === 0 && (
        <p className="mt-3 text-sm text-gray-400 italic">
          This plant is not in any study lists yet.
        </p>
      )}
    </div>
  );
}