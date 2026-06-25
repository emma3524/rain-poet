import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Simplified anime character using geometric shapes
function AnimeCharacter({ visible }) {
  const groupRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const smileRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    
    // Subtle breathing animation
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    
    // Creepy blink
    const blinkCycle = (Math.sin(t * 2) + 1) * 0.5;
    const shouldBlink = blinkCycle > 0.95;
    if (eyeLeftRef.current && eyeRightRef.current) {
      eyeLeftRef.current.scale.y = shouldBlink ? 0.1 : 1;
      eyeRightRef.current.scale.y = shouldBlink ? 0.1 : 1;
    }

    // Smile grows wider
    if (smileRef.current) {
      smileRef.current.scale.x = 1 + Math.sin(t * 0.5) * 0.2;
    }

    // Fade in
    groupRef.current.traverse((child) => {
      if (child.material) {
        child.material.opacity = Math.min(1, visible ? t * 0.3 : 0);
      }
    });
  });

  return (
    <group ref={groupRef} position={[-3.5, 0.5, -2]}>
      {/* Head */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#FFE4C4" transparent />
      </mesh>

      {/* Hair - spiky anime style */}
      <group position={[0, 0.4, 0]}>
        <mesh position={[-0.2, 0.3, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.15, 0.5, 4]} />
          <meshStandardMaterial color="#1a1a1a" transparent />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[0.15, 0.6, 4]} />
          <meshStandardMaterial color="#1a1a1a" transparent />
        </mesh>
        <mesh position={[0.2, 0.3, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.15, 0.5, 4]} />
          <meshStandardMaterial color="#1a1a1a" transparent />
        </mesh>
      </group>

      {/* Eyes - menacing */}
      <mesh ref={eyeLeftRef} position={[-0.2, 0.1, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} transparent />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.2, 0.1, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} transparent />
      </mesh>

      {/* Smile - creepy wide */}
      <mesh ref={smileRef} position={[0, -0.15, 0.55]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.25, 0.03, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#000000" transparent />
      </mesh>

      {/* Body - simplified */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 0.8, 32]} />
        <meshStandardMaterial color="#2A2A2A" transparent />
      </mesh>

      {/* Arms - dramatic pose */}
      <mesh position={[-0.6, -0.7, 0]} rotation={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#FFE4C4" transparent />
      </mesh>
      <mesh position={[0.6, -0.7, 0]} rotation={[0, 0, 0.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#FFE4C4" transparent />
      </mesh>

      {/* Dramatic rim light */}
      <pointLight position={[2, 1, 1]} color="#8B00FF" intensity={2} distance={5} />
    </group>
  );
}

// Glitchy domain expansion text
function DomainExpansionText({ visible }) {
  const textRef = useRef();
  const glitchLinesRef = useRef();

  useFrame(({ clock }) => {
    if (!textRef.current) return;
    const t = clock.getElapsedTime();
    
    // Main text fade and glitch
    textRef.current.material.opacity = Math.min(0.95, visible ? (t - 1) * 0.4 : 0);
    
    // Glitch effect
    const glitchIntensity = Math.random() > 0.9 ? Math.random() * 0.1 : 0;
    textRef.current.position.x = Math.sin(t * 20) * glitchIntensity;
    textRef.current.position.y = 1.5 + Math.cos(t * 15) * glitchIntensity;

    // Color shift
    const hue = (t * 0.1) % 1;
    textRef.current.color.setHSL(hue, 0.8, 0.6);
  });

  return (
    <group>
      <Text
        ref={textRef}
        position={[0, 1.5, -2]}
        fontSize={0.35}
        color="#FF00FF"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
        material-transparent={true}
        material-opacity={0}
        letterSpacing={0.08}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        DOMAIN EXPANSION
      </Text>

      {/* Glitch lines effect */}
      <mesh position={[0, 1.5, -1.9]}>
        <planeGeometry args={[6, 0.4, 1, 20]} />
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.1}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

// Spiraling welcome text with individual letter control
function WelcomeText({ visible }) {
  const groupRef = useRef();
  const phrase = "Welcome to My Domain...";
  const letters = useMemo(() => phrase.split(""), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      if (!child.isGroup) return;
      
      const delay = i * 0.1;
      const age = Math.max(0, t - delay - 2);
      
      // Spiral in effect
      const radius = Math.max(0, 3 - age * 0.5);
      const angle = i * 0.3 + t * 2;
      child.position.x = Math.cos(angle) * radius;
      child.position.y = 0.3 + Math.sin(angle) * radius * 0.5;
      child.position.z = -2 - i * 0.05;
      
      // Rotation
      child.rotation.z = angle * 0.5;
      
      // Fade and scale
      const fade = Math.min(1, age * 0.8);
      child.traverse((mesh) => {
        if (mesh.material) {
          mesh.material.opacity = visible ? fade : 0;
        }
      });
      
      const scale = 0.5 + Math.min(0.5, age * 0.3);
      child.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {letters.map((letter, i) => (
        <group key={i}>
          <Text
            fontSize={0.25}
            color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF69B4" : "#00FFFF"}
            anchorX="center"
            anchorY="middle"
            material-transparent={true}
            material-opacity={0}
            letterSpacing={0.05}
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {letter}
          </Text>
        </group>
      ))}
    </group>
  );
}

// Energy particles
function EnergyField({ visible }) {
  const pointsRef = useRef();
  const particleCount = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    
    pointsRef.current.rotation.y = t * 0.1;
    pointsRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    
    // Pulsing effect
    const scale = 1 + Math.sin(t * 2) * 0.2;
    pointsRef.current.scale.setScalar(scale);
    
    // Fade
    pointsRef.current.material.opacity = visible ? Math.min(0.6, t * 0.2) : 0;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B00FF"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function DomainExpansionIntro() {
  const { camera } = useThree();
  const visible = camera.position.z > 6; // Show when at the start

  return (
    <group position={[0, 0, 0]}>
      {/* Dramatic lighting */}
      <pointLight position={[0, 3, -1]} color="#FF00FF" intensity={2} distance={10} />
      <pointLight position={[-5, 0, 0]} color="#00FFFF" intensity={1.5} distance={8} />
      <ambientLight intensity={0.2} color="#1A0033" />

      {/* Character */}
      <AnimeCharacter visible={visible} />

      {/* Domain Expansion text */}
      <DomainExpansionText visible={visible} />

      {/* Welcome message */}
      <WelcomeText visible={visible} />

      {/* Energy particles */}
      <EnergyField visible={visible} />

      {/* Dark domain sphere expanding */}
      <mesh position={[0, 0, -3]}>
        <sphereGeometry args={[8, 32, 32]} />
        <MeshDistortMaterial
          color="#0A0015"
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Purple energy rings */}
      <mesh position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8B00FF" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#FF00FF" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
