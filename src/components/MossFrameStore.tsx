import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Leaf, 
  CheckCircle, 
  Truck,
  ArrowRight
} from 'lucide-react';
import mossFramesImage from '@/assets/moss-frames-collection.jpg';

interface MossFrame {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  size: string;
  dustSource: string;
  airPurificationRate: string;
  impactStory: string;
  inStock: boolean;
  badges: string[];
}

const MossFrameStore = () => {
  const [selectedFrame, setSelectedFrame] = useState<MossFrame | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const mossFrames: MossFrame[] = [
    {
      id: '1',
      name: 'Urban Oasis Frame',
      price: 2499,
      originalPrice: 3299,
      image: mossFramesImage,
      rating: 4.8,
      reviews: 124,
      description: 'A beautiful living artwork that transforms collected urban dust into thriving moss ecosystem',
      size: '12" x 16"',
      dustSource: 'Connaught Place Construction Site',
      airPurificationRate: '15-20 sq ft coverage',
      impactStory: 'Made from 2.3kg of dust collected by the Connaught Place community team',
      inStock: true,
      badges: ['Bestseller', 'Community Made']
    },
    {
      id: '2',
      name: 'Pocket Purifier',
      price: 999,
      image: mossFramesImage,
      rating: 4.6,
      reviews: 89,
      description: 'Compact moss frame perfect for desks, bedside tables, and small spaces',
      size: '6" x 8"',
      dustSource: 'Karol Bagh Market Area',
      airPurificationRate: '5-8 sq ft coverage',
      impactStory: 'Created from dust collected during weekend community cleanup drives',
      inStock: true,
      badges: ['Compact Size', 'Teen Favorite']
    },
    {
      id: '3',
      name: 'Living Wall Panel',
      price: 4999,
      originalPrice: 6499,
      image: mossFramesImage,
      rating: 5.0,
      reviews: 67,
      description: 'Large statement piece that transforms any wall into a breathing green space',
      size: '24" x 32"',
      dustSource: 'Delhi Metro Construction Sites',
      airPurificationRate: '40-50 sq ft coverage',
      impactStory: 'Assembled from dust collected by 15 different community groups across Delhi',
      inStock: true,
      badges: ['Premium', 'High Impact', 'Limited Edition']
    },
    {
      id: '4',
      name: 'Zen Garden Moss',
      price: 1799,
      image: mossFramesImage,
      rating: 4.7,
      reviews: 156,
      description: 'Meditation-inspired circular frame with carefully curated moss varieties',
      size: '10" diameter',
      dustSource: 'India Gate Tourist Area',
      airPurificationRate: '10-12 sq ft coverage',
      impactStory: 'Features moss grown from dust collected by student volunteers during Earth Week',
      inStock: false,
      badges: ['Meditation', 'Circular Design']
    }
  ];

  const toggleFavorite = (frameId: string) => {
    setFavorites(prev => 
      prev.includes(frameId) 
        ? prev.filter(id => id !== frameId)
        : [...prev, frameId]
    );
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Moss Frame Marketplace 🛒
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your space with living art made from collected dust. Every purchase funds more community cleanups!
          </p>
        </div>

        {/* Impact Banner */}
        <Card className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary">₹2,47,890</div>
                <div className="text-sm text-muted-foreground">Raised for Community Cleanups</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">423</div>
                <div className="text-sm text-muted-foreground">Frames Creating Cleaner Air</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">89.2kg</div>
                <div className="text-sm text-muted-foreground">Dust Transformed This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {mossFrames.map((frame) => (
            <Card key={frame.id} className="hover-lift cursor-pointer overflow-hidden group">
              <div className="relative">
                <img 
                  src={frame.image} 
                  alt={frame.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {frame.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/90 text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(frame.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full transition-all duration-200 hover:bg-white hover:scale-110"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(frame.id) 
                        ? 'text-destructive fill-destructive' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                </button>

                {/* Stock Status */}
                {!frame.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{frame.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-muted-foreground">
                      {frame.rating} ({frame.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {frame.description}
                </p>

                {/* Key Details */}
                <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-3 h-3 text-success" />
                    <span>{frame.size} • {frame.airPurificationRate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    <span>From: {frame.dustSource}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">₹{frame.price.toLocaleString()}</span>
                    {frame.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{frame.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {frame.originalPrice && (
                    <Badge variant="success" className="text-xs">
                      Save ₹{(frame.originalPrice - frame.price).toLocaleString()}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    variant={frame.inStock ? "hero" : "outline"} 
                    className="w-full"
                    disabled={!frame.inStock}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {frame.inStock ? 'Add to Cart' : 'Notify When Available'}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedFrame(frame)}
                  >
                    View Impact Story
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Story Modal (Simplified) */}
        {selectedFrame && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-success" />
                    {selectedFrame.name} - Impact Story
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedFrame(null)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <img 
                  src={selectedFrame.image} 
                  alt={selectedFrame.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <div className="bg-success/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">Community Impact</h4>
                  <p className="text-sm">{selectedFrame.impactStory}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Specifications</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>Size: {selectedFrame.size}</div>
                      <div>Coverage: {selectedFrame.airPurificationRate}</div>
                      <div>Source: {selectedFrame.dustSource}</div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Your Impact</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Funds 3 community cleanups
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        Free delivery to Delhi NCR
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-secondary" />
                        1 year moss maintenance guide
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="hero" className="flex-1">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart - ₹{selectedFrame.price.toLocaleString()}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedFrame(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default MossFrameStore;