import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Scene3D from './3D/Scene3D';

const PersistentEarth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform properties based on scroll - Apple-style smooth transitions
  const earthScale = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.7, 1], [1, 0.6, 0.4, 0.3, 0.25]);
  const earthX = useTransform(scrollYProgress, [0, 0.15, 0.4, 1], ['0%', '40%', '65%', '75%']);
  const earthY = useTransform(scrollYProgress, [0, 0.15, 0.4, 1], ['0%', '10%', '15%', '20%']);
  const earthOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.9, 1], [1, 0.9, 0.7, 0.5, 0.3]);
  const earthRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

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
        stiffness: 400,
        damping: 40
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