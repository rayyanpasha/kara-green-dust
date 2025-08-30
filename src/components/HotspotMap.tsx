import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Plus, 
  ThumbsUp, 
  AlertTriangle, 
  CheckCircle2,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Hotspot {
  id: string;
  location: string;
  coordinates: [number, number];
  reports: number;
  priority: 'high' | 'medium' | 'low';
  status: 'reported' | 'verified' | 'cleaning' | 'completed';
  description: string;
  dustCollected?: string;
  reportedBy: string;
  reportedAt: string;
  upvotes: number;
}

const HotspotMap = () => {
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      id: '1',
      location: 'Connaught Place Metro Station',
      coordinates: [28.6315, 77.2167],
      reports: 23,
      priority: 'high',
      status: 'cleaning',
      description: 'Heavy dust accumulation near construction site affecting daily commuters',
      dustCollected: '15.2kg',
      reportedBy: 'Priya S.',
      reportedAt: '2 hours ago',
      upvotes: 47
    },
    {
      id: '2',
      location: 'Karol Bagh Market Area',
      coordinates: [28.6519, 77.1909],
      reports: 18,
      priority: 'high',
      status: 'verified',
      description: 'Road dust from heavy traffic and poor street cleaning',
      reportedBy: 'Arjun M.',
      reportedAt: '5 hours ago',
      upvotes: 32
    },
    {
      id: '3',
      location: 'Lajpat Nagar Central Market',
      coordinates: [28.5678, 77.2436],
      reports: 12,
      priority: 'medium',
      status: 'reported',
      description: 'Dust from demolition work near popular shopping area',
      reportedBy: 'Shreya K.',
      reportedAt: '1 day ago',
      upvotes: 28
    },
    {
      id: '4',
      location: 'India Gate Lawns',
      coordinates: [28.6129, 77.2295],
      reports: 8,
      priority: 'low',
      status: 'completed',
      description: 'Seasonal dust around tourist area during dry months',
      dustCollected: '8.7kg',
      reportedBy: 'Rahul T.',
      reportedAt: '3 days ago',
      upvotes: 15
    }
  ]);

  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'success';
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'reported':
        return { color: 'secondary', icon: AlertTriangle, text: 'Reported 📝' };
      case 'verified':
        return { color: 'warning', icon: CheckCircle2, text: 'Verified ✅' };
      case 'cleaning':
        return { color: 'accent', icon: TrendingUp, text: 'Cleaning 🧹' };
      case 'completed':
        return { color: 'success', icon: CheckCircle2, text: 'Completed 🎉' };
      default:
        return { color: 'secondary', icon: AlertTriangle, text: 'Unknown' };
    }
  };

  const handleUpvote = (hotspotId: string) => {
    setHotspots(prev => 
      prev.map(h => 
        h.id === hotspotId 
          ? { ...h, upvotes: h.upvotes + 1 }
          : h
      )
    );
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Community Dust Map 🗺️
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time hotspot reporting and tracking. Help us identify and clean the dustiest areas in your neighborhood!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Visualization (Mock) */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] relative overflow-hidden hover-lift">
              <CardHeader className="absolute top-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Live Hotspot Map - New Delhi
                  </CardTitle>
                  <Button 
                    variant="report" 
                    size="sm"
                    onClick={() => setShowReportForm(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Report Hotspot
                  </Button>
                </div>
              </CardHeader>

              {/* Mock Map Background */}
              <CardContent className="h-full relative bg-gradient-to-br from-muted/30 to-secondary/20">
                {/* Mock Map Interface */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--secondary))_0%,_transparent_50%)] opacity-20" />
                
                {/* Hotspot Pins */}
                {hotspots.map((hotspot, index) => (
                  <div
                    key={hotspot.id}
                    className={`absolute cursor-pointer transition-all duration-300 hover:scale-125 ${
                      selectedHotspot?.id === hotspot.id ? 'scale-125 z-10' : ''
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 12)}%`
                    }}
                    onClick={() => setSelectedHotspot(hotspot)}
                  >
                    <div className={`map-pin ${hotspot.priority}-priority relative`}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {hotspot.location}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-1 text-xs font-semibold shadow-md">
                      {hotspot.reports}
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Priority Levels</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive rounded-full animate-pulse" />
                      <span className="text-sm">High Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-warning rounded-full" />
                      <span className="text-sm">Medium Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success rounded-full" />
                      <span className="text-sm">Low Priority</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotspot Details & Feed */}
          <div className="space-y-6">
            {/* Selected Hotspot Details */}
            {selectedHotspot && (
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{selectedHotspot.location}</CardTitle>
                    <Badge variant={getPriorityColor(selectedHotspot.priority) as any}>
                      {selectedHotspot.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const statusInfo = getStatusInfo(selectedHotspot.status);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <>
                          <StatusIcon className={`w-4 h-4 text-${statusInfo.color}`} />
                          <Badge variant={statusInfo.color as any} className="text-xs">
                            {statusInfo.text}
                          </Badge>
                        </>
                      );
                    })()}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {selectedHotspot.description}
                  </p>

                  {selectedHotspot.dustCollected && (
                    <div className="bg-success/10 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-semibold">Dust Collected: {selectedHotspot.dustCollected}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Reported by {selectedHotspot.reportedBy}</span>
                    <span>{selectedHotspot.reportedAt}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(selectedHotspot.id)}
                      className="flex items-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {selectedHotspot.upvotes}
                    </Button>
                    <Button variant="eco" size="sm" className="flex-1">
                      Support This Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Community Stats */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Community Impact 📊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">61</div>
                    <div className="text-xs text-muted-foreground">Total Hotspots</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">23</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-xl font-bold text-accent">127.3kg</div>
                  <div className="text-xs text-muted-foreground">Total Dust Collected This Month</div>
                </div>

                <Button variant="support" className="w-full">
                  <Calendar className="w-4 h-4" />
                  View Cleanup Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover-lift">
              <CardContent className="pt-6 space-y-3">
                <Button variant="report" className="w-full">
                  <Plus className="w-4 h-4" />
                  Report New Hotspot
                </Button>
                <Button variant="eco" className="w-full">
                  <Users className="w-4 h-4" />
                  Join Cleanup Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotspotMap;