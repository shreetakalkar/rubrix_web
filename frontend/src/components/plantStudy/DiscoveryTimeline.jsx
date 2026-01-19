import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import ParticleField from "@/src/components/plantStudy/ParticleField";
import TimelineEvent from "@/src/components/plantStudy/TimelineEvent";
import { X, Leaf } from "lucide-react";

function buildTimelineEvents(data) {
  const events = [];

  if (data.origin) {
    const yearMatch = data.origin.match(/\d{4}|\d{4}–\d{4}\s?BCE|\d{4}-\d{4}\s?BCE/i);
    events.push({
      year: yearMatch ? yearMatch[0] : "Ancient Times",
      title: "Ancient Origins",
      description: data.origin,
      icon: "🌱"
    });
  }

  if (data.traditional_medicine) {
    const yearMatch = data.traditional_medicine.match(/\d{4}|\d{4}–\d{4}\s?BCE|\d{4}-\d{4}\s?BCE/i);
    events.push({
      year: yearMatch ? yearMatch[0] : "Ancient Period",
      title: "Traditional Medicine",
      description: data.traditional_medicine,
      icon: "📜"
    });
  }

  if (data.scientific_identification) {
    events.push({
      year: data.scientific_identification.year_identified?.toString() || "Unknown",
      title: "Scientific Discovery",
      description: `Scientifically classified as ${data.scientific_identification.scientific_name} from the ${data.scientific_identification.family} family.`,
      icon: "🔬"
    });
  }

  if (data.ayush_recognition) {
    const yearMatch = data.ayush_recognition.match(/post-\d{4}|\d{4}/i);
    events.push({
      year: yearMatch ? yearMatch[0] : "Modern Era",
      title: "AYUSH Recognition",
      description: data.ayush_recognition,
      icon: "🏛️"
    });
  }

  return events;
}

export default function DiscoveryTimeline({ plantId, plantName, onClose }) {
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const normalizedPlantId = plantId.toLowerCase();
    const q = query(
      collection(db, "discovery_timeline"),
      where("plant_id", "==", normalizedPlantId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setTimelineData(snapshot.docs[0].data());
      } else {
        setTimelineData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [plantId]);

  const handleScroll = (e) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-[90%] max-w-4xl h-[95vh] rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{ background: 'hsl(140 35% 4%)' }}
        >
          <ParticleField scrollY={0} />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-t-transparent"
              style={{ borderColor: 'hsl(152 60% 40%)', borderTopColor: 'transparent' }}
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl font-medium"
              style={{ color: 'hsl(145 65% 85%)' }}
            >
              Loading timeline...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!timelineData) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-[90%] max-w-4xl h-[85vh] rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{ background: 'hsl(140 35% 4%)' }}
        >
          <ParticleField scrollY={0} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 rounded-2xl p-8 text-center max-w-md mx-4"
            style={{
              background: 'hsl(140 30% 8% / 0.7)',
              backdropFilter: 'blur(24px)',
              border: '1px solid hsl(145 40% 25% / 0.3)'
            }}
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(145 65% 85%)' }}>
              No Timeline Available
            </h3>
            <p className="mb-6" style={{ color: 'hsl(140 30% 65%)' }}>
              Timeline data for {plantName} is not available yet.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{
                background: 'hsl(152 60% 40%)',
                color: 'hsl(140 30% 98%)'
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const events = buildTimelineEvents(timelineData);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-[95%] max-w-5xl h-[98vh] rounded-2xl relative overflow-hidden"
        style={{ background: 'hsl(140 35% 4%)' }}
      >
        <ParticleField scrollY={scrollY} />
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent, hsl(140 35% 4% / 0.3), hsl(140 35% 4% / 0.8))'
            }}
          />
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[100px]"
            style={{ background: 'hsl(152 60% 40% / 0.1)' }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[80px]"
            style={{ background: 'hsl(145 70% 45% / 0.1)' }}
          />
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute right-6 top-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full transition-all group"
          style={{
            background: 'hsl(140 30% 8% / 0.7)',
            backdropFilter: 'blur(24px)',
            border: '1px solid hsl(145 40% 25% / 0.3)'
          }}
        >
          <X className="w-5 h-5 transition-colors" style={{ color: 'hsl(145 65% 85%)' }} />
          <span className="text-sm font-medium transition-colors" style={{ color: 'hsl(145 65% 85%)' }}>
            Close
          </span>
        </motion.button>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative z-10 h-full overflow-y-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <Leaf className="w-16 h-16" style={{ color: 'hsl(152 60% 40%)' }} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl font-light italic"
                style={{ color: 'hsl(140 30% 65%)' }}
              >
                {timelineData.name || plantName}
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
                style={{ color: 'hsl(140 30% 65%)' }}
              >
                <span className="text-sm">Scroll to explore</span>
                <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2" style={{ borderColor: 'hsl(140 30% 65% / 0.5)' }}>
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'hsl(152 60% 40%)' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-20">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full w-full origin-top"
                style={{
                  background: 'linear-gradient(180deg, hsl(152 60% 50%), hsl(145 70% 45%), hsl(140 50% 30%))'
                }}
              />
            </div>

            {events.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                scrollY={scrollY}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 px-4"
          >
            <p style={{ color: 'hsl(140 30% 65%)' }}>
              Journey through the rich botanical heritage of{" "}
              <span className="font-medium" style={{ color: 'hsl(152 60% 40%)' }}>
                {timelineData.name || plantName}
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}