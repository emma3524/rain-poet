import EnhancedPoemLine, { ANIMATION_STYLES } from "../components/EnhancedPoemLine";
import ParticleField from "../effects/ParticleField";
import GlowingDoor from "../effects/GlowingDoor";
import { poems } from "../data/poems";

const POEM = poems[1];
const LINE_SPACING = 2.6;
const START_Z = -90;

export default function Poem2Scene() {
  const nonEmptyLines = POEM.lines;
  const endZ = START_Z - nonEmptyLines.length * LINE_SPACING * 0.9;

  return (
    <group>
      <ParticleField count={320} color="#4A5568" spread={30} offsetZ={START_Z - 15} driftSpeed={0.001} />
      <ParticleField count={160} color="#7B8FA1" spread={20} offsetZ={START_Z - 35} driftSpeed={0.0008} />

      <pointLight color="#3A4A5E" intensity={0.3} position={[0, 4, START_Z - 5]} distance={25} />
      <pointLight color="#A89CC8" intensity={0.8} position={[0, 0, endZ - 10]} distance={40} />

      <EnhancedPoemLine
        text="II"
        position={[0, 1, START_Z - 1]}
        triggerZ={START_Z + 3}
        color="#4A5568"
        fontSize={0.14}
        animationStyle={ANIMATION_STYLES.SCATTER}
      />

      {nonEmptyLines.map((line, i) => {
        if (line === "") return null;
        const z = START_Z - 6 - i * LINE_SPACING * 0.88;
        // Different mix of styles for Poem 2
        const styles = [
          ANIMATION_STYLES.TYPEWRITER,
          ANIMATION_STYLES.SCATTER,
          ANIMATION_STYLES.WAVE,
          ANIMATION_STYLES.SPIRAL,
        ];
        const style = styles[i % styles.length];
        
        return (
          <EnhancedPoemLine
            key={i}
            text={line}
            position={[0, 0.1, z]}
            triggerZ={z + 4}
            color="#C8D8E8"
            fontSize={0.2}
            animationStyle={style}
          />
        );
      })}

      <GlowingDoor position={[0, 0.5, endZ - 18]} />

      <EnhancedPoemLine
        text="— The Darkness Was a Country"
        position={[0, -1.5, endZ - 2]}
        triggerZ={endZ + 2}
        color="#7B8FA1"
        fontSize={0.14}
        italic
        animationStyle={ANIMATION_STYLES.GLITCH}
      />
    </group>
  );
}