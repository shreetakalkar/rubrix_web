"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import timelineTranslations from "../translations/Timeline.json";

gsap.registerPlugin(ScrollTrigger);

const ayurvedaTimeline = [
  {
    year: "3000 BCE",
    title: "Origins in the Vedas",
    desc: "Ayurveda emerges from the Atharva Veda, focusing on balance of body and mind.",
    location: "India",
    keyFigures: ["Ancient Rishis"],
    significance: "Foundational concepts of Doshas and holistic wellness.",
    bg: "/ayurveda/veda.jpg",
  },
  {
    year: "1500 BCE",
    title: "Charaka Samhita",
    desc: "Systematic documentation of internal medicine and ethics.",
    location: "India",
    keyFigures: ["Charaka"],
    significance: "Scientific diagnosis and treatment methods.",
    bg: "/ayurveda/charaka.jpg",
  },
  {
    year: "1200 BCE",
    title: "Sushruta Samhita",
    desc: "Advanced surgery and anatomy knowledge.",
    location: "India",
    keyFigures: ["Sushruta"],
    significance: "Foundation of surgical science.",
    bg: "/ayurveda/sushruta.jpg",
  },
  {
    year: "800 CE",
    title: "Golden Age",
    desc: "Ayurveda flourished in universities.",
    location: "India",
    keyFigures: ["Various Scholars"],
    significance: "Ayurveda became a formal science.",
    bg: "/ayurveda/golden.jpg",
  },
  {
    year: "Modern Era",
    title: "Global Recognition",
    desc: "Ayurveda gained worldwide popularity.",
    location: "Worldwide",
    keyFigures: ["Global Practitioners"],
    significance: "Integration with modern wellness.",
    bg: "/ayurveda/modern.jpg",
  },
];

export default function AyurvedaTimeline() {
  const { language, t, loadTranslations } = useLanguage();

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bgRefs = useRef([]);
  bgRefs.current = [];

  const [activeIndex, setActiveIndex] = useState(0);

  const addBgRef = (el) => {
    if (el && !bgRefs.current.includes(el)) bgRefs.current.push(el);
  };

  // Load translations for this page
  useEffect(() => {
    loadTranslations(timelineTranslations);
  }, [loadTranslations]);

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const sections = Array.from(trackRef.current.children);
      const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

      bgRefs.current.forEach((bg, i) =>
        gsap.set(bg, { opacity: i === 0 ? 1 : 0 })
      );

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: containerRef.current,
          scrub: 0.8,
          end: `+=${totalWidth}`,
          snap: 1 / (sections.length - 1),
          onUpdate: (self) => {
            const index = Math.round(self.progress * (sections.length - 1));
            setActiveIndex(index);

            bgRefs.current.forEach((bg, i) => {
              gsap.to(bg, {
                opacity: i === index ? 1 : 0,
                duration: 0.5,
              });
            });
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const translatedTimeline = timelineTranslations[language]?.timeline || [];

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Backgrounds */}
      {ayurvedaTimeline.map((item, i) => (
        <div
          key={i}
          ref={addBgRef}
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${item.bg})` }}
        />
      ))}
      <div className="fixed inset-0 bg-black/50 z-10" />

      {/* Title */}
      <div className="absolute top-32 w-full text-center z-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white chalk-text">
          {t("history_of_ayurveda") || "History of Ayurveda"}
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative z-30 h-full flex items-center">
        <div ref={trackRef} className="flex" style={{ width: `${ayurvedaTimeline.length * 100}vw` }}>
          {ayurvedaTimeline.map((item, i) => {
            const translated = translatedTimeline[i] || {};
            return (
              <div key={i} className="w-screen flex justify-center mt-10 chalk-text">
                <div className="max-w-lg p-8 rounded-3xl bg-white/15">
                  <h2 className="text-3xl text-yellow-400">
                    {translated.title || item.title}
                  </h2>
                  <p className="text-gray-200 mt-4">
                    {translated.desc || item.desc}
                  </p>
                  <p className="text-gray-300 mt-4">
                    <strong>{t("location") || "Location"}:</strong> {item.location}
                  </p>
                  <p className="text-gray-300 mt-1">
                    <strong>{t("key_figures") || "Key Figures"}:</strong>{" "}
                    {item.keyFigures.join(", ")}
                  </p>
                  <div className="mt-4 p-4 bg-yellow-800 rounded-xl">
                    <strong>{t("significance") || "Significance"}:</strong>{" "}
                    {translated.significance || item.significance}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 w-full text-center text-white/70 z-40">
        ↓ {t("scroll_to_continue") || "Scroll to continue"}
      </div>
    </section>
  );
}
