import "./globals.css";
import OwlDialogue from "../components/OwlDialogue";
import GlobalLoader from "../components/GlobalLoader";
import { LanguageProvider } from "../app/context/LanguageContext";

export const metadata = {
  title: "Virtual Botanical Garden",
  description: "Explore Medicinal Plants Digitally",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative w-full min-h-screen">
        <LanguageProvider>

          {/* Floating Leaves Background */}
          <div className="absolute inset-0 z-5 pointer-events-none w-full">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`leaf leaf-${i}`} />
            ))}
          </div>

          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.jpeg')" }}
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Owl */}
          <img
            src="/owl.png"
            className="absolute bottom-6 right-6 w-40 z-40 animate-bounce-slow"
          />

          <OwlDialogue />
          <GlobalLoader />

          {/* Page Content */}
          <div className="relative z-20">
            {children}
          </div>

        </LanguageProvider>
      </body>
    </html>
  );
}
