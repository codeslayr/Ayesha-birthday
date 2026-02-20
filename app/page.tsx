// app/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Experience from "../components/Experience";
import Preloader from "../components/Preloader";
import { useMicVolume } from "../hooks/useMicVolume";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [isLit, setIsLit] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { volume, initMic, stopMic, micEnabled } = useMicVolume();

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
  };

  // Listen to the volume and blow out the candle if it crosses a threshold
  useEffect(() => {
    // 1. Log the volume to your browser's dev tools console
    if (micEnabled) {
      console.log("Current Mic Volume:", volume);
    }

    // 2. Increase the threshold (Try 100 or 120 instead of 40)
    if (isLit && volume > 100) {
      setIsLit(false);
      stopMic(); // Turn off the mic once the candle is out
    }
  }, [volume, isLit, stopMic, micEnabled]);

  return (
    // Removed h-screen and overflow-hidden so the page can scroll
    <main className="relative w-full bg-slate-950">
      <Preloader onStarted={handleStart} />
      
      {/* 1. The 3D Canvas locked to the background */}
      <div className="fixed inset-0 z-0">
        <Experience isLit={isLit} />
      </div>

      {/* 2. The Invisible Scroll Track for GSAP */}
      {/* 400vh gives us plenty of room to scroll down slowly */}
      <div 
        id="scroll-wrapper" 
        className="relative z-10 w-full h-[400vh] pointer-events-none"
      />

      <audio ref={audioRef} src="/bg-music.mp3" loop />

      {/* 3. HTML Overlay (Changed from absolute to fixed so it stays on screen) */}
      {started && isLit && (
        <div className="fixed bottom-12 left-0 w-full flex flex-col items-center justify-center z-40 pointer-events-none">
          {!micEnabled ? (
            <button 
              onClick={initMic}
              className="pointer-events-auto px-6 py-3 bg-purple-600/80 text-white rounded-full backdrop-blur-md hover:bg-purple-500 transition-colors border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] tracking-wide"
            >
              Enable Mic to Blow Candles
            </button>
          ) : (
            <p className="text-purple-200 animate-pulse tracking-wider text-xl drop-shadow-lg font-light">
              Blow into your microphone!
            </p>
          )}
          
          <button 
            onClick={() => { setIsLit(false); stopMic(); }}
            className="pointer-events-auto mt-4 text-xs text-purple-400/60 underline hover:text-purple-300 transition-colors"
          >
            (Tap here if mic isn't working)
          </button>
        </div>
      )}
    </main>
  );
}