"use client";
import { useState } from "react";

const STORAGE_KEY = "study_lists";

export function useStudyLists() {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  );

  const addToList = (listName, plantId) => {
    const currentList = lists[listName] || [];
    
    if (currentList.includes(plantId)) {
      return;
    }

    const updated = {
      ...lists,
      [listName]: [...currentList, plantId],
    };

    setLists(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFromList = (listName, plantId) => {
    if (!lists[listName]) {
      return;
    }

    const updatedList = lists[listName].filter(id => id !== plantId);
    
    const updated = { ...lists };
    
    if (updatedList.length === 0) {
      delete updated[listName];
    } else {
      updated[listName] = updatedList;
    }

    setLists(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { lists, addToList, removeFromList };
}