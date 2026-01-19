"use client";


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
        style={{ backgroundImage: "url('/stand.png')" }}
      />

      
      <div className="absolute inset-0 bg-black/20" />

     
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          
        </div>
      </div>

    </main>
  );
}
