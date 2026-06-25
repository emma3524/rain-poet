import EnhancedPoemLine, { ANIMATION_STYLES } from "../components/EnhancedPoemLine";
import ParticleField from "../effects/ParticleField";
import { poems } from "../data/poems";

const POEM = poems[0];
const LINE_SPACING = 2.8;
const START_Z = -12;

export default function Poem1Scene() {
  const nonEmptyLines = POEM.lines;

  return (
    <group>
      <ParticleField count={280} color="#C9934A" spread={28} offsetZ={START_Z - 20} driftSpeed={0.002} />
      <ParticleField count={120} color="#D4A855" spread={16} offsetZ={START_Z - 40} driftSpeed={0.0015} />

      <pointLight color="#C9934A" intensity={0.4} position={[0, 3, START_Z - 10]} distance={30} />
      <pointLight color="#8B5E2A" intensity={0.2} position={[4, -2, START_Z - 25]} distance={20} />

      {nonEmptyLines.map((line, i) => {
        if (line === "") return null;
        const z = START_Z - i * LINE_SPACING * 0.9;
        // Cycle through different animation styles for variety
        const styles = [
          ANIMATION_STYLES.GLITCH,
          ANIMATION_STYLES.SPIRAL,
          ANIMATION_STYLES.WAVE,
          ANIMATION_STYLES.EXPLODE,
        ];
        const style = styles[i % styles.length];
        
        return (
          <EnhancedPoemLine
            key={i}
            text={line}
            position={[0, 0.2, z]}
            triggerZ={z + 4}
            color="#E8D5B0"
            fontSize={0.21}
            animationStyle={style}
          />
        );
      })}

      <EnhancedPoemLine
        text="— Someone"
        position={[0, -1.2, START_Z - nonEmptyLines.length * LINE_SPACING * 0.9 + 2]}
        triggerZ={START_Z - nonEmptyLines.length * LINE_SPACING * 0.9 + 6}
        color="#C9934A"
        fontSize={0.16}
        italic
        animationStyle={ANIMATION_STYLES.TYPEWRITER}
      />
    </group>
  );
}