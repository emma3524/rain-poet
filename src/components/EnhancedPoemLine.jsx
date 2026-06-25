import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Different animation styles for text
const ANIMATION_STYLES = {
  GLITCH: "glitch",
  SPIRAL: "spiral",
  EXPLODE: "explode",
  WAVE: "wave",
  TYPEWRITER: "typewriter",
  SCATTER: "scatter",
};

export default function EnhancedPoemLine({
  text,
  position,
  color = "#E8E0D0",
  triggerZ,
  fontSize = 0.22,
  italic = false,
  animationStyle = ANIMATION_STYLES.GLITCH, // Default to glitch
}) {
  const groupRef = useRef();
  const { camera } = useThree();
  const letters = useMemo(() => text.split(""), [text]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const camZ = camera.position.z;
    const dist = Math.abs(camZ - triggerZ);
    const fade = Math.max(0, Math.min(1, 1 - (dist - 1) / 6));
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      if (!child.isGroup) return;

      let x = (i - letters.length / 2) * fontSize * 0.6;
      let y = position[1];
      let z = position[2];
      let rotation = 0;
      let scale = 1;
      let opacity = fade;

      switch (animationStyle) {
        case ANIMATION_STYLES.GLITCH:
          // Random glitch displacement
          if (Math.random() > 0.95) {
            x += (Math.random() - 0.5) * 0.3;
            y += (Math.random() - 0.5) * 0.3;
          }
          // Color shift on glitch
          if (fade > 0 && Math.random() > 0.98) {
            child.children[0].color.setRGB(
              Math.random(),
              Math.random(),
              Math.random()
            );
          } else {
            child.children[0].color.set(color);
          }
          y += (1 - fade) * 0.3;
          break;

        case ANIMATION_STYLES.SPIRAL:
          // Letters spiral in
          const spiralRadius = (1 - fade) * 3;
          const spiralAngle = i * 0.3 + t * 2 - fade * 10;
          x += Math.cos(spiralAngle) * spiralRadius;
          y += Math.sin(spiralAngle) * spiralRadius * 0.5 + position[1];
          rotation = spiralAngle;
          scale = fade;
          break;

        case ANIMATION_STYLES.EXPLODE:
          // Letters explode inward
          const explosionForce = (1 - fade) * 2;
          const angle = (i / letters.length) * Math.PI * 2;
          x += Math.cos(angle) * explosionForce;
          y += Math.sin(angle) * explosionForce + position[1];
          rotation = (1 - fade) * Math.PI * 2;
          scale = 0.5 + fade * 0.5;
          break;

        case ANIMATION_STYLES.WAVE:
          // Wavy motion
          const waveOffset = i * 0.5;
          y += Math.sin(t * 2 + waveOffset) * 0.2 * fade + position[1];
          x += Math.cos(t * 1.5 + waveOffset) * 0.1;
          scale = 1 + Math.sin(t * 3 + waveOffset) * 0.1;
          break;

        case ANIMATION_STYLES.TYPEWRITER:
          // Typewriter effect
          const letterDelay = i * 0.1;
          const letterAge = Math.max(0, fade - (1 - i / letters.length));
          opacity = Math.min(fade, letterAge * 5);
          y += position[1] + (1 - opacity) * 0.5;
          scale = 0.8 + opacity * 0.2;
          break;

        case ANIMATION_STYLES.SCATTER:
          // Letters scatter from random positions
          const scatterX = Math.sin(i * 123.456) * 5;
          const scatterY = Math.cos(i * 789.012) * 5;
          x += scatterX * (1 - fade);
          y += scatterY * (1 - fade) + position[1];
          rotation = (1 - fade) * Math.PI * 4;
          break;

        default:
          y += position[1] + (1 - fade) * 0.3;
      }

      child.position.set(x, y, z);
      child.rotation.z = rotation;
      child.scale.setScalar(scale);
      
      child.children[0].material.opacity = opacity;
    });
  });

  if (!text || text === "") return null;

  return (
    <group ref={groupRef}>
      {letters.map((letter, i) => (
        <group key={i}>
          <Text
            fontSize={fontSize}
            color={color}
            fontStyle={italic ? "italic" : "normal"}
            anchorX="center"
            anchorY="middle"
            material-transparent={true}
            material-opacity={0}
            material-depthWrite={false}
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            {letter}
          </Text>
        </group>
      ))}
    </group>
  );
}

export { ANIMATION_STYLES };
