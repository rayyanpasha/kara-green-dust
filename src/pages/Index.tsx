import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImmersiveHero from '@/components/ImmersiveHero';
import EnhancedAQI from '@/components/EnhancedAQI';
import EnhancedHotspotMap from '@/components/EnhancedHotspotMap';
import CivicComplaints from '@/components/CivicComplaints';
import MossFrameStore from '@/components/MossFrameStore';
import ImpactDashboard from '@/components/ImpactDashboard';
import { MapPin, ShoppingBag, Sparkles, Wind } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Immersive 3D Hero */}
      <ImmersiveHero />
      
      {/* Enhanced AQI with Motion */}
      <EnhancedAQI />
      
      {/* Interactive 3D Hotspot Map */}
      <EnhancedHotspotMap />
      
      {/* Streamlined Sections with Glass Design */}
      <div className="relative">
        {/* Civic Complaints - Enhanced */}
        <section className="py-16 glass-card mx-6 my-8 rounded-3xl border-0">
          <CivicComplaints />
        </section>
        
        {/* Moss Frame Marketplace - Premium */}
        <section className="py-16 bg-gradient-to-br from-secondary/5 to-primary/10">
          <MossFrameStore />
        </section>
        
        {/* Impact Dashboard - Gamified */}
        <ImpactDashboard />
      </div>
      
      {/* Premium Footer */}
      <footer className="relative py-20 px-6 overflow-hidden">
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
            <p>© 2024 Kara Environmental Movement • Transforming Pollution into Living Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
