import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import RainSystem from "../effects/RainSystem";

export default function LandingScene() {
  const titleRef = useRef();
  const subtitleRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (titleRef.current) {
      titleRef.current.material.opacity = Math.min(1, t * 0.3);
    }
    if (subtitleRef.current) {
      subtitleRef.current.material.opacity = Math.min(0.5, (t - 2) * 0.2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <RainSystem count={700} color="#B8D4E8" speed={0.038} spread={24} />

      <pointLight color="#1A1A3E" intensity={0.5} position={[0, 5, 0]} />
      <ambientLight intensity={0.15} color="#0A0A20" />

      {/* Title */}
      <Text
        ref={titleRef}
        position={[0, 0.6, -3]}
        fontSize={0.62}
        color="#E8E4DC"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
        material-transparent={true}
        material-opacity={0}
        letterSpacing={0.05}
      >
        The Boy Who Writes Rain
      </Text>

      {/* Subtitle */}
      <Text
        ref={subtitleRef}
        position={[0, -0.4, -3]}
        fontSize={0.18}
        color="#7B8FA1"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
        material-transparent={true}
        material-opacity={0}
        letterSpacing={0.15}
      >
        scroll to read
      </Text>

      {/* Thin horizon line */}
      <mesh position={[0, -1.2, -3]}>
        <planeGeometry args={[6, 0.003]} />
        <meshBasicMaterial color="#2A2A4A" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}