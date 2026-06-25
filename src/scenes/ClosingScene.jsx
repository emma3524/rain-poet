import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ParticleField from "../effects/ParticleField";

const CLOSE_Z = -240;

export default function ClosingScene() {
  const textRef = useRef();

  useFrame(({ camera }) => {
    if (!textRef.current) return;
    const dist = Math.abs(camera.position.z - CLOSE_Z);
    const fade = Math.max(0, Math.min(1, 1 - (dist - 2) / 10));
    textRef.current.material.opacity = fade * 0.55;
  });

  return (
    <group position={[0, 0, CLOSE_Z]}>
      <ParticleField count={200} color="#A89CC8" spread={24} offsetZ={0} driftSpeed={0.001} />
      <ParticleField count={100} color="#C9934A" spread={14} offsetZ={0} driftSpeed={0.0012} />

      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={0.2}
        color="#A89CC8"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        textAlign="center"
        material-transparent={true}
        material-opacity={0}
        letterSpacing={0.1}
      >
        the boy who writes rain
      </Text>
    </group>
  );
}