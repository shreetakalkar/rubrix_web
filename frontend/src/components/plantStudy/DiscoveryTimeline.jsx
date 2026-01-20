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
  ashvagandha: {
    name: "Ashwagandha",
    origin: "Native to India, the Middle East, and parts of Africa; used since 1000 BCE.",
    traditional_medicine: "Highly valued in Ayurveda as a Rasayana for vitality, strength, and longevity.",
    scientific_identification: {
      scientific_name: "Withania somnifera",
      family: "Solanaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Listed in the Ayurvedic Pharmacopoeia of India and promoted under AYUSH guidelines.",
    folk_usage: "Used in folk medicine for stress relief, energy, and stamina enhancement.",
  },
  bala: {
    name: "Bala",
    origin: "Native to India; documented in Ayurvedic texts from 600–400 BCE.",
    traditional_medicine: "Mentioned in Charaka and Sushruta Samhita for strength and rejuvenation.",
    scientific_identification: {
      scientific_name: "Sida cordifolia",
      family: "Malvaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Included in AYUSH formulations for musculoskeletal and neurological disorders.",
    folk_usage: "Used in local remedies for joint pain, respiratory issues, and general vitality.",
  },
  brahmi: {
    name: "Brahmi",
    origin: "Found in India and Sri Lanka; used in Ayurveda since at least 1000 BCE.",
    traditional_medicine: "Known for enhancing memory, cognition, and mental clarity.",
    scientific_identification: {
      scientific_name: "Bacopa monnieri",
      family: "Plantaginaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Standardized and included in AYUSH herbal formulations for cognitive health.",
    folk_usage: "Used in local folk medicine for memory, mental fatigue, and neurological support.",
  },
  guduchi: {
    name: "Guduchi",
    origin: "Native to India and Myanmar; utilized in Ayurveda since the 1st millennium BCE.",
    traditional_medicine: "Praised as 'Amrita' (the divine nectar) in classical texts for immunity and longevity.",
    scientific_identification: {
      scientific_name: "Tinospora cordifolia",
      family: "Menispermaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Included in AYUSH immune-boosting and detoxification formulations.",
    folk_usage: "Used in local remedies for fever, diabetes, and general health promotion.",
  },
  tulsi: {
    name: "Tulsi",
    origin: "Sacred plant of India; cultivation and use date back over 3000 years.",
    traditional_medicine: "Extensively documented in Ayurveda for respiratory, immune, and spiritual benefits.",
    scientific_identification: {
      scientific_name: "Ocimum sanctum",
      family: "Lamiaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Widely promoted by AYUSH for its adaptogenic and immunomodulatory properties.",
    folk_usage: "Used in teas, decoctions, and rituals to enhance immunity and well-being.",
  },
  haridra: {
    name: "Haridra",
    origin: "Native to India and Southeast Asia; used for thousands of years in Ayurvedic practices.",
    traditional_medicine: "Used for anti-inflammatory, digestive, and skin-related therapies.",
    scientific_identification: {
      scientific_name: "Curcuma longa",
      family: "Zingiberaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Standardized in AYUSH formulations for anti-inflammatory and antioxidant benefits.",
    folk_usage: "Used in folk medicine for wound healing, liver health, and joint pain relief.",
  },
  kumari: {
    name: "Kumari",
    origin: "Native to the Indian subcontinent; cultivated in Ayurveda since ancient times.",
    traditional_medicine: "Known as Aloe vera; used for digestive, skin, and rejuvenation purposes.",
    scientific_identification: {
      scientific_name: "Aloe barbadensis miller",
      family: "Asphodelaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Included in AYUSH formulations for skin health and detoxification.",
    folk_usage: "Applied topically and consumed internally for burns, wounds, and digestive health.",
  },
  nimba: {
    name: "Nimba",
    origin: "Native to India; used for over 2000 years in Ayurvedic medicine.",
    traditional_medicine: "Used in classical texts for its blood-purifying, antimicrobial, and anti-inflammatory properties.",
    scientific_identification: {
      scientific_name: "Azadirachta indica",
      family: "Meliaceae",
      year_identified: 1753,
    },
    ayush_recognition: "Included in AYUSH herbal preparations for immunity, skin, and hygiene.",
    folk_usage: "Used in local remedies for skin infections, fever, and oral hygiene.",
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
          <div className="relative w-[75%] max-w-6xl h-[70vh] rounded-3xl bg-gradient-to-br from-amber-900 to-yellow-950 border border-yellow-700 shadow-2xl overflow-hidden pointer-events-auto">

            {/* close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 rounded-full bg-red-500 hover:bg-red-600 px-3 py-1 text-white shadow"
            >
              ✕
            </button>

            {/* header */}
            <div className="absolute top-0 left-0 w-full z-40 p-6 bg-gradient-to-b from-black/70 to-transparent">
              <h1 className="text-7xl font-bold text-yellow-200 mt-10 chalk-subtitle">Discovery Timeline</h1>
              <p className="text-white text-lg chalk-subtitle">Evolution & discovery of {data.name || plantName}</p>
            </div>

            {/* content */}
            <div className="absolute inset-0 text-lg font-bold pt-28 px-8 grid grid-cols-2 gap-10 chalk-subtitle">

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
                      className="absolute p-6 rounded-2xl bg-white/60 border border-amber-700 text-yellow-50 shadow-lg"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-amber-950">{i + 1}. {step.title}</h3>
                      <div className="text-amber-900 text-sm">{content}</div>
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
