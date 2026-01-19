"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const dialogueMap = {
  "/": "Welcome to the Virtual Botanical Garden 🌿",
  "/plant-library": "Explore our medicinal plants 🌱",
  "/games": "Ready to learn with fun games? 🎮",
  "/about": "Let me tell you about this garden 🦉",
};

export default function OwlDialogue() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const text =
      dialogueMap[pathname] || "Let’s explore something new! 🌼";

    setMessage(text);
    setVisible(true);

    const timer = setTimeout(() => setVisible(false), 3500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="absolute bottom-32 right-28 z-50 max-w-xs animate-fade-in">
      <div className="relative bg-white text-black px-4 py-3 rounded-4xl shadow-lg text-sm chalk-text">
        {message}
        <span className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45"></span>
      </div>
    </div>
  );
}
