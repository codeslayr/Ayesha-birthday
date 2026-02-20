// components/Experience.tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Candle from "./Candle";
import Polaroid from "./Polaroid";
import BirthdayText from "./Birthdaytext"; 
import NumberCandle from "./NumberCandle";
import BirthdayLetter from "./BirthdayLetter";
import GiftEnvelope from "./GiftEnvelope";

gsap.registerPlugin(ScrollTrigger);

// 1. This new helper component handles the R3F hooks
function SceneController({ showLetter, setShowLetter }: { 
  showLetter: boolean, 
  setShowLetter: (val: boolean) => void 
}) {
  useFrame((state) => {
    // Check camera depth to trigger the letter/envelope
    if (state.camera.position.z < -8 && !showLetter) {
      setShowLetter(true);
    }
  });

  return null; // This component doesn't render anything visual
}

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      tl.to(camera.position, {
        z: -16, 
        y: 1.5, 
        ease: "power1.inOut"
      }, 0);

      tl.to(camera.rotation, {
        y: Math.PI * 0.08,
        ease: "power1.inOut"
      }, 0);
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}

function PlaceholderCake({ children }: { children?: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const sprinkles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.3;
      items.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rot: Math.random() * Math.PI,
        color: ['#FF69B4', '#87CEFA', '#FFD700', '#9370DB'][Math.floor(Math.random() * 4)]
      });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 2, 32]} />
        <meshStandardMaterial color="#C8A2C8" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.15, 32]} />
        <meshStandardMaterial color="#F8F8FF" roughness={0.4} />
      </mesh>
      {sprinkles.map((s, i) => (
        <mesh key={i} position={[s.x, 1.13, s.z]} rotation={[Math.PI / 2, 0, s.rot]}>
          <capsuleGeometry args={[0.02, 0.06, 4, 8]} />
          <meshStandardMaterial color={s.color} />
        </mesh>
      ))}
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.15, 16, 32]} />
        <meshStandardMaterial color="#F8F8FF" roughness={0.4} />
      </mesh>
      {children}
    </group>
  );
}

interface ExperienceProps {
  isLit: boolean;
}

export default function Experience({ isLit }: ExperienceProps) {
  const [showLetter, setShowLetter] = useState(false);

  const smallCandles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return { x: Math.cos(angle) * 1.1, z: Math.sin(angle) * 1.1 };
    });
  }, []);

  return (
    <div className="w-full h-full bg-[#130f21]">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        
        {showLetter && (
          <spotLight 
            position={[0, 5, -12]} 
            angle={0.4} 
            penumbra={1} 
            intensity={2.5} 
            color="#FFE4E1" 
          />
        )}

        {/* 2. Place the SceneController INSIDE the Canvas */}
        <SceneController showLetter={showLetter} setShowLetter={setShowLetter} />
        <CameraRig />

        <group position={[0, -0.5, 0]}>
          <PlaceholderCake>
            <NumberCandle position={[0, 1.15, 0]} isLit={isLit} number="26" />
            {smallCandles.map((pos, i) => (
              <Candle 
                key={i} 
                position={[pos.x, 1.15, pos.z]} 
                isLit={isLit} 
                scale={0.5} 
              />
            ))}
          </PlaceholderCake>
        </group>
        
        <group position={[0, 0, -5]}>
          <Polaroid 
            position={[-3.5, 1, 0]} 
            rotation={[0.1, 0.4, -0.1]} 
            message="Picture that has my heart <3" 
            imageUrl="/photo1.jpg" 
          />
          <Polaroid 
            position={[3.5, -0.5, -4]} 
            rotation={[-0.1, -0.4, 0.1]} 
            message="11th February 2026 - A day to remember" 
            imageUrl="/photo2.jpg" 
          />
          <Polaroid 
            position={[-5, 1, -8]} 
            rotation={[0, 0.2, -0.05]} 
            message="Butterscotch Icecream :)" 
            imageUrl="/photo3.jpg" 
          />
        </group>

        <BirthdayText position={[1, 1, -15]} />
        <BirthdayLetter isVisible={showLetter} />
        
        {showLetter && (
           <GiftEnvelope 
             position={[0, -8, -18]} 
             url="https://www.ubereats.com" 
           />
        )}

        <EffectComposer enableNormalPass>
          <Bloom 
            luminanceThreshold={1.2} 
            mipmapBlur 
            intensity={0.8} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}