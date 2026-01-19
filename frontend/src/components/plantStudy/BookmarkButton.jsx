import { useEffect, useState } from "react";

export default function BookmarkButton({ plantId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarked = JSON.parse(
      localStorage.getItem("bookmarked_plants") || "[]"
    );
    setIsBookmarked(bookmarked.includes(plantId));
  }, [plantId]);

  const toggleBookmark = (e) => {
    e.stopPropagation();

    const bookmarked = JSON.parse(
      localStorage.getItem("bookmarked_plants") || "[]"
    );

    let updated;
    if (bookmarked.includes(plantId)) {
      updated = bookmarked.filter((id) => id !== plantId);
      setIsBookmarked(false);
    } else {
      updated = [...bookmarked, plantId];
      setIsBookmarked(true);
    }

    localStorage.setItem("bookmarked_plants", JSON.stringify(updated));

    window.dispatchEvent(new Event("bookmarkChanged"));
  };

  return (
    <button
      onClick={toggleBookmark}
      className="text-2xl transition hover:scale-110"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? "⭐" : <span className="text-black">☆</span>}
    </button>
  );
}