// components/NumberCandle.tsx
"use client";

import { Text3D, Sparkles, Center } from "@react-three/drei";

interface NumberCandleProps {
  position: [number, number, number];
  isLit: boolean;
  number: string;
}

export default function NumberCandle({ position, isLit, number }: NumberCandleProps) {
  return (
    <group position={position}>
      {/* The Number Wax */}
      <Center position={[0, 0.4, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.6}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
        >
          {number}
          <meshStandardMaterial color="#DDA0DD" roughness={0.4} metalness={0.1} />
        </Text3D>
      </Center>

      {/* Wick for 2 */}
      <mesh position={[-0.2, 0.8, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      
      {/* Wick for 6 */}
      <mesh position={[0.2, 0.8, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      {/* Twin Flames */}
      {isLit && (
        <>
          <Sparkles position={[-0.2, 0.9, 0]} count={10} scale={0.2} size={2} speed={2} color="#FFD700" />
          {/* Reduced intensity to 0.4 */}
          <pointLight position={[-0.2, 0.9, 0]} intensity={0.4} color="#FFBA08" distance={2} />
          
          <Sparkles position={[0.2, 0.9, 0]} count={10} scale={0.2} size={2} speed={2} color="#FFD700" />
          {/* Reduced intensity to 0.4 */}
          <pointLight position={[0.2, 0.9, 0]} intensity={0.4} color="#FFBA08" distance={2} />
        </>
      )}
    </group>
  );
}