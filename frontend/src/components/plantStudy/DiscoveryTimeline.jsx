"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// MOCK PLANT DATA
const plantData = {
  amalaki: {
    name: "Amalaki",
    origin: "Used in the Indian subcontinent since approximately 1500 BCE (Vedic period).",
    traditional_medicine: "Documented in Ayurveda around 1000–500 BCE in classical texts like Charaka Samhita.",
    scientific_identification: {
      scientific_name: "Phyllanthus emblica",
      family: "Phyllanthaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Included in the Ayurvedic Pharmacopoeia of India after the formation of AYUSH in 2014.",
    folk_usage: "Used in local folk remedies and traditional health practices for centuries.",
  },
};

export default function DiscoveryTimeline({ plantName = "Amalaki", onClose }) {
  const scrollRef = useRef(null);
  const sceneRef = useRef(null);
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);

  const TIMELINE = [
    { title: "Ancient Ayurvedic References", field: "origin", image: "/timeline/ayurveda.jpg" },
    { title: "Classical Text Documentation", field: "traditional_medicine", image: "/timeline/texts.jpg" },
    { title: "Folk Medicine Adoption", field: "folk_usage", image: "/timeline/folk.jpg" },
    { title: "Scientific Validation", field: "scientific_identification", image: "/timeline/lab.jpg" },
    { title: "Pharmaceutical / AYUSH Usage", field: "ayush_recognition", image: "/timeline/pharma.jpg" },
  ];

  const data = plantData[plantName.toLowerCase()] || {};

  // ESC to close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useLayoutEffect(() => {
    if (!scrollRef.current || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({ scroller: scrollRef.current });

      const totalScroll = TIMELINE.length * window.innerHeight;
      sceneRef.current.style.height = `${totalScroll}px`;

      imagesRef.current.forEach((img, i) => gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: 1.05 }));
      sectionsRef.current.forEach((sec, i) => gsap.set(sec, { opacity: i === 0 ? 1 : 0, y: 40 }));

      ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: () => `+=${totalScroll}px`,
        pin: true,
        scrub: 0.5,
      });

      TIMELINE.forEach((_, i) => {
        const sectionStart = (i / TIMELINE.length) * totalScroll;
        const sectionEnd = ((i + 1) / TIMELINE.length) * totalScroll;

        gsap.to(imagesRef.current[i], {
          opacity: 1,
          scale: 1,
          scrollTrigger: { trigger: sceneRef.current, start: sectionStart, end: sectionEnd, scrub: 0.5 },
        });

        gsap.to(sectionsRef.current[i], {
          opacity: 1,
          y: 0,
          scrollTrigger: { trigger: sceneRef.current, start: sectionStart, end: sectionEnd, scrub: 0.5 },
        });

        if (i > 0) {
          gsap.to(imagesRef.current[i - 1], {
            opacity: 0,
            scrollTrigger: { trigger: sceneRef.current, start: sectionStart, end: sectionEnd, scrub: 0.5 },
          });
          gsap.to(sectionsRef.current[i - 1], {
            opacity: 0,
            scrollTrigger: { trigger: sceneRef.current, start: sectionStart, end: sectionEnd, scrub: 0.5 },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[999] backdrop-blur-md ">
      {/* scroll container */}
      <div ref={scrollRef} className="absolute inset-0 overflow-y-scroll">
        <div ref={sceneRef} className="relative" />

        {/* fixed modal */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[75%] max-w-6xl h-[70vh] rounded-3xl bg-gradient-to-br from-green-900 to-emerald-950 border border-green-700 shadow-2xl overflow-hidden pointer-events-auto">

            {/* close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 rounded-full bg-red-500 hover:bg-red-600 px-3 py-1 text-white shadow"
            >
              ✕
            </button>

            {/* header */}
            <div className="absolute top-0 left-0 w-full z-40 p-6 bg-gradient-to-b from-black/70 to-transparent">
              <h1 className="text-7xl font-bold text-green-200 mt-10 chalk-text">Discovery Timeline</h1>
              <p className="text-green-300 text-lg chalk-subtitle">Evolution & discovery of {data.name || plantName}</p>
            </div>

            {/* content */}
            <div className="absolute inset-0 pt-28 px-8 grid grid-cols-2 gap-10 chalk-subtitle">

              {/* text */}
              <div className="relative flex items-center">
                {TIMELINE.map((step, i) => {
                  let content;
                  if (step.field === "scientific_identification" && data[step.field]) {
                    const sci = data[step.field];
                    content = (
                      <>
                        <p>Scientific Name: {sci.scientific_name}</p>
                        <p>Family: {sci.family}</p>
                        <p>Year Identified: {sci.year_identified}</p>
                      </>
                    );
                  } else {
                    content = <p>{data[step.field]}</p>;
                  }

                  return (
                    <div
                      key={i}
                      ref={(el) => (sectionsRef.current[i] = el)}
                      className="absolute p-6 rounded-2xl bg-white/60 border border-green-700 text-green-50 shadow-lg"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-green-950">{i + 1}. {step.title}</h3>
                      <div className="text-green-800 text-sm">{content}</div>
                    </div>
                  );
                })}
              </div>

              {/* images */}
              <div className="relative flex items-center justify-center">
                {TIMELINE.map((step, i) => (
                  <img
                    key={i}
                    ref={(el) => (imagesRef.current[i] = el)}
                    src={step.image}
                    alt={step.title}
                    className="absolute w-full h-[70%] object-cover rounded-2xl shadow-xl"
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
