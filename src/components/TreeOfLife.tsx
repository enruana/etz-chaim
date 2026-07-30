"use client";

import { useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Escena inspirada en el aire de Bluey: luz dorada, sombra violeta, formas chunky.
// Determinista (sin Math.random) para que el árbol sea siempre el mismo.

function rnd(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const LEAF_COLORS = ["#9bc489", "#7fa08c", "#b5d1a0", "#86c9aa"];

function Foliage({ leaves }: { leaves: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const n = Math.min(24 + leaves, 500);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const color = new THREE.Color();
    for (let i = 0; i < n; i++) {
      // espiral de ángulo áureo sobre una copa esférica achatada
      const t = i / n;
      const ang = i * 2.399963;
      const rad = 1.35 * Math.sqrt(t) * (0.8 + 0.4 * rnd(i, 1));
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      const y = 2.15 + 0.95 * (1 - t) * (0.4 + 0.6 * rnd(i, 2)) + 0.35 * Math.sin(ang * 2);
      const s = 0.16 + 0.2 * rnd(i, 3);
      m.makeScale(s, s * 0.85, s);
      m.setPosition(x, y, z);
      mesh.setMatrixAt(i, m);
      color.set(LEAF_COLORS[i % LEAF_COLORS.length]);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [n]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, n]} key={n}>
      <sphereGeometry args={[1, 12, 10]} />
      <meshStandardMaterial roughness={0.9} />
    </instancedMesh>
  );
}

function Fruits({ count }: { count: number }) {
  const n = Math.min(count, 66);
  const items = Array.from({ length: n }, (_, i) => {
    const ang = i * 2.399963 + 0.7;
    const rad = 0.5 + 0.85 * rnd(i, 5);
    return {
      x: Math.cos(ang) * rad,
      y: 1.9 + 0.9 * rnd(i, 6),
      z: Math.sin(ang) * rad,
    };
  });
  return (
    <group>
      {items.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshStandardMaterial color="#e2a94f" emissive="#e2a94f" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Tree({ capitulos, libros }: { capitulos: number; libros: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={group} position={[0, -1.3, 0]}>
      {/* tronco */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.16, 0.32, 2.1, 10]} />
        <meshStandardMaterial color="#8a6a4a" roughness={0.95} />
      </mesh>
      {/* ramas chunky */}
      {[0.6, 2.2, 3.9].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.45, 1.85, Math.sin(a) * 0.45]} rotation={[Math.sin(a) * 0.6, 0, Math.cos(a) * 0.6]}>
          <cylinderGeometry args={[0.06, 0.11, 0.9, 8]} />
          <meshStandardMaterial color="#8a6a4a" roughness={0.95} />
        </mesh>
      ))}
      <Foliage leaves={capitulos} />
      <Fruits count={libros} />
      {/* loma */}
      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry args={[2.6, 24, 16]} />
        <meshStandardMaterial color="#9bc489" roughness={1} />
      </mesh>
    </group>
  );
}

export default function TreeOfLife({ capitulos, libros }: { capitulos: number; libros: number }) {
  return (
    <div style={{ height: 300, background: "linear-gradient(180deg, #bfe0fb 0%, #eaf4fd 70%, #fdf3ce 100%)" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.1, 6.2], fov: 42 }}>
        <ambientLight intensity={0.85} color="#fff4dc" />
        <directionalLight position={[4, 6, 3]} intensity={1.4} color="#ffe3a3" />
        <directionalLight position={[-5, 2, -4]} intensity={0.5} color="#a7a2d6" />
        <Tree capitulos={capitulos} libros={libros} />
      </Canvas>
    </div>
  );
}
