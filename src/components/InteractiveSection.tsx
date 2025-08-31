import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface InteractiveSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  parallaxIntensity?: number;
}

const InteractiveSection = ({ 
  children, 
  className = '', 
  backgroundImage,
  parallaxIntensity = 0.5 
}: InteractiveSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Apple-style smooth transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40
  });

  const y = useTransform(smoothProgress, [0, 1], ['0%', `${parallaxIntensity * 100}%`]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 1.1]);

  return (
    <motion.section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div 
            className="w-full h-[120%] bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        style={{ scale }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default InteractiveSection;