import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, ShoppingBag, TrendingUp, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-transformation.jpg';

const Hero = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    { emoji: '🗯️', text: 'Report Dust', description: 'Community identifies pollution hotspots' },
    { emoji: '🧹', text: 'Collect Dust', description: 'Local teams gather pollutants for transformation' },
    { emoji: '🌿', text: 'Create Moss Frames', description: 'Transform waste into living air purifiers' },
    { emoji: '🏙️', text: 'Build Cleaner Cities', description: 'Revenue funds more community cleanups' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Urban transformation from pollution to green spaces"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          🌱 Living Air Purifiers
        </Badge>
      </div>
      <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          🏆 Community Driven
        </Badge>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Logo/Brand */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
            Kara
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Empowering Indian teenagers to transform dust pollution into living air purifiers, 
            one community at a time.
          </p>
        </div>

        {/* Interactive Journey Steps */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 ${
                  index === activeStep 
                    ? 'bg-white text-primary scale-110 shadow-xl' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                } ${index <= activeStep ? 'opacity-100' : 'opacity-70'}`}
              >
                <span className="text-2xl">{step.emoji}</span>
                <div className="text-left">
                  <div className="font-semibold">{step.text}</div>
                  <div className="text-sm opacity-90">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="ml-2 w-4 h-4 opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className={`flex flex-wrap justify-center gap-6 mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button variant="action" size="xl" className="min-w-[200px]">
            <MapPin className="w-5 h-5" />
            Report Dust Hotspot
          </Button>
          <Button variant="hero" size="xl" className="min-w-[200px]">
            <ShoppingBag className="w-5 h-5" />
            Shop Moss Frames
          </Button>
          <Button variant="support" size="xl" className="min-w-[200px]">
            <Heart className="w-5 h-5" />
            Join Movement
          </Button>
        </div>

        {/* Live Stats Preview */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: '2,847', label: 'Hotspots Reported', icon: '📍' },
            { value: '156kg', label: 'Dust Collected', icon: '🧹' },
            { value: '423', label: 'Moss Frames Created', icon: '🌿' },
            { value: '89', label: 'Active Communities', icon: '🤝' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold pulse-eco">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="text-sm">Discover Impact</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;