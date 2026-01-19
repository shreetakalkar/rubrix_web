"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { title: "Ancient Ayurvedic References", desc: "Referenced in early Ayurvedic traditions.", image: "/timeline/ayurveda.jpg" },
  { title: "Classical Text Documentation", desc: "Mentioned in Charaka & Sushruta Samhitas.", image: "/timeline/texts.jpg" },
  { title: "Folk Medicine Adoption", desc: "Used in indigenous healing practices.", image: "/timeline/folk.jpg" },
  { title: "Scientific Validation", desc: "Modern studies validate medicinal compounds.", image: "/timeline/lab.jpg" },
  { title: "Pharmaceutical Usage", desc: "Used in modern medicine formulations.", image: "/timeline/pharma.jpg" },
];

export default function DiscoveryTimeline({ plantName, onClose }) {
  const scrollRef = useRef(null);
  const sceneRef = useRef(null);
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useLayoutEffect(() => {
    if (!scrollRef.current || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        scroller: scrollRef.current,
      });

      const totalScroll = TIMELINE.length * window.innerHeight; // scroll height proportional to viewport
      sceneRef.current.style.height = `${totalScroll}px`;

      // initial states
      imagesRef.current.forEach((img, i) => gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: 1.05 }));
      sectionsRef.current.forEach((sec, i) => gsap.set(sec, { opacity: i === 0 ? 1 : 0, y: 40 }));

      // create a single ScrollTrigger that pins the scene
      ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: () => `+=${totalScroll}px`,
        pin: true,
        scrub: 0.5,
      });

      // each card scroll range
      TIMELINE.forEach((_, i) => {
        const sectionStart = (i / TIMELINE.length) * totalScroll;
        const sectionEnd = ((i + 1) / TIMELINE.length) * totalScroll;

        // fade in current
        gsap.to(imagesRef.current[i], {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sceneRef.current,
            start: sectionStart,
            end: sectionEnd,
            scrub: 0.5,
          },
        });

        gsap.to(sectionsRef.current[i], {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sceneRef.current,
            start: sectionStart,
            end: sectionEnd,
            scrub: 0.5,
          },
        });

        // fade out previous
        if (i > 0) {
          gsap.to(imagesRef.current[i - 1], {
            opacity: 0,
            scrollTrigger: {
              trigger: sceneRef.current,
              start: sectionStart,
              end: sectionEnd,
              scrub: 0.5,
            },
          });
          gsap.to(sectionsRef.current[i - 1], {
            opacity: 0,
            scrollTrigger: {
              trigger: sceneRef.current,
              start: sectionStart,
              end: sectionEnd,
              scrub: 0.5,
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[999] backdrop-blur-md chalk-text">
      {/* scroll container */}
      <div ref={scrollRef} className="absolute inset-0 overflow-y-scroll">
        <div ref={sceneRef} className="relative" />

        {/* fixed modal */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[85%] max-w-6xl h-[80vh] rounded-3xl bg-green-900/90 border border-green-700 shadow-2xl overflow-hidden pointer-events-auto">

            {/* close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 rounded-full bg-red-500 hover:bg-red-600 px-3 py-1 text-white shadow"
            >
              ✕
            </button>

            {/* header */}
            <div className="absolute top-0 left-0 w-full z-40 p-6 bg-gradient-to-b from-black/70 to-transparent">
              <h1 className="text-3xl font-bold text-green-200">Discovery Timeline</h1>
              <p className="text-green-300 text-sm">Evolution & discovery of {plantName}</p>
            </div>

            {/* content */}
            <div className="absolute inset-0 pt-28 px-8 grid grid-cols-2 gap-10">

              {/* text */}
              <div className="relative flex items-center">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => (sectionsRef.current[i] = el)}
                    className="absolute p-6 rounded-2xl bg-white/50 border border-green-700 text-green-900 shadow"
                  >
                    <h3 className="text-xl font-semibold mb-2">{i + 1}. {item.title}</h3>
                    <p className="text-green-300 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* images */}
              <div className="relative flex items-center justify-center">
                {TIMELINE.map((item, i) => (
                  <img
                    key={i}
                    ref={(el) => (imagesRef.current[i] = el)}
                    src={item.image}
                    alt={item.title}
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
