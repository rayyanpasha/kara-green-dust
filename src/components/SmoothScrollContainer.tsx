import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollContainerProps {
  children: React.ReactNode;
}

const SmoothScrollContainer = ({ children }: SmoothScrollContainerProps) => {
  const { scrollYProgress } = useScroll();
  
  // Apple-style smooth scroll physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  // Parallax background movement
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div 
      className="relative"
      style={{ 
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Dynamic background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollContainer;