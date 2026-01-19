import GameCard from "@/src/components/GameCard";

export default function GamesPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">

      
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`leaf leaf-${i}`} />
        ))}
      </div>


      
      <div className="absolute inset-0 bg-black/20" />

      {/* Heading */}
      <div className="relative z-20 text-center pt-50">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg chalk-text">
          Games & More
        </h1>
        <p className="mt-3 text-lg text-gray-200 drop-shadow-sm chalk-subtitle">
          Fun learning with plants
        </p>
      </div>

      <div className="relative z-10 flex h-full items-center justify-center">

        
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-100">

          
          
          <GameCard
            title="Herbal Quiz"
            subtitle="Test your knowledge"
            buttonText="Start Quiz"
            href="/games/herbal-quiz"
            icon="/herbal-quiz.png"
          />


          <GameCard
            title="Plant Match"
            subtitle="Match plants with uses"
            buttonText="Play Game"
            href="/games/plant-match"
            icon="/plant-match.png"
          />

          <GameCard
            title="Build a Tree"
            subtitle="Create a medicinal tree"
            buttonText="Start Building"
            href="/games/build-tree"
            icon="/herbal-quiz.png"
          />

        </div>
      </div>

    </main>
  );
}
