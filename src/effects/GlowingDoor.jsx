import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function GlowingDoor({ position = [0, 0, -80] }) {
  const doorRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.08 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* Door frame */}
      <mesh ref={doorRef}>
        <boxGeometry args={[2.2, 4, 0.05]} />
        <meshStandardMaterial
          color="#A89CC8"
          emissive="#6B5FA8"
          emissiveIntensity={0.6}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner glow panel */}
      <mesh ref={glowRef} position={[0, 0, 0.03]}>
        <planeGeometry args={[1.9, 3.6]} />
        <meshStandardMaterial
          color="#D4C8FF"
          emissive="#C4B8F0"
          emissiveIntensity={1.2}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Point light emanating from door */}
      <pointLight color="#A89CC8" intensity={2} distance={15} decay={2} />
    </group>
  );
}