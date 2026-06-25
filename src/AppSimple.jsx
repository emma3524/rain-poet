// Fallback version without heavy 3D effects
import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

function SimplePoemLine({ text, position, visible }) {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = visible ? Math.min(1, clock.getElapsedTime() * 0.3) : 0;
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.3}
      color="#FFFFFF"
      anchorX="center"
      anchorY="middle"
      material-transparent={true}
      material-opacity={0}
    >
      {text}
    </Text>
  );
}

function SimpleScene() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 5]} intensity={1} />
      
      <SimplePoemLine 
        text="Domain Expansion" 
        position={[0, 1, -3]} 
        visible={true}
      />
      <SimplePoemLine 
        text="Welcome to My Domain..." 
        position={[0, 0, -3]} 
        visible={true}
      />
      <SimplePoemLine 
        text="(Simplified Version)" 
        position={[0, -0.5, -3]} 
        visible={true}
      />
    </group>
  );
}

export default function AppSimple() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#080810" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <SimpleScene />
      </Canvas>
      <div style={{ 
        position: "fixed", 
        top: "20px", 
        left: "20px", 
        color: "white", 
        fontSize: "14px",
        zIndex: 999,
        background: "rgba(0,0,0,0.7)",
        padding: "10px"
      }}>
        <div>✅ Three.js is working!</div>
        <div>📝 This is a simplified version</div>
        <div>🔧 Check browser console for errors</div>
      </div>
    </div>
  );
}
