// components/Candle.tsx
"use client";

import { Sparkles } from "@react-three/drei";

interface CandleProps {
  position: [number, number, number];
  isLit: boolean;
  scale?: number; // Added the scale property here
}

export default function Candle({ position, isLit, scale = 1 }: CandleProps) {
  return (
    // Applied the scale to the main group wrapper
    <group position={position} scale={scale}>
      {/* Candle Wax */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
        <meshStandardMaterial color="#F8F8FF" roughness={0.1} />
      </mesh>
      
      {/* Candle Wick */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      {/* The Flame (Sparkles + Light) */}
      {isLit && (
  <>
    <Sparkles 
      position={[0, 1.2, 0]} 
      count={12} 
      scale={0.2}  // Tightened the area
      size={2}     // Made them slightly smaller
      speed={0.4}  // Dropped from 2 to 0.4 for a gentle drift
    
      opacity={0.8} 
      color="#FFD700" 
    />
    <pointLight position={[0, 1.2, 0]} intensity={0.5} color="#FFBA08" distance={3} />
  </>
)}
    </group>
  );
}