"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function PlantQRCode({ plantName }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && plantName) {
      QRCode.toCanvas(
        canvasRef.current,
        plantName,
        {
          width: 100,
          margin: 1,
          color: {
            dark: "#166534", 
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error);
        }
      );
    }
  }, [plantName]);

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white/30 rounded-lg">
      <canvas ref={canvasRef} className="rounded-lg shadow-md" />
      <p className="text-xs text-green-800 font-medium">Scan to share</p>
    </div>
  );
}