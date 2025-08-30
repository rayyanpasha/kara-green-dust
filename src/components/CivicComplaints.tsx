import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Megaphone,
  Plus,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'dust' | 'noise' | 'waste' | 'air' | 'water';
  priority: 'high' | 'medium' | 'low';
  status: 'received' | 'in-review' | 'action-taken' | 'resolved';
  location: string;
  reportedBy: string;
  reportedAt: string;
  upvotes: number;
  comments: number;
  estimatedResolution?: string;
  actionTaken?: string;
}

const CivicComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      title: 'Heavy dust from road construction blocking school entrance',
      description: 'Daily construction work on MG Road is creating massive dust clouds affecting St. Mary\'s School students and nearby residents. Children are developing respiratory issues.',
      category: 'dust',
      priority: 'high',
      status: 'action-taken',
      location: 'MG Road, Sector 14, Gurgaon',
      reportedBy: 'Neha Sharma (Parent)',
      reportedAt: '2 days ago',
      upvotes: 89,
      comments: 23,
      estimatedResolution: '1 week',
      actionTaken: 'Water spraying system installed, dust barriers erected around construction site'
    },
    {
      id: '2',
      title: 'Illegal burning of waste causing air pollution',
      description: 'Local waste management company burning plastic and electronic waste in open area behind residential complex, causing severe air quality issues.',
      category: 'air',
      priority: 'high',
      status: 'in-review',
      location: 'Behind Greenfield Apartments, Noida',
      reportedBy: 'Rajesh Kumar',
      reportedAt: '4 hours ago',
      upvotes: 156,
      comments: 31,
      estimatedResolution: '3 days'
    },
    {
      id: '3',
      title: 'Loud construction noise during school hours',
      description: 'Metro construction work continues during school hours (9 AM - 3 PM) making it impossible for students to concentrate during classes.',
      category: 'noise',
      priority: 'medium',
      status: 'received',
      location: 'Karol Bagh Metro Station Area',
      reportedBy: 'Delhi Public School Teachers',
      reportedAt: '1 day ago',
      upvotes: 67,
      comments: 18,
      estimatedResolution: 'Under review'
    },
    {
      id: '4',
      title: 'Overflowing garbage bins attracting pests',
      description: 'Municipal garbage bins near Central Park not being collected for over a week, creating health hazards and pest problems for morning joggers.',
      category: 'waste',
      priority: 'medium',
      status: 'resolved',
      location: 'Central Park, Connaught Place',
      reportedBy: 'Morning Joggers Association',
      reportedAt: '1 week ago',
      upvotes: 45,
      comments: 12,
      actionTaken: 'Additional garbage collection schedule implemented, bins upgraded to larger capacity'
    }
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showNewComplaint, setShowNewComplaint] = useState(false);

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'dust':
        return { color: 'warning', emoji: '🌫️', label: 'Dust Pollution' };
      case 'noise':
        return { color: 'destructive', emoji: '🔊', label: 'Noise Pollution' };
      case 'waste':
        return { color: 'secondary', emoji: '🗑️', label: 'Waste Management' };
      case 'air':
        return { color: 'destructive', emoji: '💨', label: 'Air Pollution' };
      case 'water':
        return { color: 'primary', emoji: '💧', label: 'Water Issues' };
      default:
        return { color: 'secondary', emoji: '❗', label: 'Other' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'received':
        return { 
          color: 'secondary', 
          icon: MessageSquare, 
          text: 'Received 📝', 
          description: 'Complaint logged and under initial review'
        };
      case 'in-review':
        return { 
          color: 'warning', 
          icon: Clock, 
          text: 'In Review 👀', 
          description: 'Investigating the issue and planning action'
        };
      case 'action-taken':
        return { 
          color: 'accent', 
          icon: AlertTriangle, 
          text: 'Action Taken ⚡', 
          description: 'Steps have been taken to address the issue'
        };
      case 'resolved':
        return { 
          color: 'success', 
          icon: CheckCircle2, 
          text: 'Resolved ✅', 
          description: 'Issue has been completely resolved'
        };
      default:
        return { color: 'secondary', icon: MessageSquare, text: 'Unknown' };
    }
  };

  const handleUpvote = (complaintId: string) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, upvotes: complaint.upvotes + 1 }
          : complaint
      )
    );
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background via-muted/10 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Civic Complaints Board 📢
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Report environmental issues, track progress, and build community pressure for cleaner neighborhoods
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Complaints Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create New Complaint Button */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Found an Environmental Issue?</h3>
                    <p className="text-sm text-muted-foreground">
                      Report pollution, waste, or noise issues in your community
                    </p>
                  </div>
                  <Button 
                    variant="hero" 
                    onClick={() => setShowNewComplaint(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Complaints List */}
            {complaints.map((complaint) => {
              const categoryInfo = getCategoryInfo(complaint.category);
              const statusInfo = getStatusInfo(complaint.status);
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={complaint.id} className="hover-lift cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Category & Priority Indicators */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-2xl">{categoryInfo.emoji}</div>
                        <Badge 
                          variant={complaint.priority === 'high' ? 'destructive' : 
                                  complaint.priority === 'medium' ? 'warning' : 'success'}
                          className="text-xs"
                        >
                          {complaint.priority.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-bold text-lg leading-tight">
                            {complaint.title}
                          </h3>
                          <Badge variant={statusInfo.color as any} className="shrink-0">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.text}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {complaint.description}
                        </p>

                        {/* Location & Reporter */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {complaint.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {complaint.reportedBy} • {complaint.reportedAt}
                          </div>
                        </div>

                        {/* Action Taken (if any) */}
                        {complaint.actionTaken && (
                          <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
                            <h4 className="font-semibold text-success text-sm mb-1">Action Update:</h4>
                            <p className="text-xs text-muted-foreground">{complaint.actionTaken}</p>
                          </div>
                        )}

                        {/* Engagement & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpvote(complaint.id)}
                              className="flex items-center gap-2 text-xs"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              {complaint.upvotes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-2 text-xs"
                            >
                              <MessageSquare className="w-4 h-4" />
                              {complaint.comments}
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {complaint.estimatedResolution && (
                              <Badge variant="outline" className="text-xs">
                                ETA: {complaint.estimatedResolution}
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedComplaint(complaint)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-primary" />
                  Community Impact 📊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">347</div>
                    <div className="text-xs text-muted-foreground">Total Complaints</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">89</div>
                    <div className="text-xs text-muted-foreground">Resolved</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-xl font-bold text-accent">25.7%</div>
                  <div className="text-xs text-muted-foreground">Resolution Rate This Month</div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Complaint Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { category: 'dust', count: 124 },
                  { category: 'air', count: 89 },
                  { category: 'noise', count: 67 },
                  { category: 'waste', count: 45 },
                  { category: 'water', count: 22 }
                ].map(({ category, count }) => {
                  const categoryInfo = getCategoryInfo(category);
                  return (
                    <div key={category} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{categoryInfo.emoji}</span>
                        <span className="text-sm font-medium">{categoryInfo.label}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover-lift">
              <CardContent className="pt-6 space-y-3">
                <Button variant="report" className="w-full">
                  <Plus className="w-4 h-4" />
                  Report New Issue
                </Button>
                <Button variant="eco" className="w-full">
                  <CheckCircle2 className="w-4 h-4" />
                  Volunteer for Solutions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CivicComplaints;