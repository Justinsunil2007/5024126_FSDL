import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

// ===== COMPONENT: AnimatedBox functional component =====
function AnimatedBox({ position }) {
  // ===== PROPS: position prop from parent (ThreeBackground) =====
  const meshRef = useRef();

  // ===== ANIMATION: useFrame hook for continuous animation =====
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ffff" emissive="#001122" />
    </mesh>
  );
}

// ===== COMPONENT: ThreeBackground functional component =====
function ThreeBackground() {
  // ===== 3D SCENE: Canvas renders Three.js scene =====
  return (
    <Canvas style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
      
      {/* Background stars */}
      <Stars radius={300} depth={60} count={8000} factor={6} saturation={0.5} fade />
      
      {/* COMPONENTS: Rendering multiple AnimatedBox components with different positions (PROPS) */}
      <AnimatedBox position={[-3, 1, -2]} />
      <AnimatedBox position={[3, -1, -1]} />
      <AnimatedBox position={[0, 2, -3]} />
      <AnimatedBox position={[-2, -2, -4]} />
      
      {/* Camera controls */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

export default ThreeBackground;