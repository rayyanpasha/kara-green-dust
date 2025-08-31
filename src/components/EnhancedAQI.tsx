import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wind, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Thermometer,
  Droplets,
  Eye,
  MapPin,
  Zap
} from 'lucide-react';

interface AQIData {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  status: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  temperature: number;
  humidity: number;
  visibility: number;
}

const EnhancedAQI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const [aqiData] = useState<AQIData>({
    city: 'Bengaluru',
    aqi: 187,
    pm25: 94,
    pm10: 158,
    status: 'unhealthy',
    temperature: 28,
    humidity: 65,
    visibility: 2.1
  });

  const aqiValue = useMotionValue(0);
  const aqiSpring = useSpring(aqiValue, { stiffness: 100, damping: 30 });
  const [animatedAQI, setAnimatedAQI] = useState(0);

  useEffect(() => {
    if (isInView) {
      aqiValue.set(aqiData.aqi);
    }
  }, [isInView, aqiData.aqi, aqiValue]);

  useEffect(() => {
    return aqiSpring.onChange((latest) => {
      setAnimatedAQI(Math.floor(latest));
    });
  }, [aqiSpring]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'good':
        return { 
          color: 'success', 
          icon: CheckCircle, 
          text: 'Good', 
          emoji: '😊',
          bgColor: 'bg-success/10',
          tips: [
            { emoji: '🚴‍♂️', text: 'Perfect for outdoor activities!' },
            { emoji: '🌱', text: 'Great day to plant some greenery' },
            { emoji: '🪟', text: 'Keep windows open for fresh air' }
          ]
        };
      case 'moderate':
        return { 
          color: 'warning', 
          icon: AlertTriangle, 
          text: 'Moderate', 
          emoji: '😐',
          bgColor: 'bg-warning/10',
          tips: [
            { emoji: '😷', text: 'Consider wearing a mask outdoors' },
            { emoji: '💧', text: 'Stay hydrated with plenty of water' },
            { emoji: '🏠', text: 'Limit outdoor activities during peak hours' }
          ]
        };
      case 'unhealthy':
        return { 
          color: 'destructive', 
          icon: XCircle, 
          text: 'Unhealthy', 
          emoji: '😷',
          bgColor: 'bg-destructive/10',
          tips: [
            { emoji: '😷', text: 'Wear N95 masks when going outside' },
            { emoji: '🏠', text: 'Stay indoors as much as possible' },
            { emoji: '💨', text: 'Use air purifiers at home' },
            { emoji: '🚫', text: 'Avoid outdoor exercise completely' }
          ]
        };
      default:
        return { 
          color: 'destructive', 
          icon: XCircle, 
          text: 'Hazardous', 
          emoji: '⚠️',
          bgColor: 'bg-destructive/20',
          tips: [
            { emoji: '🚨', text: 'Emergency: Stay indoors at all times!' },
            { emoji: '😷', text: 'N95+ masks are essential if you must go out' },
            { emoji: '💨', text: 'Run air purifiers on high' },
            { emoji: '🏥', text: 'Seek medical help if you feel unwell' }
          ]
        };
    }
  };

  const statusInfo = getStatusInfo(aqiData.status);
  const StatusIcon = statusInfo.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255, 187, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(255, 187, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(255, 187, 36, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Wind className="w-5 h-5 text-primary" />
            <span className="font-semibold">Live Air Quality</span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Breathe Aware 🌬️
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time pollution data and personalized health guidance for Bengaluru
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main AQI Display */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card hover-lift border-0 overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl">{aqiData.city}</CardTitle>
                </div>
                <Badge variant="secondary" className="glass-button">
                  <Zap className="w-3 h-3 mr-1" />
                  Live Update • Just now
                </Badge>
              </CardHeader>
              
              <CardContent className="text-center pb-8">
                {/* Main AQI Circle */}
                <motion.div 
                  className={`relative w-56 h-56 mx-auto mb-8 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="text-center">
                    <StatusIcon className={`w-10 h-10 text-${statusInfo.color} mx-auto mb-4`} />
                    <motion.div 
                      className="text-6xl font-bold text-foreground"
                      key={animatedAQI}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {animatedAQI}
                    </motion.div>
                    <div className="text-sm text-muted-foreground mt-2">AQI Index</div>
                  </div>

                  {/* Floating particles around AQI circle */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/30 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        x: Math.cos((i / 8) * Math.PI * 2) * 120,
                        y: Math.sin((i / 8) * Math.PI * 2) * 120,
                        rotate: 360
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear"
                      }}
                    />
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Badge 
                    variant={statusInfo.color as any} 
                    className="text-lg px-6 py-3 mb-8"
                  >
                    {statusInfo.text} {statusInfo.emoji}
                  </Badge>
                </motion.div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="glass-panel p-4 rounded-xl text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-warning">{aqiData.pm25}</div>
                    <div className="text-sm text-muted-foreground">PM2.5 μg/m³</div>
                  </motion.div>
                  <motion.div 
                    className="glass-panel p-4 rounded-xl text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-destructive">{aqiData.pm10}</div>
                    <div className="text-sm text-muted-foreground">PM10 μg/m³</div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Tips & Weather */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Health Tips */}
            <Card className="glass-card hover-lift border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Wind className="w-6 h-6 text-primary" />
                  Health Guide 💪
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusInfo.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 glass-panel rounded-xl morph-on-hover cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + (index * 0.1) }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="text-2xl">{tip.emoji}</div>
                      <div className="flex-1 text-sm font-medium">{tip.text}</div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <Button variant="eco" className="w-full mt-6 glass-button">
                    <MapPin className="w-4 h-4" />
                    Report Air Quality Issue
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Weather Details */}
            <Card className="glass-card hover-lift border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Thermometer className="w-6 h-6 text-accent" />
                  Environment 🌤️
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="text-center p-4 glass-panel rounded-xl"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Thermometer className="w-8 h-8 text-accent mx-auto mb-3" />
                    <div className="text-2xl font-bold">{aqiData.temperature}°C</div>
                    <div className="text-xs text-muted-foreground">Temperature</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 glass-panel rounded-xl"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Droplets className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">{aqiData.humidity}%</div>
                    <div className="text-xs text-muted-foreground">Humidity</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 glass-panel rounded-xl"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Eye className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <div className="text-2xl font-bold">{aqiData.visibility}km</div>
                    <div className="text-xs text-muted-foreground">Visibility</div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedAQI;