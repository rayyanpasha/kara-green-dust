import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImmersiveHero from '@/components/ImmersiveHero';
import EnhancedAQI from '@/components/EnhancedAQI';
import EnhancedHotspotMap from '@/components/EnhancedHotspotMap';
import CivicComplaints from '@/components/CivicComplaints';
import MossFrameStore from '@/components/MossFrameStore';
import ImpactDashboard from '@/components/ImpactDashboard';
import PersistentEarth from '@/components/PersistentEarth';
import SmoothScrollContainer from '@/components/SmoothScrollContainer';
import InteractiveSection from '@/components/InteractiveSection';
import Navigation from '@/components/Navigation';
import OnboardingTour from '@/components/OnboardingTour';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import SearchOverlay from '@/components/SearchOverlay';
import { MapPin, ShoppingBag, Sparkles, Wind } from 'lucide-react';
import dustToMossImage from '@/assets/dust-to-moss-transformation.jpg';
import bengaluruCommunityImage from '@/assets/bengaluru-community-action.jpg';
import hotspotVisualizationImage from '@/assets/interactive-hotspot-visualization.jpg';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle search keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SmoothScrollContainer>
      <div className="min-h-screen relative">
        {/* Navigation */}
        <Navigation onSearchOpen={() => setIsSearchOpen(true)} />
        
        {/* Search Overlay */}
        <SearchOverlay 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
        
        {/* Onboarding Tour */}
        <OnboardingTour />
        
        {/* Persistent 3D Earth */}
        <PersistentEarth />
        
        {/* Immersive 3D Hero */}
        <ImmersiveHero />
        
        {/* Enhanced AQI with Motion */}
        <InteractiveSection 
          backgroundImage={dustToMossImage}
          parallaxIntensity={0.3}
          className="py-0"
        >
          <EnhancedAQI />
        </InteractiveSection>
        
        {/* Interactive 3D Hotspot Map */}
        <InteractiveSection 
          backgroundImage={hotspotVisualizationImage}
          parallaxIntensity={0.4}
          className="py-0"
        >
          <EnhancedHotspotMap />
        </InteractiveSection>
        
        {/* Streamlined Sections with Glass Design */}
        <div className="relative">
          {/* Civic Complaints - Enhanced */}
          <InteractiveSection 
            backgroundImage={bengaluruCommunityImage}
            parallaxIntensity={0.2}
            className="py-16 mx-6 my-8"
          >
            <div className="glass-card rounded-3xl border-0 p-8">
              <CivicComplaints />
            </div>
          </InteractiveSection>
          
          {/* Moss Frame Marketplace - Premium */}
          <InteractiveSection 
            className="py-16 bg-gradient-to-br from-secondary/5 to-primary/10"
            parallaxIntensity={0.3}
          >
            <MossFrameStore />
          </InteractiveSection>
          
          {/* FAQ Section */}
          <InteractiveSection parallaxIntensity={0.1}>
            <FAQ />
          </InteractiveSection>
          
          {/* Newsletter Signup */}
          <InteractiveSection parallaxIntensity={0.2}>
            <Newsletter />
          </InteractiveSection>
        </div>
        
        {/* Premium Footer */}
        <InteractiveSection 
          className="py-20 px-6 overflow-hidden"
          parallaxIntensity={0.1}
        >
          <footer className="relative">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your City? ✨
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands creating cleaner air through community action and living solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="hero" size="xl" className="glass-button">
              <MapPin className="w-5 h-5" />
              Start Reporting
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="action" size="xl" className="glass-button">
              <ShoppingBag className="w-5 h-5" />
              Shop Moss Frames
              <Wind className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-white/75">
            <p>© 2024 Kara Environmental Movement • Bengaluru, India</p>
            <p className="text-sm mt-2">Created by Rayyan Pasha & Kanishka Raghavendra</p>
            <p className="text-xs mt-1 opacity-60">Transforming Pollution into Living Solutions</p>
            </div>
          </div>
        </footer>
        </InteractiveSection>
      </div>
    </SmoothScrollContainer>
  );
};

export default Index;
