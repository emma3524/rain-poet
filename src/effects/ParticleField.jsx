import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({
  count = 300,
  color = "#C9934A",
  spread = 30,
  offsetZ = 0,
  driftSpeed = 0.003,
}) {
  const mesh = useRef();

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = offsetZ + (Math.random() - 0.5) * 20;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [count, spread, offsetZ]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += Math.sin(t * driftSpeed * 60 + phases[i]) * 0.002;
      pos[i * 3 + 1] += Math.cos(t * driftSpeed * 40 + phases[i]) * 0.0015;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.06}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}