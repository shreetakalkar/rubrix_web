"use client";

import { useEffect, useState } from "react";

export default function Plant3DModel({ src }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load model-viewer ONLY on client
    import("@google/model-viewer").then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <div className="h-[280px] w-[320px] flex items-center justify-center rounded-xl bg-green-100 border border-green-300">
        <span className="text-green-800">Loading 3D model…</span>
      </div>
    );
  }

  return (
    <model-viewer
      src={src}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
      rotation-per-second="15deg"
      shadow-intensity="1"
      environment-image="neutral"
      exposure="1"
      style={{
        width: "50%",
        height: "280px",
        borderRadius: "16px",
        background: "#e6f4ea",
      }}
    />
  );
}
