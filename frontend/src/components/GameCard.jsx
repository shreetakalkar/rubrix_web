import Image from "next/image";
import Link from "next/link";

export default function GameCard({ title, subtitle, href, icon }) {
  return (
    <Link
      href={href}
      className="w-64 p-5 rounded-2xl bg-white/30 backdrop-blur-sm shadow-xl border border-white/70 cursor-pointer
                 hover:scale-105 transition-transform duration-300"
    >
      {/* Icon */}
      <div className="flex justify-center mb-4 rounded-full">
        {icon ? (
          <Image
            src={icon}
            alt={title}
            width={82}
            height={82}
            className="object-contain rounded-full bg-green-200 max-w-20 max-h-20"
          />
        ) : (
          <div className="max-h-20 max-w-20 flex items-center justify-center rounded-4xl bg-[#d8e0c8] text-3xl">
            ?
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center chalk-text text-[#232d12]">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="mt-1 text-sm text-center chalk-subtitle text-[#3c4b24]">
        {subtitle}
      </p>
    </Link>
  );
}
