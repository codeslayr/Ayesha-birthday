// components/Preloader.tsx
"use client";

import { useProgress } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onStarted: () => void;
}

export default function Preloader({ onStarted }: PreloaderProps) {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback: If no assets to load, auto-complete after 1 second
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1000);

    if (progress === 100) {
      setIsLoaded(true);
      clearTimeout(fallbackTimer);
    }

    return () => clearTimeout(fallbackTimer);
  }, [progress]);

  const handleEnter = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          containerRef.current?.style.setProperty("display", "none");
          onStarted();
        },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
    >
      {!isLoaded ? (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-light mb-4 tracking-widest text-purple-300">
            Gathering Memories...
          </p>
          {/* Show progress, or 0 if it's relying on the fallback timer */}
          <p className="text-xl font-mono">{Math.round(progress)}%</p>
        </div>
      ) : (
        <button
          onClick={handleEnter}
          className="px-10 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 text-xl tracking-widest cursor-pointer"
        >
          ENTER
        </button>
      )}
    </div>
  );
}