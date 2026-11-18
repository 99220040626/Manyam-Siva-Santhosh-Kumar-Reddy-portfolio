"use client";
import { useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import type { Group } from "three";

function Rig({ children }: { children: ReactNode }) {
  const g = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!g.current) return;
    g.current.rotation.y += (pointer.x * 0.7 - g.current.rotation.y) * 0.05;
    g.current.rotation.x += (-pointer.y * 0.5 - g.current.rotation.x) * 0.05;
  });
  return <group ref={g}>{children}</group>;
}

export default function Orb3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]} aria-hidden>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={2.2} />
      <pointLight position={[-3, -2, 2]} color="#22d3ee" intensity={20} />
      <Stars radius={50} depth={40} count={1200} factor={3} fade speed={1} />
      <Rig>
        <Float speed={2} floatIntensity={1.4}>
          <Sphere args={[1.2, 96, 96]}><MeshDistortMaterial color="#7c5cff" distort={0.45} speed={2} roughness={0.15} metalness={0.8} /></Sphere>
        </Float>
      </Rig>
    </Canvas>
  );
}
