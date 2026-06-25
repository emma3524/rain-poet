import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DomainExpansionIntro from "./scenes/DomainExpansionIntro";
import LandingScene from "./scenes/LandingScene";
import Poem1Scene from "./scenes/Poem1Scene";
import Poem2Scene from "./scenes/Poem2Scene";
import ClosingScene from "./scenes/ClosingScene";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_Z_TRAVEL = 250;

function CameraRig({ scrollRef }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.fov = 60;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    if (scrollRef.current !== undefined) {
      const targetZ = 8 - scrollRef.current * TOTAL_Z_TRAVEL;
      camera.position.z += (targetZ - camera.position.z) * 0.06;
      camera.position.y += (Math.sin(scrollRef.current * Math.PI * 2) * 0.3 - camera.position.y) * 0.03;
    }
  });

  return null;
}

export default function App() {
  const scrollRef = useRef(0);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      scrollRef.current = scroller.scrollTop / max;
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#080810" }}>
      {/* 3D Canvas fixed behind */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas
          gl={{ antialias: true, alpha: false }}
          camera={{ fov: 60, near: 0.1, far: 500 }}
          style={{ background: "#080810" }}
        >
          <fog attach="fog" args={["#080810", 12, 80]} />
          <CameraRig scrollRef={scrollRef} />
          <DomainExpansionIntro />
          <LandingScene />
          <Poem1Scene />
          <Poem2Scene />
          <ClosingScene />
        </Canvas>
      </div>

      {/* Scrollable ghost div */}
      <div
        ref={scrollerRef}
        style={{
          position: "fixed",
          inset: 0,
          overflowY: "scroll",
          zIndex: 1,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div style={{ height: "800vh", pointerEvents: "none" }} />
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "#4A5568",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      >
        scroll
      </div>
    </div>
  );
}