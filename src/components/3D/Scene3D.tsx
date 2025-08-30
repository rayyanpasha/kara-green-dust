import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import InteractiveEarth from './InteractiveEarth';

interface Scene3DProps {
  scrollProgress?: number;
  className?: string;
}

const Scene3D = ({ scrollProgress = 0, className = '' }: Scene3DProps) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
          />
          <pointLight 
            position={[-5, -5, -5]} 
            intensity={0.5}
            color="#fbbf24" 
          />

          {/* Background Stars */}
          <Stars
            radius={300}
            depth={60}
            count={2000}
            factor={7}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Main Earth */}
          <InteractiveEarth
            scrollProgress={scrollProgress}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
          />

          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Optional Orbit Controls (disabled by default for auto-rotation) */}
          {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
        </Suspense>
      </Canvas>

      {/* Overlay gradients for better integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 pointer-events-none" />
    </div>
  );
};

export default Scene3D;