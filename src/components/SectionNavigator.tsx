import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'hero', name: 'Home', icon: '🏠' },
  { id: 'aqi', name: 'Air Quality', icon: '🌬️' },
  { id: 'hotspots', name: 'Hotspots', icon: '📍' },
  { id: 'marketplace', name: 'Marketplace', icon: '🛒' },
  { id: 'founders', name: 'Founders', icon: '👥' }
];

const SectionNavigator = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show/hide based on scroll position
      setIsVisible(scrollY > windowHeight * 0.5);
      
      // Determine current section
      sections.forEach((section, index) => {
        const element = document.querySelector(`[data-section="${section.id}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const navigateSection = (direction: 'up' | 'down') => {
    const newIndex = direction === 'up' 
      ? Math.max(0, currentSection - 1)
      : Math.min(sections.length - 1, currentSection + 1);
    
    scrollToSection(sections[newIndex].id);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
        >
          <div className="glass-card p-4 rounded-2xl space-y-4">
            {/* Navigation up */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full glass-button"
              onClick={() => navigateSection('up')}
              disabled={currentSection === 0}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>

            {/* Section indicators */}
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm transition-all duration-300 ${
                    index === currentSection
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'glass-panel hover:bg-muted/50'
                  }`}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{section.icon}</span>
                </motion.button>
              ))}
            </div>

            {/* Navigation down */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full glass-button"
              onClick={() => navigateSection('down')}
              disabled={currentSection === sections.length - 1}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionNavigator;