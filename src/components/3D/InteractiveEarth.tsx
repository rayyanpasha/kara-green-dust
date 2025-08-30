import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Html, useTexture, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveEarthProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

const InteractiveEarth = ({ scrollProgress, mouseX, mouseY }: InteractiveEarthProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  
  // Create dynamic material colors based on scroll progress
  const earthColor = useMemo(() => {
    // Transition from dusty brown to vibrant green based on scroll
    const dustyColor = new THREE.Color('#8B4513'); // Dusty brown
    const greenColor = new THREE.Color('#22c55e'); // Vibrant green
    return dustyColor.lerp(greenColor, Math.min(scrollProgress * 2, 1));
  }, [scrollProgress]);

  const atmosphereColor = useMemo(() => {
    const pollutedColor = new THREE.Color('#fbbf24'); // Amber/yellow pollution
    const cleanColor = new THREE.Color('#3b82f6'); // Clean blue
    return pollutedColor.lerp(cleanColor, Math.min(scrollProgress * 2, 1));
  }, [scrollProgress]);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.003;
      
      // Mouse interaction
      const targetX = (mouseX - 0.5) * 0.3;
      const targetY = -(mouseY - 0.5) * 0.3;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetY,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetX,
        0.05
      );

      // Scale animation based on scroll
      const scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.2;
      groupRef.current.scale.setScalar(scale);

      // Floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Earth Sphere */}
      <Sphere 
        ref={meshRef} 
        args={[2, 64, 64]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={earthColor}
          roughness={0.4}
          metalness={0.1}
          distort={hovered ? 0.1 : 0.05}
          speed={1}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere args={[2.3, 64, 64]}>
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Dust Particles (fade out as we scroll) */}
      {scrollProgress < 0.5 && (
        <group>
          {Array.from({ length: 20 }, (_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial
                color="#d4b483"
                transparent
                opacity={(0.5 - scrollProgress) * 0.6}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Green Particles (fade in as we scroll) */}
      {scrollProgress > 0.3 && (
        <group>
          {Array.from({ length: 15 }, (_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial
                color="#22c55e"
                transparent
                opacity={(scrollProgress - 0.3) * 0.8}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Interactive Hotspots */}
      <Html position={[1.5, 0.8, 1.2]}>
        <div className={`w-4 h-4 rounded-full bg-red-500 animate-pulse cursor-pointer transition-all duration-300 ${
          hovered ? 'scale-125' : 'scale-100'
        }`} />
      </Html>
      <Html position={[-1.2, -0.5, 1.8]}>
        <div className={`w-4 h-4 rounded-full bg-yellow-500 animate-pulse cursor-pointer transition-all duration-300 ${
          hovered ? 'scale-125' : 'scale-100'
        }`} />
      </Html>
      <Html position={[0.8, -1.5, 1.1]}>
        <div className={`w-4 h-4 rounded-full bg-green-500 animate-pulse cursor-pointer transition-all duration-300 ${
          hovered ? 'scale-125' : 'scale-100'
        }`} />
      </Html>
    </group>
  );
};

export default InteractiveEarth;