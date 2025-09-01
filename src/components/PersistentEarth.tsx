import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Scene3D from './3D/Scene3D';

const PersistentEarth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform properties based on scroll - Smooth progressive transitions
  const earthScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [1, 0.7, 0.5, 0.35, 0.25]);
  const earthX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], ['0%', '35%', '60%', '75%', '80%']);
  const earthY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], ['0%', '8%', '12%', '18%', '22%']);
  const earthOpacity = useTransform(scrollYProgress, [0, 0.15, 0.7, 0.95, 1], [1, 0.95, 0.8, 0.4, 0.2]);
  const earthRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 right-0 w-full h-full pointer-events-none z-10"
      style={{
        scale: earthScale,
        x: earthX,
        y: earthY,
        opacity: earthOpacity,
        rotateZ: earthRotation
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
    >
      <div className="w-full h-full">
        <Scene3D 
          scrollProgress={scrollYProgress.get()}
          className="w-full h-full"
        />
      </div>
    </motion.div>
  );
};

export default PersistentEarth;