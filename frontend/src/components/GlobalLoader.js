"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalLoader() {
  const pathname = usePathname(); // detects route changes
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/img1.png", "/img2.png", "/img3.png", "/img4.png"]; // your 4 images

  useEffect(() => {
    setLoading(true);
    setCurrentImage(0);

    const imageInterval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 500); // change image every 0.5s

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(imageInterval);
    }, 2000); // total loader time

    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-yellow-900/90">
      <div className="flex flex-col items-center">
        {/* Animated Images */}
        <div className="flex space-x-4 mb-4">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              className={`w-25 transition-opacity duration-300 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
              alt={`Loader ${index + 1}`}
            />
          ))}
        </div>

        {/* Owl Mascot */}
        <img src="/owl.png" className="w-60 animate-bounce mt-5" alt="Loading" />
        {/* <p className="text-white mt-4 text-lg font-semibold chalk-text">
          Loading...
        </p> */}
      </div>
    </div>
  );
}
