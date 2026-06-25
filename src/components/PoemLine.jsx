import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function PoemLine({
  text,
  position,
  color = "#E8E0D0",
  triggerZ,
  fontSize = 0.22,
  italic = false,
}) {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    const camZ = camera.position.z;
    const dist = Math.abs(camZ - triggerZ);
    const fade = Math.max(0, Math.min(1, 1 - (dist - 1) / 6));
    ref.current.material.opacity = fade;
    ref.current.position.y = position[1] + (1 - fade) * 0.3;
  });

  if (!text || text === "") return null;

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize}
      color={color}
      fontStyle={italic ? "italic" : "normal"}
      anchorX="center"
      anchorY="middle"
      maxWidth={12}
      textAlign="center"
      material-transparent={true}
      material-opacity={0}
      material-depthWrite={false}
    >
      {text}
    </Text>
  );
}