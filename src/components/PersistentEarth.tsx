import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Scene3D from './3D/Scene3D';

const PersistentEarth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform properties based on scroll
  const earthScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.4, 0.3, 0.25]);
  const earthX = useTransform(scrollYProgress, [0, 0.2, 1], ['0%', '70%', '80%']);
  const earthY = useTransform(scrollYProgress, [0, 0.2, 1], ['0%', '20%', '30%']);
  const earthOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.8, 0.6, 0.4]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 right-0 w-full h-full pointer-events-none z-10"
      style={{
        scale: earthScale,
        x: earthX,
        y: earthY,
        opacity: earthOpacity
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