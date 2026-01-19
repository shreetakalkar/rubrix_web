import GameCard from "@/components/GameCard";

export default function GamesPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">

      
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`leaf leaf-${i}`} />
        ))}
      </div>

    
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      />

      
      <div className="absolute inset-0 bg-black/20" />

     
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          <GameCard
            title="Herbal Quiz"
            subtitle="Test your knowledge"
            buttonText="Start Quiz"
            href="/games/herbal-quiz"
          />

          <GameCard
            title="Plant Match"
            subtitle="Match plants with uses"
            buttonText="Play Game"
            href="/games/plant-match"
          />

          <GameCard
            title="Build a Tree"
            subtitle="Create a medicinal tree"
            buttonText="Start Building"
            href="/games/build-tree"
          />

        </div>
      </div>

    </main>
  );
}
