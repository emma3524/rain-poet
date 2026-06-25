import { Canvas } from "@react-three/fiber";

function TestBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function AppTest() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TestBox />
      </Canvas>
      <div style={{ position: "fixed", top: "20px", left: "20px", color: "white", zIndex: 999 }}>
        If you see this text and an orange cube, Three.js is working!
      </div>
    </div>
  );
}
