// components/GiftEnvelope.tsx
"use client";

import { useRef, useState, useMemo } from "react";
import { Float, Text, useCursor } from "@react-three/drei";
import * as THREE from "three";

export default function GiftEnvelope({ position, url }: { position: [number, number, number], url: string }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); 

  const flapShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.8, 0.5); 
    shape.lineTo(0.8, 0.5);  
    shape.lineTo(0, -0.2);   
    shape.lineTo(-0.8, 0.5); 
    return shape;
  }, []);

  const colors = {
    envelope: "#af68ce", 
    flap: "#af68ce",     
    seal: "#FFD700",     
    text: "#FFFFFF",     
  };

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group 
        position={position}
        onClick={() => window.open(url, "_blank")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={1.2}
      >
        <mesh>
          <boxGeometry args={[1.6, 1, 0.04]} />
          <meshStandardMaterial 
            color={colors.envelope}
            roughness={0.6} 
            emissive={colors.envelope}
            emissiveIntensity={hovered ? 0.3 : 0.1} 
          />
        </mesh>

        <mesh position={[0, 0, 0.021]}> 
          <shapeGeometry args={[flapShape]} />
          <meshStandardMaterial 
            color={colors.flap}
            roughness={0.6}
            side={THREE.DoubleSide} 
          />
        </mesh>

        <mesh position={[0, -0.1, 0.04]}> 
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={colors.seal}
            metalness={0.8} 
            roughness={0.2} 
            emissive={colors.seal}
            emissiveIntensity={0.3}
          />
        </mesh>

        <Text 
          position={[0, -0.9, 0]} 
          fontSize={0.18} 
          color={colors.text}
          // Removed the font URL to prevent the crash
        >
          {hovered ? "Click to Open Dinner!" : "A Surprise Awaits..."}
        </Text>
      </group>
    </Float>
  );
}