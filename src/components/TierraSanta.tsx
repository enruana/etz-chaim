"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Diorama de la Tierra Santa al estilo «isla de juguete»: mar plano azul,
// tierra chunky con biseles, lago de Galilea, río Jordán, Mar Muerto,
// y pines flotantes con las historias. Paleta Mañana en Brisbane.

export type Pin = { id: string; nombre: string; pos: [number, number]; estudiado: boolean };

const SAND = "#ecd9a8";
const SAND_DARK = "#dcc48d";
const GREEN = "#9bc489";
const WATER = "#7cc4f5";
const WATER_DEEP = "#5fb4f5";

// Contorno de la costa (x, norte+). En el mundo: z = -norte.
const COSTA: [number, number][] = [
  [-1.2, -4.0], [-1.6, -2.5], [-1.7, -1.0], [-1.5, 0.0], [-1.6, 1.2],
  [-1.3, 2.2], [-0.8, 3.2], [0.2, 3.6], [1.6, 3.4], [1.9, 2.0],
  [1.8, 0.5], [1.7, -1.0], [1.5, -2.5], [0.5, -3.8],
];

function Land() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    COSTA.forEach(([x, n], i) => (i === 0 ? shape.moveTo(x, n) : shape.lineTo(x, n)));
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.34,
      bevelEnabled: true,
      bevelSize: 0.09,
      bevelThickness: 0.08,
      bevelSegments: 2,
    });
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  return (
    <mesh geometry={geo} position={[0, 0.02, 0]}>
      <meshStandardMaterial color={SAND} roughness={0.95} />
    </mesh>
  );
}

function Hill({ x, z, r, h, color }: { x: number; z: number; r: number; h: number; color: string }) {
  return (
    <mesh position={[x, 0.36, z]}>
      <cylinderGeometry args={[r * 0.72, r, h, 9]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}

function Agua({ x, z, sx, sz, deep = false }: { x: number; z: number; sx: number; sz: number; deep?: boolean }) {
  return (
    <mesh position={[x, 0.45, z]} scale={[sx, 1, sz]}>
      <cylinderGeometry args={[1, 1, 0.06, 24]} />
      <meshStandardMaterial color={deep ? WATER_DEEP : WATER} roughness={0.35} />
    </mesh>
  );
}

function Rio() {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.95, 0.46, -1.85),
      new THREE.Vector3(1.05, 0.46, -1.1),
      new THREE.Vector3(0.98, 0.46, -0.3),
      new THREE.Vector3(1.12, 0.46, 0.5),
      new THREE.Vector3(1.22, 0.46, 0.95),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.05, 8, false);
  }, []);
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color={WATER_DEEP} roughness={0.35} />
    </mesh>
  );
}

function Arbol({ x, z, s = 1, palma = false }: { x: number; z: number; s?: number; palma?: boolean }) {
  return (
    <group position={[x, 0.42, z]} scale={s}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.2, 6]} />
        <meshStandardMaterial color="#8a6a4a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        {palma ? <coneGeometry args={[0.12, 0.12, 7]} /> : <sphereGeometry args={[0.11, 8, 7]} />}
        <meshStandardMaterial color={palma ? "#7fa08c" : GREEN} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Casitas({ x, z, n = 3 }: { x: number; z: number; n?: number }) {
  return (
    <group position={[x, 0.42, z]}>
      {Array.from({ length: n }, (_, i) => (
        <mesh key={i} position={[(i % 2) * 0.14 - 0.07, 0.05, Math.floor(i / 2) * 0.14 - 0.05]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#fff6e8" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Jerusalen({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0.6, z]}>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.34, 0.12, 0.34]} />
        <meshStandardMaterial color="#f5ead6" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.16]} />
        <meshStandardMaterial color="#fffdfa" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial color="#e2a94f" emissive="#e2a94f" emissiveIntensity={0.25} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Barca({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0.5, z]}>
      <mesh>
        <boxGeometry args={[0.16, 0.04, 0.07]} />
        <meshStandardMaterial color="#8a6a4a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 5]} />
        <meshStandardMaterial color="#6e523a" />
      </mesh>
    </group>
  );
}

function PinMesh({ pin, index, onSelect }: { pin: Pin; index: number; onSelect: (id: string) => void }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = 0.95 + Math.sin(clock.elapsedTime * 1.6 + index) * 0.06;
  });
  const color = pin.estudiado ? "#e2a94f" : "#5fb4f5";
  return (
    <group position={[pin.pos[0], 0.95, pin.pos[1]]}>
      <group ref={ref} position={[0, 0, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pin.id);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <sphereGeometry args={[0.11, 14, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <coneGeometry args={[0.05, 0.14, 8]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      </group>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.14, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function TierraSanta({ pins, onSelect }: { pins: Pin[]; onSelect: (id: string) => void }) {
  return (
    <div style={{ height: 420, background: "linear-gradient(180deg, #bfe0fb, #d8ebfa)", touchAction: "none" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 6.8, 6.4], fov: 40 }}>
        <ambientLight intensity={0.85} color="#fff4dc" />
        <directionalLight position={[5, 8, 3]} intensity={1.5} color="#ffe3a3" />
        <directionalLight position={[-6, 3, -5]} intensity={0.45} color="#a7a2d6" />

        {/* Mediterráneo */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color={WATER} roughness={0.4} />
        </mesh>

        <Land />
        {/* colinas de Judea y Galilea */}
        <Hill x={0.55} z={1.25} r={0.55} h={0.28} color={SAND_DARK} />
        <Hill x={0.15} z={-2.1} r={0.5} h={0.22} color={GREEN} />
        <Hill x={-0.5} z={-2.8} r={0.4} h={0.18} color={GREEN} />
        {/* aguas */}
        <Agua x={0.95} z={-2.25} sx={0.42} sz={0.5} />
        <Agua x={1.25} z={1.35} sx={0.28} sz={0.62} deep />
        <Rio />
        {/* vegetación: Galilea frondosa, palmas hacia el Jordán */}
        <Arbol x={-0.2} z={-2.5} /> <Arbol x={0.35} z={-2.55} s={0.9} /> <Arbol x={-0.6} z={-2.2} s={1.1} />
        <Arbol x={0.0} z={-1.7} s={0.8} /> <Arbol x={-1.0} z={-1.5} s={0.9} /> <Arbol x={-0.9} z={0.4} s={0.8} />
        <Arbol x={1.05} z={0.2} palma s={0.9} /> <Arbol x={0.9} z={-0.9} palma /> <Arbol x={-1.1} z={2.2} palma s={0.8} />
        {/* rocas del desierto */}
        <mesh position={[1.0, 0.45, 0.8]}>
          <dodecahedronGeometry args={[0.09]} />
          <meshStandardMaterial color={SAND_DARK} roughness={1} />
        </mesh>
        <mesh position={[0.85, 0.44, 1.05]}>
          <dodecahedronGeometry args={[0.06]} />
          <meshStandardMaterial color={SAND_DARK} roughness={1} />
        </mesh>
        {/* lugares construidos */}
        <Jerusalen x={0.68} z={1.3} />
        <Casitas x={0.62} z={-2.62} />
        <Casitas x={0.18} z={-1.95} n={2} />
        <Casitas x={0.52} z={1.72} n={2} />
        <Barca x={1.0} z={-2.2} />

        {pins.map((p, i) => (
          <PinMesh key={p.id} pin={p} index={i} onSelect={onSelect} />
        ))}

        <OrbitControls
          enablePan={false}
          minDistance={4.5}
          maxDistance={11}
          maxPolarAngle={1.35}
          minPolarAngle={0.35}
          target={[0, 0.3, -0.4]}
        />
      </Canvas>
    </div>
  );
}
