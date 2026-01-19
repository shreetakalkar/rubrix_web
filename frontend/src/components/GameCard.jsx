import Image from "next/image";
import Link from "next/link";

export default function GameCard({ title, subtitle, buttonText, href, icon }) {
  return (
    <div className="w-72 rounded-2xl bg-white/40 shadow-lg border border-[#e5e1d8] p-6 text-center">
      
      {/* Icon/Image */}
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[#d8e0c8]">
        {icon ? (
          <Image
            src={icon}
            alt={title}
            width={64}
            height={64}
            className="rounded-full object-contain"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d8e0c8] text-3xl">
            ?
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl chalk-text text-[#232d12] font-bold">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="mt-2 text-sm chalk-subtitle text-[#3c4b24] font-bold">
        {subtitle}
      </p>

      {/* Button */}
      <Link href={href}>
        <button className="mt-5 w-full rounded-lg bg-[#b9c59a] py-2 text-sm font-medium text-[#2f3a22] hover:bg-[#aab88b] transition">
          {buttonText}
        </button>
      </Link>
    </div>
  );
}
