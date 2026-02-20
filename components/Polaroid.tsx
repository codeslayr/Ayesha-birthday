// components/Polaroid.tsx
"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, useCursor } from "@react-three/drei"; 
import * as THREE from "three";
import gsap from "gsap";

interface PolaroidProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  message: string;
  imageUrl: string;
}

export default function Polaroid({ position, rotation = [0, 0, 0], message, imageUrl }: PolaroidProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Automatically handles the pointer cursor for interaction
  useCursor(hovered);

  useFrame((state) => {
    if (groupRef.current) {
      // A slight vertical float to keep them feeling weightless in space
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  const handleFlip = () => {
    if (!groupRef.current) return;
    setIsFlipped(!isFlipped);
    
    gsap.to(groupRef.current.rotation, {
      y: isFlipped ? rotation[1] : rotation[1] + Math.PI,
      duration: 0.8,
      ease: "back.out(1.5)",
    });
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleFlip}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Front Frame (Updated to Soft Creamy Lavender) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2.5, 0.05]} />
        <meshStandardMaterial color="#ad88f7" roughness={0.2} />
      </mesh>

      {/* The Photo Image - Drei <Image> handles aspect ratio automatically */}
      <Image
        url={imageUrl}
        scale={[1.8, 1.8]} 
        position={[0, 0.2, 0.03]} 
        toneMapped={false} 
        transparent 
      />

      {/* Back of the Polaroid (Updated to Deep Rich Lavender) */}
      <mesh position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.9, 2.4]} />
        <meshStandardMaterial color="#ad88f7" roughness={0.8} /> 
      </mesh>

      {/* Hidden Message on the Back */}
      <Text
        position={[0, 0, -0.03]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.2}
        color="#4A0E4E" // Deep purple text for high contrast
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        
      >
        {message}
      </Text>
    </group>
  );
}