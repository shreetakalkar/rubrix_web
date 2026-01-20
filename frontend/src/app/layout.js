import "./globals.css";
import OwlDialogue from "../components/OwlDialogue";
import GlobalLoader from "../components/GlobalLoader";

export const metadata = {
  title: "Virtual Botanical Garden",
  description: "Explore Medicinal Plants Digitally",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative w-full min-h-screen">

        {/* Background, leaves, owl */}
        <div className="absolute inset-0 z-5 pointer-events-none w-full">
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`leaf leaf-${i}`} />
          ))}
        </div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }} />
        <div className="absolute inset-0 bg-black/20" />
        <img src="/owl.png" className="absolute bottom-6 right-6 w-40 z-40 animate-bounce-slow" />
        <OwlDialogue />

        {/* Global Loader */}
        <GlobalLoader />

        {/* Page Content */}
        <div className="relative z-20">{children}</div>

      </body>
    </html>
  );
}
