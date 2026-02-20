// components/BirthdayLetter.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";

export default function BirthdayLetter({ isVisible }: { isVisible: boolean }) {
  const [displayText, setDisplayText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null); // 1. Create a ref for the container

  const fullText = `Happy Birthday Ayesha! Even though we aren't spending this day together, I wanted to take a moment to let you know I’m thinking of you.

Watching you grow and move through the world is one of my greatest joys. I am so incredibly proud of the woman you are, your kindness, your strength, and the way you care for everyone around you. Please never forget that you have a partner in me who sees your worth and will always be your biggest fan.

As we look toward our future together, I want to promise you my unwavering support. Whatever challenges come our way, you will never have to face them alone. I am here to hold your hand through the storms and celebrate every single one of your wins.

On this special day, I am making constant dua for you. May Allah (SWT) always keep a smile on your face and fill your heart with peace. May He grant you health, success in everything you strive for, and protect you from any sadness. I pray that He blesses our union, keeps us only for one another, and allows us to build a home filled with mercy, laughter, and light. May this year be the one where all your deepest prayers are answered.

I look forward to the time when we can celebrate these milestones together. Enjoy your day. You deserve the world and so much more.

With all my love and prayers,
Abdurrahman`;

  useEffect(() => {
    if (isVisible && displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 25); 
      return () => clearTimeout(timeout);
    }
  }, [isVisible, displayText, fullText]);

  // 2. Auto-scroll logic: triggers whenever displayText updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayText]);

  if (!isVisible) return null;

  return (
    <Html position={[0, -1.5, -15]} center distanceFactor={10}>
      <div 
        ref={scrollRef} // 3. Attach the ref to the scrollable div
        className="w-[90vw] max-w-[600px] h-[450px] overflow-y-auto p-10 bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl text-purple-50 font-serif scroll-smooth"
      >
        <p className="whitespace-pre-wrap text-base md:text-lg leading-relaxed drop-shadow-lg italic pr-4">
          {displayText}
          <span className="inline-block w-2 h-5 ml-1 bg-purple-400 animate-pulse align-middle"></span>
        </p>
      </div>
    </Html>
  );
}