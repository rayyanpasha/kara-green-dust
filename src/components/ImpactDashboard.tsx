import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Target, 
  Award, 
  Calendar,
  Trophy,
  Star,
  MapPin,
  ShoppingBag
} from 'lucide-react';

interface ImpactStat {
  id: string;
  title: string;
  value: number;
  unit: string;
  target?: number;
  trend: number;
  period: string;
  icon: any;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Leaderboard {
  rank: number;
  name: string;
  type: 'individual' | 'school' | 'community';
  points: number;
  contributions: string;
  badge?: string;
}

const ImpactDashboard = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'leaderboard'>('stats');
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const impactStats: ImpactStat[] = [
    {
      id: 'hotspots',
      title: 'Hotspots Reported',
      value: 2847,
      unit: 'locations',
      target: 3000,
      trend: 12.5,
      period: 'this month',
      icon: MapPin,
      color: 'primary'
    },
    {
      id: 'dust',
      title: 'Dust Collected',
      value: 156.2,
      unit: 'kg',
      target: 200,
      trend: 8.3,
      period: 'this month',
      icon: TrendingUp,
      color: 'warning'
    },
    {
      id: 'frames',
      title: 'Moss Frames Created',
      value: 423,
      unit: 'frames',
      target: 500,
      trend: 15.2,
      period: 'this month',
      icon: Leaf,
      color: 'success'
    },
    {
      id: 'communities',
      title: 'Active Communities',
      value: 89,
      unit: 'groups',
      target: 100,
      trend: 6.7,
      period: 'this month',
      icon: Users,
      color: 'accent'
    },
    {
      id: 'revenue',
      title: 'Community Fund',
      value: 247890,
      unit: '₹',
      target: 300000,
      trend: 22.1,
      period: 'raised total',
      icon: Target,
      color: 'secondary'
    },
    {
      id: 'participants',
      title: 'Teen Participants',
      value: 1256,
      unit: 'students',
      target: 1500,
      trend: 18.9,
      period: 'registered',
      icon: Award,
      color: 'primary'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Dust Detective',
      description: 'Reported your first 10 dust hotspots',
      icon: '🕵️‍♂️',
      unlockedAt: '2 days ago',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Community Hero',
      description: 'Organized 5 community cleanup drives',
      icon: '🦸‍♀️',
      unlockedAt: '1 week ago',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Moss Master',
      description: 'Purchased 3 moss frames supporting the cause',
      icon: '🌿',
      unlockedAt: '3 days ago',
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Change Maker',
      description: 'Influenced policy change in your district',
      icon: '🏆',
      unlockedAt: '1 month ago',
      rarity: 'legendary'
    }
  ];

  const leaderboard: Leaderboard[] = [
    {
      rank: 1,
      name: 'Delhi Public School, RK Puram',
      type: 'school',
      points: 2450,
      contributions: '89 reports, 12kg dust collected',
      badge: '🏆'
    },
    {
      rank: 2,
      name: 'Priya Sharma',
      type: 'individual',
      points: 1890,
      contributions: '34 reports, 5 moss frames purchased',
      badge: '🥈'
    },
    {
      rank: 3,
      name: 'Green Warriors Karol Bagh',
      type: 'community',
      points: 1650,
      contributions: '67 reports, 8.2kg dust collected',
      badge: '🥉'
    },
    {
      rank: 4,
      name: 'Arjun Mehta',
      type: 'individual',
      points: 1420,
      contributions: '28 reports, 3 cleanups organized',
    },
    {
      rank: 5,
      name: 'Modern School, Vasant Vihar',
      type: 'school',
      points: 1380,
      contributions: '56 reports, 7kg dust collected',
    }
  ];

  useEffect(() => {
    // Animate counter values
    impactStats.forEach((stat) => {
      let start = 0;
      const increment = stat.value / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          start = stat.value;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [stat.id]: Math.floor(start) }));
      }, 30);
    });
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'secondary';
      case 'rare': return 'accent';
      case 'epic': return 'success';
      case 'legendary': return 'warning';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return '👤';
      case 'school': return '🏫';
      case 'community': return '👥';
      default: return '👤';
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Community Impact Dashboard 📊
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track our collective progress, celebrate achievements, and see how your actions create real change
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-muted/50 rounded-lg p-1">
            {[
              { id: 'stats', label: 'Live Stats', icon: TrendingUp },
              { id: 'achievements', label: 'Achievements', icon: Trophy },
              { id: 'leaderboard', label: 'Leaderboard', icon: Star }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(id as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            {/* Main Impact Stats */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {impactStats.map((stat) => {
                const Icon = stat.icon;
                const progress = stat.target ? (stat.value / stat.target) * 100 : 0;
                
                return (
                  <Card key={stat.id} className="hover-lift relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 text-${stat.color}`} />
                        <Badge 
                          variant={stat.trend > 0 ? 'success' : 'destructive'} 
                          className="text-xs"
                        >
                          {stat.trend > 0 ? '↗' : '↘'} {Math.abs(stat.trend)}%
                        </Badge>
                      </div>
                      
                      <div className="mb-2">
                        <div className="text-3xl font-bold pulse-eco">
                          {animatedValues[stat.id]?.toLocaleString() || 0}
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            {stat.unit}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-muted-foreground">
                          {stat.title}
                        </h3>
                      </div>

                      {stat.target && (
                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress to Goal</span>
                            <span>{stat.target.toLocaleString()} {stat.unit}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        {stat.period}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Monthly Goals */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  December 2024 Community Goals 🎯
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Hotspot Goal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">78%</div>
                    <div className="text-sm text-muted-foreground">Dust Collection</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">85%</div>
                    <div className="text-sm text-muted-foreground">Moss Frame Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">89%</div>
                    <div className="text-sm text-muted-foreground">Community Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="hover-lift text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <Badge 
                    variant={getRarityColor(achievement.rarity) as any} 
                    className="mb-3"
                  >
                    {achievement.rarity.toUpperCase()}
                  </Badge>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Unlocked {achievement.unlockedAt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  Community Champions 🏆
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-muted/50 ${
                      entry.rank <= 3 ? 'bg-gradient-to-r from-accent/10 to-primary/5 border border-accent/20' : 'bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500 text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {entry.badge || entry.rank}
                      </div>
                      <div className="text-2xl">{getTypeIcon(entry.type)}</div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{entry.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {entry.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.contributions}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {entry.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Join the Movement! 🌟</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Every hotspot report, every moss frame purchase, every community cleanup 
                    brings us closer to cleaner air for everyone.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="hero" size="lg">
                      <MapPin className="w-5 h-5" />
                      Report Hotspot
                    </Button>
                    <Button variant="action" size="lg">
                      <ShoppingBag className="w-5 h-5" />
                      Shop Moss Frames
                    </Button>
                    <Button variant="support" size="lg">
                      <Users className="w-5 h-5" />
                      Join Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImpactDashboard;