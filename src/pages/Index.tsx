import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, ShoppingBag, TrendingUp, Heart } from 'lucide-react';
import Hero from '@/components/Hero';
import AQIDisplay from '@/components/AQIDisplay';
import HotspotMap from '@/components/HotspotMap';
import CivicComplaints from '@/components/CivicComplaints';
import MossFrameStore from '@/components/MossFrameStore';
import ImpactDashboard from '@/components/ImpactDashboard';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* AQI & Health Tips */}
      <AQIDisplay />
      
      {/* Interactive Hotspot Map */}
      <HotspotMap />
      
      {/* Civic Complaints Board */}
      <CivicComplaints />
      
      {/* Moss Frame Marketplace */}
      <MossFrameStore />
      
      {/* Impact Dashboard */}
      <ImpactDashboard />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference? 🌱</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian teenagers transforming dust pollution into living solutions. 
            Every action counts toward cleaner cities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl">
              <MapPin className="w-5 h-5" />
              Start Reporting
            </Button>
            <Button variant="action" size="xl">
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-sm opacity-75">
            <p>© 2024 Kara Environmental Movement. Building cleaner cities, one community at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
