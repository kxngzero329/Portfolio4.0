import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    mouse.current.x = pointer.x * viewport.width * 0.5;
    mouse.current.y = pointer.y * viewport.height * 0.5;
  });

  return mouse;
}

function Monitor({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.15, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.1, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Screen bezel */}
      <RoundedBox args={[3.2, 2.2, 0.12]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Screen surface */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[2.9, 1.9]} />
        <meshStandardMaterial color="#0a0f1a" emissive="#0a1628" emissiveIntensity={0.5} />
      </mesh>
      {/* Code lines on screen */}
      <CodeLines />
      {/* Stand neck */}
      <mesh position={[0, -1.35, -0.1]}>
        <boxGeometry args={[0.15, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -1.7, 0.1]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function CodeLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const codeColors = ["#00ffa0", "#a855f7", "#00d4ff", "#f59e0b", "#f472b6", "#6ee7b7"];
    return Array.from({ length: 12 }, (_, i) => {
      const indent = Math.random() > 0.6 ? 0.2 : Math.random() > 0.4 ? 0.4 : 0;
      const width = 0.4 + Math.random() * 1.4;
      const color = codeColors[Math.floor(Math.random() * codeColors.length)];
      const y = 0.72 - i * 0.135;
      return { indent, width, color, y, delay: i * 0.12 };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime;
      const line = lines[i];
      const pulse = 0.4 + Math.sin(t * 1.5 + line.delay * 3) * 0.15;
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: line.color,
        emissive: line.color,
        emissiveIntensity: pulse,
        transparent: true,
        opacity: 0.85,
      });
    });
  });

  return (
    <group ref={groupRef} position={[-1.2, 0, 0.08]}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.indent + line.width / 2, line.y, 0]}>
          <planeGeometry args={[line.width, 0.06]} />
          <meshStandardMaterial color={line.color} emissive={line.color} emissiveIntensity={0.4} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCube({ position, size, color, speed }: any) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.7;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function GlowOrbs({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => [
    { pos: [2.2, 1.2, -1] as [number, number, number], color: "#00ffa0", size: 0.12, speed: 1.2 },
    { pos: [-2, -1.5, 0.5] as [number, number, number], color: "#a855f7", size: 0.09, speed: 0.8 },
    { pos: [1.8, -1, 1] as [number, number, number], color: "#00d4ff", size: 0.07, speed: 1.5 },
    { pos: [-1.5, 1.8, -0.5] as [number, number, number], color: "#f59e0b", size: 0.06, speed: 1 },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.x = orb.pos[0] + Math.sin(t * orb.speed + i) * 0.4 + mouse.current.x * 0.08;
      child.position.y = orb.pos[1] + Math.cos(t * orb.speed * 0.7 + i) * 0.3 + mouse.current.y * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const mouse = useMousePosition();

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 5]} intensity={0.6} color="#00ffa0" />
      <pointLight position={[-3, -2, 3]} intensity={0.3} color="#a855f7" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Monitor mouse={mouse} />
      </Float>

      <GlowOrbs mouse={mouse} />

      <FloatingCube position={[-2.3, 1.3, -0.5]} size={0.35} color="#a855f7" speed={0.6} />
      <FloatingCube position={[2.4, -0.8, 0.3]} size={0.25} color="#00d4ff" speed={0.9} />
      <FloatingCube position={[-1.8, -1.6, 0.8]} size={0.2} color="#00ffa0" speed={0.7} />
    </>
  );
}

const CodeScene3D = () => {
  return (
    <div className="w-full h-[500px] lg:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default CodeScene3D;
