import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles({ count = 2000, scrollY = 0 }) {
  const ref = useRef(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      const greenVariation = 0.3 + Math.random() * 0.4;
      colors[i * 3] = 0.1 + Math.random() * 0.2;
      colors[i * 3 + 1] = greenVariation;
      colors[i * 3 + 2] = 0.1 + Math.random() * 0.3;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = time * 0.02 + scrollY * 0.001;
      ref.current.rotation.x = Math.sin(time * 0.01) * 0.1 + scrollY * 0.0005;
      ref.current.position.y = Math.sin(time * 0.2) * 0.5 - scrollY * 0.002;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingLeaves({ count = 50, scrollY = 0 }) {
  const ref = useRef(null);
  
  const leaves = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }
    
    return { positions, speeds };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.z = Math.sin(time * 0.05) * 0.1;
      ref.current.position.y = -scrollY * 0.003 + Math.sin(time * 0.3) * 0.5;
    }
  });

  return (
    <Points ref={ref} positions={leaves.positions} stride={3}>
      <PointMaterial
        transparent
        color="#4ade80"
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

function GlowingOrbs({ scrollY = 0 }) {
  const group = useRef(null);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      group.current.rotation.y = time * 0.03;
      group.current.position.y = -scrollY * 0.002;
    }
  });

  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 8,
        Math.sin((i / 4) * Math.PI) * 3,
        Math.sin((i / 8) * Math.PI * 2) * 8,
      ],
      scale: 0.3 + Math.random() * 0.4,
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleField({ scrollY = 0 }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <FloatingParticles scrollY={scrollY} />
        <FloatingLeaves scrollY={scrollY} />
        <GlowingOrbs scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
