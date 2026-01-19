"use client";
import { useEffect, useState } from "react";

export function usePlantNotes(plantId) {
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`plant_note_${plantId}`);
    if (saved) setNote(saved);
  }, [plantId]);

  const saveNote = (text) => {
    setNote(text);
    localStorage.setItem(`plant_note_${plantId}`, text);
  };

  return { note, saveNote };
}
