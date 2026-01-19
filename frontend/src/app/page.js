import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`leaf leaf-${i}`}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Blackboard Heading */}
      <div className="text-center mt-60 relative z-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg chalk-text">
          Virtual Botanical Garden
        </h1>
        <p className="mt-3 text-lg text-gray-200 drop-shadow-sm chalk-subtitle">
          Explore Medicinal Plants Digitally
        </p>
      </div>

      {/* Bottom Center Cards */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-6  justify-center">

          <Card
            title="Explore Plant Library"
            subtitle="Browse Herbal Knowledge"
            icon="/library.png"
            link="/plant-library"
          />

          <Card
            title="Games & Learning"
            subtitle="Fun Quizzes & Challenges"
            icon="/games.png"
            link="/games"
          />

          <Card
            title="Botanical Garden"
            subtitle="Virtual Greenhouse Tour"
            icon="/garden.png"
            link="/garden"
          />

        </div>
      </div>

    </main>
  );
}

/* Card Component */
function Card({ title, subtitle, icon, link }) {
  return (
    <Link
      href={link}
      className="w-64 p-5 rounded-2xl bg-white/30 backdrop-blur-sm shadow-xl border border-white/70 cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={icon}
        alt={title}
        className="w-24 h-16 mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-center text-gray-800">
        {title}
      </h3>
      <p className="text-sm text-center text-gray-600 mt-1">
        {subtitle}
      </p>
    </Link>
  );
}
