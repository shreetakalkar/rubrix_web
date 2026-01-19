"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bookmarked_plants";

export function usePlantBookmarks(plantId) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setBookmarked(saved.includes(plantId));
  }, [plantId]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    let updated;
    if (saved.includes(plantId)) {
      updated = saved.filter(id => id !== plantId);
      setBookmarked(false);
    } else {
      updated = [...saved, plantId];
      setBookmarked(true);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { bookmarked, toggleBookmark };
}
