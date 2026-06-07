import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color, speed = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef();
  const count = 1200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const brightness = 0.4 + Math.random() * 0.6;
      col[i * 3] = brightness * 0.7;
      col[i * 3 + 1] = brightness * 0.5;
      col[i * 3 + 2] = brightness;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Scene({ mouse }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.08,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.05,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      <Stars radius={80} depth={60} count={2000} factor={2.5} saturation={0.4} fade speed={0.4} />
      <ParticleField />
      <FloatingGeometry
        position={[-12, 4, -8]}
        geometry={<icosahedronGeometry args={[2.5, 1]} />}
        color="#a78bfa"
        speed={0.8}
      />
      <FloatingGeometry
        position={[14, -3, -12]}
        geometry={<octahedronGeometry args={[2, 0]} />}
        color="#f472b6"
        speed={1.2}
      />
      <FloatingGeometry
        position={[8, 6, -15]}
        geometry={<torusGeometry args={[2, 0.4, 8, 24]} />}
        color="#38bdf8"
        speed={0.6}
      />
      <FloatingGeometry
        position={[-10, -5, -10]}
        geometry={<dodecahedronGeometry args={[1.8, 0]} />}
        color="#34d399"
        speed={1}
      />
      <FloatingGeometry
        position={[0, 8, -20]}
        geometry={<torusKnotGeometry args={[1.2, 0.3, 64, 8]} />}
        color="#fb923c"
        speed={0.5}
      />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#a78bfa" />
    </group>
  );
}

export default function ThreeBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="three-bg">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 30, 90]} />
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
