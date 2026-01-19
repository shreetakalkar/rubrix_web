"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


  const ayurvedaTimeline = [
  {
    year: "3000 BCE",
    title: "Origins in the Vedas",
    desc: "Ayurveda emerges from the Atharva Veda, focusing on balance of body and mind. Practices included meditation, herbal remedies, dietary rules, and daily routines for optimal health.",
    location: "India",
    keyFigures: ["Ancient Rishis"],
    significance: "Foundational concepts of Doshas and holistic wellness. These early texts laid the philosophical and practical groundwork for health, disease prevention, and longevity practices.",
    bg: "/ayurveda/veda.jpg",
  },
  {
    year: "1500 BCE",
    title: "Charaka Samhita",
    desc: "Charaka Samhita systematically documented internal medicine, diagnosis techniques, and herbal formulations. It emphasized ethics of physician-patient relationships and preventive care.",
    location: "India",
    keyFigures: ["Charaka"],
    significance: "Developed systematic methods for diagnosing and treating diseases. Introduced concepts of metabolism, digestion, and immunity that are still relevant in Ayurveda today.",
    bg: "/ayurveda/charaka.jpg",
  },
  {
    year: "1200 BCE",
    title: "Sushruta Samhita",
    desc: "Sushruta Samhita advanced surgery with detailed anatomical knowledge, surgical instruments, and procedures. It included plastic surgery, eye operations, and trauma management.",
    location: "India",
    keyFigures: ["Sushruta"],
    significance: "Introduced surgical techniques and instruments still referenced today. It highlighted the importance of hands-on medical training and clinical observation.",
    bg: "/ayurveda/sushruta.jpg",
  },
  {
    year: "800 CE",
    title: "Golden Age",
    desc: "Ayurveda flourished in Indian universities. Scholars compiled encyclopedic knowledge, integrating treatments, medicinal plants, and theories of body-mind-soul harmony.",
    location: "India",
    keyFigures: ["Various Scholars"],
    significance: "Ayurveda became a structured medical science taught in universities. Knowledge was systematized, ensuring transmission across generations and influencing other Asian medical systems.",
    bg: "/ayurveda/golden.jpg",
  },
  {
    year: "Modern Era",
    title: "Global Recognition",
    desc: "Ayurveda gained worldwide recognition through integration with modern wellness practices. Therapies like yoga, meditation, Panchakarma, and herbal medicine became globally popular.",
    location: "Worldwide",
    keyFigures: ["Global Practitioners"],
    significance: "Ayurveda practices integrated into wellness and alternative medicine globally. Modern research validates some herbal remedies and lifestyle approaches, merging traditional wisdom with contemporary science.",
    bg: "/ayurveda/modern.jpg",
  },
];

export default function AyurvedaTimeline() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bgRefs = useRef([]);
  bgRefs.current = [];

  const [activeIndex, setActiveIndex] = useState(0);

  const addBgRef = (el) => {
    if (el && !bgRefs.current.includes(el)) bgRefs.current.push(el);
  };

  useEffect(() => {
    const sections = gsap.utils.toArray(".timeline-item");

    // Set initial background opacity
    bgRefs.current.forEach((bg, i) => gsap.set(bg, { opacity: i === 0 ? 1 : 0 }));

    // Calculate total horizontal scroll
    const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

    // Horizontal scroll
    gsap.to(trackRef.current, {
      x: () => `-${trackRef.current.scrollWidth - window.innerWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.8, // slow down
        end: () => `+=${totalWidth}`,
        snap: 1 / (sections.length - 1),
        onUpdate: (self) => {
          // Determine active index based on scroll progress
          const index = Math.round(self.progress * (sections.length - 1));
          setActiveIndex(index);

          // Update background fade
          bgRefs.current.forEach((bg, i) => {
            gsap.to(bg, {
              opacity: i === index ? 1 : 0,
              duration: 0.5,
              ease: "power2.out",
            });
          });
        },
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background images */}
      {ayurvedaTimeline.map((item, i) => (
        <div
          key={i}
          ref={addBgRef}
          className="fixed inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
          style={{ backgroundImage: `url(${item.bg})` }}
        />
      ))}
      <div className="fixed inset-0 bg-black/50 z-10" />

      {/* Checkpoint bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {ayurvedaTimeline.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                i <= activeIndex ? "bg-yellow-400" : "bg-gray-400/40"
              }`}
            />
            <span className="text-xs text-white mt-1">{item.year}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-32 w-full text-center z-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          History of Ayurveda
        </h1>
      </div>

      {/* Timeline */}
<div className="relative z-30 h-full flex items-center">
  <div
    ref={trackRef}
    className="flex"
    style={{ width: `${ayurvedaTimeline.length * 100}vw` }}
  >
    {ayurvedaTimeline.map((item, i) => (
      <div key={i} className="timeline-item w-screen flex justify-center mt-10 chalk-text">
        <div
          className={`relative max-w-lg p-8 pt-12 rounded-3xl backdrop-blur-xl
          border border-white/20 transition-all duration-500
          ${
            i === activeIndex
              ? "bg-white/15 scale-100 opacity-100 shadow-xl shadow-yellow-700/10"
              : "bg-white/5 scale-90 opacity-50"
          }`}
        >
          {/* Year Oval (on border) */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="px-6 py-1 rounded-full bg-yellow-800 text-white border border-yellow-400 text-sm font-semibold shadow-md">
              {item.year}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl text-yellow-400 font-semibold mt-2">
            {item.title}
          </h2>

          {/* Description */}
          <p className="text-gray-200 mt-4">
            {item.desc}
          </p>

          {/* Metadata */}
          <p className="text-gray-300 mt-4">
            <strong className="text-yellow-700">Location:</strong>{" "}
            {item.location}
          </p>

          <p className="text-gray-300 mt-1">
            <strong className="text-yellow-700">Key Figures:</strong>{" "}
            {item.keyFigures.join(", ")}
          </p>

          {/* Highlighted Important Section */}
          <div className="mt-6 p-4 rounded-xl bg-yellow-800 border border-yellow-700/30 backdrop-blur-sm">
            <p className="text-gray-200 text-sm leading-relaxed">
              <strong className="text-yellow-400">Significance:</strong>{" "}
              {item.significance}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Scroll hint */}
      <div className="absolute bottom-10 w-full text-center text-white/70 z-40">
        ↓ Scroll to continue
      </div>
    </section>
  );
}
