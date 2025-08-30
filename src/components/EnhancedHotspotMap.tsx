import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  TrendingUp,
  Zap,
  Target
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

const EnhancedHotspotMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const [hotspots] = useState<Hotspot[]>([
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
    }
  ]);

  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(hotspots[0]);

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
        return { color: 'secondary', icon: AlertTriangle, text: 'Reported', emoji: '📝' };
      case 'verified':
        return { color: 'warning', icon: CheckCircle2, text: 'Verified', emoji: '✅' };
      case 'cleaning':
        return { color: 'accent', icon: TrendingUp, text: 'Cleaning', emoji: '🧹' };
      case 'completed':
        return { color: 'success', icon: CheckCircle2, text: 'Completed', emoji: '🎉' };
      default:
        return { color: 'secondary', icon: AlertTriangle, text: 'Unknown', emoji: '❓' };
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-background via-muted/10 to-secondary/5"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold">Community Map</span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Hotspot Hunter 🗺️
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time community reporting and tracking. Help us identify and clean the dustiest areas together!
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0 overflow-hidden h-[600px] relative">
              <CardHeader className="absolute top-4 left-4 right-4 z-20 glass-panel rounded-xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Live Delhi Hotspot Map
                  </CardTitle>
                  <Button variant="report" size="sm" className="glass-button">
                    <Plus className="w-4 h-4" />
                    Report Hotspot
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="h-full relative p-0 overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-secondary/10 to-primary/5" />
                
                {/* Animated Grid Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '50px 50px']
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Hotspot Markers */}
                {hotspots.map((hotspot, index) => {
                  const statusInfo = getStatusInfo(hotspot.status);
                  const priorityColor = getPriorityColor(hotspot.priority);
                  
                  return (
                    <motion.div
                      key={hotspot.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${25 + (index * 20)}%`,
                        top: `${35 + (index * 15)}%`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.2), type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.2, z: 10 }}
                      onClick={() => setSelectedHotspot(hotspot)}
                    >
                      {/* Pulsing Ring */}
                      <motion.div
                        className={`absolute w-12 h-12 rounded-full bg-${priorityColor}/20 -translate-x-1/2 -translate-y-1/2`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.2, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                      
                      {/* Main Pin */}
                      <div className={`relative w-6 h-6 rounded-full bg-${priorityColor} shadow-lg border-2 border-white -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      
                      {/* Report Count Badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 glass-card px-2 py-1 text-xs font-bold rounded-full">
                        {hotspot.reports}
                      </div>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {selectedHotspot?.id === hotspot.id && (
                          <motion.div
                            className="absolute -top-20 left-1/2 transform -translate-x-1/2 glass-panel p-3 rounded-lg shadow-lg min-w-[200px] text-center"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          >
                            <div className="font-semibold text-sm mb-1">{hotspot.location}</div>
                            <div className="text-xs text-muted-foreground">{hotspot.reports} reports • {hotspot.upvotes} upvotes</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 glass-panel p-4 rounded-xl">
                  <h4 className="font-semibold mb-3 text-sm">Priority Levels</h4>
                  <div className="space-y-2">
                    {[
                      { level: 'high', color: 'bg-destructive', label: 'High Priority' },
                      { level: 'medium', color: 'bg-warning', label: 'Medium Priority' },
                      { level: 'low', color: 'bg-success', label: 'Low Priority' }
                    ].map(({ level, color, label }) => (
                      <div key={level} className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${color} rounded-full ${level === 'high' ? 'animate-pulse' : ''}`} />
                        <span className="text-xs">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotspot Details & Community Stats */}
          <div className="space-y-6">
            {/* Selected Hotspot Details */}
            <AnimatePresence mode="wait">
              {selectedHotspot && (
                <motion.div
                  key={selectedHotspot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass-card border-0 hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight">{selectedHotspot.location}</CardTitle>
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
                                {statusInfo.text} {statusInfo.emoji}
                              </Badge>
                            </>
                          );
                        })()}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {selectedHotspot.description}
                      </p>

                      {selectedHotspot.dustCollected && (
                        <motion.div 
                          className="glass-panel p-3 rounded-lg"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-semibold">Dust Collected: {selectedHotspot.dustCollected}</span>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Reported by {selectedHotspot.reportedBy}</span>
                        <span>{selectedHotspot.reportedAt}</span>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-border/20">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 glass-button"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {selectedHotspot.upvotes}
                        </Button>
                        <Button variant="eco" size="sm" className="flex-1 glass-button">
                          Support Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Community Impact Stats */}
            <Card className="glass-card border-0 hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '61', label: 'Total Hotspots', color: 'text-primary' },
                    { value: '23', label: 'Completed', color: 'text-success' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-3 glass-panel rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + (index * 0.1) }}
                    >
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center p-3 glass-panel rounded-lg">
                  <div className="text-xl font-bold text-accent">127.3kg</div>
                  <div className="text-xs text-muted-foreground">Total Dust Collected This Month</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-0 hover-lift">
              <CardContent className="pt-6 space-y-3">
                <Button variant="report" className="w-full glass-button">
                  <Plus className="w-4 h-4" />
                  Report New Hotspot
                </Button>
                <Button variant="eco" className="w-full glass-button">
                  <Users className="w-4 h-4" />
                  Join Cleanup Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHotspotMap;