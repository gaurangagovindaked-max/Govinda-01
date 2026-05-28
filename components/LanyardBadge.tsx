import * as THREE from "three";
import { useRef, useState, createRef } from "react";
import { Canvas, useFrame, useThree, extend as r3fExtend } from "@react-three/fiber";
import { useTexture, Text, Environment, RoundedBox } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  useSphericalJoint,
  CuboidCollider,
  BallCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// Register meshline with R3F
r3fExtend({ MeshLineGeometry, MeshLineMaterial });

// Declare JSX intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

const SEGMENT_LENGTH = 0.13;
const SEGMENTS = 14;
const CARD_W = 2.0;
const CARD_H = 2.8;
const CARD_D = 0.05;

// ─── Chain Segment with Joint ─────────────────────────────────
function ChainLink({
  parentRef,
  selfRef,
  pos,
}: {
  parentRef: React.RefObject<RapierRigidBody>;
  selfRef: React.RefObject<RapierRigidBody>;
  pos: [number, number, number];
}) {
  useSphericalJoint(parentRef, selfRef, [
    [0, -SEGMENT_LENGTH / 2, 0],
    [0, SEGMENT_LENGTH / 2, 0],
  ]);

  return (
    <RigidBody
      ref={selfRef}
      position={pos}
      angularDamping={10}
      linearDamping={6}
      type="dynamic"
      canSleep={false}
    >
      <BallCollider args={[0.035]} />
    </RigidBody>
  );
}

// ─── Rope Visual ──────────────────────────────────────────────
function RopeVisual({ refs }: { refs: React.RefObject<RapierRigidBody>[] }) {
  const lineGeoRef = useRef<any>(null);

  useFrame(() => {
    if (!lineGeoRef.current) return;
    const pts: number[] = [];
    for (const r of refs) {
      if (r.current) {
        const t = r.current.translation();
        pts.push(t.x, t.y, t.z);
      }
    }
    if (pts.length >= 6) {
      // Build smooth curve
      const vecs: THREE.Vector3[] = [];
      for (let i = 0; i < pts.length; i += 3) {
        vecs.push(new THREE.Vector3(pts[i], pts[i + 1], pts[i + 2]));
      }
      const curve = new THREE.CatmullRomCurve3(vecs);
      const smooth = curve.getPoints(60);
      lineGeoRef.current.setPoints(
        smooth.flatMap((p: THREE.Vector3) => [p.x, p.y, p.z])
      );
    }
  });

  return (
    <mesh>
      <meshLineGeometry ref={lineGeoRef} />
      <meshLineMaterial
        color="#1a1a1a"
        lineWidth={0.1}
        resolution={new THREE.Vector2(window.innerWidth, window.innerHeight)}
      />
    </mesh>
  );
}

// ─── The Badge Card ───────────────────────────────────────────
function Badge({
  parentRef,
}: {
  parentRef: React.RefObject<RapierRigidBody>;
}) {
  const ref = useRef<RapierRigidBody>(null!);
  const [dragging, setDragging] = useState(false);
  const { viewport, pointer } = useThree();

  const photoTex = useTexture("/assets/Gemini_Generated_Image_.png");

  useSphericalJoint(parentRef, ref, [
    [0, -SEGMENT_LENGTH / 2, 0],
    [0, CARD_H / 2 + 0.12, 0],
  ]);

  useFrame(() => {
    if (dragging && ref.current) {
      ref.current.setNextKinematicTranslation({
        x: pointer.x * viewport.width * 0.5,
        y: pointer.y * viewport.height * 0.5,
        z: 0,
      });
    }
  });

  return (
    <RigidBody
      ref={ref}
      type={dragging ? "kinematicPosition" : "dynamic"}
      angularDamping={14}
      linearDamping={10}
      canSleep={false}
      colliders={false}
      position={[0, 2.5 - SEGMENTS * SEGMENT_LENGTH - CARD_H / 2 - 0.2, 0]}
    >
      <CuboidCollider args={[CARD_W / 2, CARD_H / 2, CARD_D / 2]} />
      <group
        onPointerDown={(e) => {
          e.stopPropagation();
          (e.target as any).setPointerCapture?.(e.pointerId);
          setDragging(true);
        }}
        onPointerUp={() => setDragging(false)}
      >
        {/* Card body */}
        <RoundedBox
          args={[CARD_W, CARD_H, CARD_D]}
          radius={0.12}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.0}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>

        {/* Photo */}
        <mesh position={[0, 0.3, CARD_D / 2 + 0.002]}>
          <planeGeometry args={[CARD_W - 0.28, CARD_H * 0.55]} />
          <meshStandardMaterial map={photoTex} toneMapped={false} />
        </mesh>

        {/* Name: Govinda */}
        <Text
          position={[
            -CARD_W / 2 + 0.2,
            -CARD_H / 2 + 0.65,
            CARD_D / 2 + 0.004,
          ]}
          fontSize={0.2}
          fontWeight={700}
          color="#111111"
          anchorX="left"
          anchorY="middle"
        >
          Govinda
        </Text>
        {/* Name: Chauhan */}
        <Text
          position={[
            -CARD_W / 2 + 0.2,
            -CARD_H / 2 + 0.4,
            CARD_D / 2 + 0.004,
          ]}
          fontSize={0.2}
          fontWeight={700}
          color="#111111"
          anchorX="left"
          anchorY="middle"
        >
          Chauhan
        </Text>

        {/* Role */}
        <Text
          position={[
            -CARD_W / 2 + 0.2,
            -CARD_H / 2 + 0.15,
            CARD_D / 2 + 0.004,
          ]}
          fontSize={0.1}
          color="#888888"
          anchorX="left"
          anchorY="middle"
        >
          Software Engineer
        </Text>

        {/* ID */}
        <Text
          position={[
            CARD_W / 2 - 0.15,
            -CARD_H / 2 + 0.15,
            CARD_D / 2 + 0.004,
          ]}
          fontSize={0.08}
          color="#aaaaaa"
          anchorX="right"
          anchorY="middle"
        >
          ID: GC2026
        </Text>

        {/* Metallic clip at top of card */}
        <mesh position={[0, CARD_H / 2 + 0.06, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, CARD_H / 2 + 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.07, 0.015, 8, 20, Math.PI]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}

// ─── Scene ────────────────────────────────────────────────────
function Scene() {
  const anchorRef = useRef<RapierRigidBody>(null!);

  // Create stable refs for segments
  const segRefs = useRef<React.RefObject<RapierRigidBody>[]>(
    Array.from({ length: SEGMENTS }, () => createRef<RapierRigidBody>())
  );

  // All refs for rope rendering
  const allRefs = [anchorRef, ...segRefs.current];

  return (
    <>
      {/* Fixed anchor */}
      <RigidBody ref={anchorRef} type="fixed" position={[0, 2.5, 0]}>
        <BallCollider args={[0.04]} />
        {/* Leather strap at very top */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.25, 0.7, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </mesh>
      </RigidBody>

      {/* Chain links */}
      {segRefs.current.map((selfRef, i) => (
        <ChainLink
          key={i}
          parentRef={i === 0 ? anchorRef : segRefs.current[i - 1]}
          selfRef={selfRef}
          pos={[0, 2.5 - (i + 1) * SEGMENT_LENGTH, 0]}
        />
      ))}

      {/* Rope rendering */}
      <RopeVisual refs={allRefs} />

      {/* Badge card */}
      <Badge parentRef={segRefs.current[SEGMENTS - 1]} />
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────
export default function LanyardBadge() {
  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        background: "linear-gradient(180deg, #e8e8e8 0%, #d4d4d4 100%)",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "grab",
        position: "relative",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 30 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#e0e0e0"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-3, 3, 2]} intensity={0.4} />
        <spotLight
          position={[0, 5, 3]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Environment preset="studio" />

        <Physics gravity={[0, -9.81, 0]}>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  );
}
