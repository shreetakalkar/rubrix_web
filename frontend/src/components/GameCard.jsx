import Link from "next/link";

export default function GameCard({ title, subtitle, buttonText, href }) {
  return (
    <div className="w-72 rounded-2xl bg-[#f7f4ec] shadow-lg border border-[#e5e1d8] p-6 text-center">
    
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d8e0c8] text-3xl">
        ?
      </div>

    
      <h3 className="text-xl font-semibold text-[#3b4a2f]">
        {title}
      </h3>

    
      <p className="mt-2 text-sm text-[#6b745c]">
        {subtitle}
      </p>

    
      <Link href={href}>
        <button className="mt-5 w-full rounded-lg bg-[#b9c59a] py-2 text-sm font-medium text-[#2f3a22] hover:bg-[#aab88b] transition">
          {buttonText}
        </button>
      </Link>
    </div>
  );
}
