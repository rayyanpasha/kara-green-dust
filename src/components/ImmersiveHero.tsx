import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Scene3D from './3D/Scene3D';
import { 
  ArrowDown, 
  MapPin, 
  ShoppingBag, 
  Users,
  Sparkles,
  Wind,
  Leaf
} from 'lucide-react';

const ImmersiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(scrollProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollProgress, [0, 0.3, 1], [1, 0.9, 0.3]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.8]);

  const [currentStep, setCurrentStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const transformationSteps = [
    {
      emoji: '🌫️',
      title: 'Report Dust',
      description: 'Community identifies pollution hotspots',
      gradient: 'from-amber-500/20 to-orange-600/20'
    },
    {
      emoji: '🧹',
      title: 'Collect Dust', 
      description: 'Local teams gather pollutants',
      gradient: 'from-orange-500/20 to-yellow-600/20'
    },
    {
      emoji: '🌿',
      title: 'Create Life',
      description: 'Transform waste into living purifiers',
      gradient: 'from-green-500/20 to-emerald-600/20'
    },
    {
      emoji: '🏙️',
      title: 'Build Future',
      description: 'Revenue funds cleaner cities',
      gradient: 'from-blue-500/20 to-indigo-600/20'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % transformationSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [transformationSteps.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* 3D Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Scene3D 
          scrollProgress={scrollYProgress.get()}
          className="w-full h-full"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/80" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="glass-card px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Living Solutions</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-32 right-16 z-10"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="glass-card px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Community Driven</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex items-center justify-center min-h-screen px-6"
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-8xl md:text-9xl font-bold mb-6 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Kara
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Transform Bengaluru's dust pollution into living air purifiers.{' '}
              <span className="text-primary font-semibold">One community at a time.</span>
            </motion.p>
          </motion.div>

          {/* Interactive Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {transformationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                    index === currentStep 
                      ? 'scale-110 shadow-2xl bg-gradient-to-br ' + step.gradient 
                      : 'hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-5xl mb-4 animate-bounce">{step.emoji}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {index === currentStep && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4 }}
                      className="h-1 bg-primary rounded-full mt-4"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="min-w-[220px] glass-button group"
            >
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Report Hotspot
              <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button 
              variant="action" 
              size="xl" 
              className="min-w-[220px] glass-button group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Shop Moss Frames
              <Wind className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>

          {/* Live Impact Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { value: '2,847', label: 'Hotspots', icon: '📍', color: 'text-destructive' },
              { value: '156kg', label: 'Dust Collected', icon: '🧹', color: 'text-warning' },
              { value: '423', label: 'Moss Frames', icon: '🌿', color: 'text-success' },
              { value: '89', label: 'Communities', icon: '🤝', color: 'text-primary' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-panel p-6 rounded-2xl text-center hover-lift"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + (index * 0.1) }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-bold pulse-eco ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="glass-card p-4 rounded-full">
              <ArrowDown className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm mt-2 opacity-75">Discover Impact</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ImmersiveHero;