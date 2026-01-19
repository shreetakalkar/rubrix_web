"use client";

export default function QuizCard({
  title,
  subtitle,
  icon,
  buttonText,
  onClick,
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-8 text-center text-white shadow-lg backdrop-blur-sm border-2">

      {/* Icon */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-800/70">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="mb-6 text-sm text-green-200">
        {subtitle}
      </p>

      {/* Button */}
      <button
        onClick={onClick}
        className="rounded-lg bg-yellow-700 px-6 py-2 font-semibold hover:bg-green-600 transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
