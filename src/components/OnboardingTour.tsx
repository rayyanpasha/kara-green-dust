import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ArrowRight, 
  MapPin, 
  ShoppingBag, 
  BarChart3, 
  Wind,
  Sparkles,
  CheckCircle
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  targetElement?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const OnboardingTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Kara! 🌿',
      description: 'Transform Bengaluru\'s dust pollution into living air purifiers. Let\'s take a quick tour!',
      icon: Sparkles,
      position: 'center'
    },
    {
      id: 'earth',
      title: 'Interactive Earth 🌍',
      description: 'Watch our planet transform as you scroll - from dusty to green, showing the power of community action.',
      icon: Wind,
      position: 'center'
    },
    {
      id: 'report',
      title: 'Report Hotspots 📍',
      description: 'Spot dust pollution in your area? Report it! Your community reports help us prioritize cleanup efforts.',
      icon: MapPin,
      position: 'bottom'
    },
    {
      id: 'shop',
      title: 'Moss Frame Store 🛒',
      description: 'Buy beautiful moss frames made from collected dust. Every purchase funds more community cleanups!',
      icon: ShoppingBag,
      position: 'bottom'
    },
    {
      id: 'impact',
      title: 'Track Impact 📊',
      description: 'See real-time stats of hotspots cleaned, dust collected, and communities engaged. Your contribution matters!',
      icon: BarChart3,
      position: 'bottom'
    },
    {
      id: 'complete',
      title: 'You\'re All Set! ✨',
      description: 'Ready to join the movement? Start by reporting a dust hotspot or exploring our moss frames.',
      icon: CheckCircle,
      position: 'center'
    }
  ];

  useEffect(() => {
    // Check if user has seen the tour
    const tourSeen = localStorage.getItem('kara-tour-seen');
    if (!tourSeen) {
      setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Show after 2 seconds
    } else {
      setHasSeenTour(true);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    completeTour();
  };

  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem('kara-tour-seen', 'true');
    setHasSeenTour(true);
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsVisible(true);
    setHasSeenTour(false);
  };

  if (hasSeenTour) {
    return (
      <motion.button
        onClick={restartTour}
        className="fixed bottom-6 left-6 z-50 glass-card p-3 rounded-full hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Restart Tour"
      >
        <Sparkles className="w-5 h-5 text-primary" />
      </motion.button>
    );
  }

  const currentStepData = tourSteps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Tour Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="glass-card border-0 max-w-md w-full">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="px-3 py-1">
                    Step {currentStep + 1} of {tourSteps.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipTour}
                    className="rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <StepIcon className="w-8 h-8 text-primary" />
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {currentStepData.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentStepData.description}
                  </motion.p>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-8">
                  {tourSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between gap-4">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  
                  <Button
                    variant="eco"
                    onClick={nextStep}
                    className="flex-1 glass-button"
                  >
                    {currentStep === tourSteps.length - 1 ? (
                      <>
                        Get Started
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingTour;