import "./globals.css"; // your Tailwind + global styles

export const metadata = {
  title: "Virtual Botanical Garden",
  description: "Explore Medicinal Plants Digitally",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative h-screen w-full overflow-hidden">

        {/* Floating Leaves */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`leaf leaf-${i}`} />
          ))}
        </div>

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jpeg')" }}
        />

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Owl Mascot */}
        <img
          src="/owl.png"
          alt="Owl Mascot"
          className="absolute bottom-6 right-6 w-40 z-40 animate-bounce-slow"
        />

        {/* Page Content */}
        <div className="relative z-20">{children}</div>

      </body>
    </html>
  );
}
