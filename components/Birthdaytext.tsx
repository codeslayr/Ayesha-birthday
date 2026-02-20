// components/Birthdaytext.tsx
"use client";

import { Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";

interface BirthdayTextProps {
  position: [number, number, number];
}

export default function BirthdayText({ position }: BirthdayTextProps) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Center>
          <Text3D
            // Using a standard Three.js hosted font for quick setup. 
            // You can replace this later with a custom JSON font if you want.
            font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
            size={1.2}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            lineHeight={0.7}
          >
            {`Happy Birthday\n    Ayesha!`}
            {/* The emissive property creates the "glow" effect */}
            <meshStandardMaterial 
              color="#E6E6FA" 
              emissive="#9370DB" // Medium Purple glow
              emissiveIntensity={2} 
              toneMapped={false} // Prevents Next.js/Three from dulling the bright glow
              roughness={0.2}
              metalness={0.8}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}