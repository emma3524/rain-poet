import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RainSystem({ count = 600, color = "#B8D4E8", speed = 0.04, spread = 20 }) {
  const mesh = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 + 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 5;
      vel[i] = speed + Math.random() * 0.03;
    }
    return [pos, vel];
  }, [count, spread, speed]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i];
      if (pos[i * 3 + 1] < -10) {
        pos[i * 3 + 1] = 12 + Math.random() * 4;
        pos[i * 3] = (Math.random() - 0.5) * spread;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}