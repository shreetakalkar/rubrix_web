"use client";

export default function PlantMatchCard({
  text,
  isSelected,
  isMatched,
  isWrong,
  onClick,
}) {
  let bg = "bg-white/60 hover:bg-yellow-800/70";

  if (isMatched) bg = "bg-green-600";
  else if (isWrong) bg = "bg-red-600";
  else if (isSelected) bg = "bg-yellow-500 text-black";

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg px-4 py-3 text-left font-medium transition transform hover:scale-[1.02] ${bg}`}
    >
      {text}
    </button>
  );
}
