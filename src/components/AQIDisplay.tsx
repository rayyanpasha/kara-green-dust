import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wind, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Thermometer,
  Droplets,
  Eye,
  MapPin
} from 'lucide-react';

interface AQIData {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  status: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  temperature: number;
  humidity: number;
  visibility: number;
}

const AQIDisplay = () => {
  const [aqiData, setAqiData] = useState<AQIData>({
    city: 'New Delhi',
    aqi: 187,
    pm25: 94,
    pm10: 158,
    status: 'unhealthy',
    temperature: 28,
    humidity: 65,
    visibility: 2.1
  });

  const [healthTips, setHealthTips] = useState<string[]>([]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'good':
        return { 
          color: 'success', 
          icon: CheckCircle, 
          text: 'Good 😊', 
          bgColor: 'bg-success/10',
          tips: [
            '🚴‍♂️ Perfect for outdoor activities!',
            '🌱 Great day to plant some greenery',
            '🪟 Keep windows open for fresh air'
          ]
        };
      case 'moderate':
        return { 
          color: 'warning', 
          icon: AlertTriangle, 
          text: 'Moderate 😐', 
          bgColor: 'bg-warning/10',
          tips: [
            '😷 Consider wearing a mask outdoors',
            '💧 Stay hydrated with plenty of water',
            '🏠 Limit outdoor activities during peak hours'
          ]
        };
      case 'unhealthy':
        return { 
          color: 'destructive', 
          icon: XCircle, 
          text: 'Unhealthy 😷', 
          bgColor: 'bg-destructive/10',
          tips: [
            '😷 Wear N95 masks when going outside',
            '🏠 Stay indoors as much as possible',
            '💨 Use air purifiers at home',
            '🚫 Avoid outdoor exercise completely'
          ]
        };
      default:
        return { 
          color: 'destructive', 
          icon: XCircle, 
          text: 'Hazardous ⚠️', 
          bgColor: 'bg-destructive/20',
          tips: [
            '🚨 Emergency: Stay indoors at all times!',
            '😷 N95+ masks are essential if you must go out',
            '💨 Run air purifiers on high',
            '🏥 Seek medical help if you feel unwell'
          ]
        };
    }
  };

  useEffect(() => {
    const statusInfo = getStatusInfo(aqiData.status);
    setHealthTips(statusInfo.tips);
  }, [aqiData.status]);

  const statusInfo = getStatusInfo(aqiData.status);
  const StatusIcon = statusInfo.icon;

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Live Air Quality 🌬️
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time pollution data and personalized health tips for your city
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* AQI Main Display */}
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">{aqiData.city}</CardTitle>
              </div>
              <Badge variant="secondary" className="mx-auto">
                Live Update • Just now
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              {/* Main AQI Circle */}
              <div className={`relative w-48 h-48 mx-auto mb-8 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}>
                <div className="text-center">
                  <StatusIcon className={`w-8 h-8 text-${statusInfo.color} mx-auto mb-2`} />
                  <div className="text-5xl font-bold text-foreground">{aqiData.aqi}</div>
                  <div className="text-sm text-muted-foreground">AQI Index</div>
                </div>
              </div>

              <Badge 
                variant={statusInfo.color as any} 
                className="text-lg px-6 py-2 mb-6"
              >
                {statusInfo.text}
              </Badge>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{aqiData.pm25}</div>
                  <div className="text-sm text-muted-foreground">PM2.5 μg/m³</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{aqiData.pm10}</div>
                  <div className="text-sm text-muted-foreground">PM10 μg/m³</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Tips & Weather */}
          <div className="space-y-6">
            {/* Health Tips */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-primary" />
                  Health Tips for Teens 💪
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {healthTips.map((tip, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-muted"
                    >
                      <div className="text-lg">{tip.split(' ')[0]}</div>
                      <div className="text-sm flex-1">{tip.substring(tip.indexOf(' ') + 1)}</div>
                    </div>
                  ))}
                </div>
                <Button variant="eco" className="w-full mt-6">
                  <MapPin className="w-4 h-4" />
                  Report Air Quality Issue
                </Button>
              </CardContent>
            </Card>

            {/* Weather Details */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-accent" />
                  Weather Conditions 🌤️
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <Thermometer className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold">{aqiData.temperature}°C</div>
                    <div className="text-xs text-muted-foreground">Temperature</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{aqiData.humidity}%</div>
                    <div className="text-xs text-muted-foreground">Humidity</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Eye className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{aqiData.visibility}km</div>
                    <div className="text-xs text-muted-foreground">Visibility</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AQIDisplay;