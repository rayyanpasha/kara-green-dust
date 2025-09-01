import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, Heart, ShoppingCart, Info, Ruler, MapPin, Wind, Sparkles, TrendingUp, Users, Package, Paintbrush } from 'lucide-react';
import mossFramesImage from '@/assets/moss-frames-collection.jpg';

interface MossProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  category: 'frame' | 'applicant' | 'kit' | 'paint';
  specifications: string;
  application: string;
  coverage: string;
  impactStory: string;
  inStock: boolean;
  badges: string[];
}

const MossFrameStore = () => {
  const [selectedProduct, setSelectedProduct] = useState<MossProduct | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const mossProducts: MossProduct[] = [
    // Moss Frames
    {
      id: 1,
      name: "Urban Dust Moss Frame - Cubbon Park Collection",
      price: 3500,
      image: mossFramesImage,
      rating: 4.9,
      description: "Living artwork created from dust collected around Cubbon Park, transformed into thriving moss ecosystem.",
      category: 'frame',
      specifications: "30cm x 40cm, Natural wood frame",
      application: "Wall mounting, Indoor air purification",
      coverage: "Purifies 15 sqm area",
      impactStory: "This frame represents 2.5kg of urban dust that would have polluted our air, now purifying your space while creating natural beauty.",
      inStock: true,
      badges: ["Bestseller", "Eco-Friendly", "Handcrafted"]
    },
    // Moss Applicants - POP Based
    {
      id: 2,
      name: "Moss-Infused POP - Wall Application",
      price: 1200,
      image: mossFramesImage,
      rating: 4.8,
      description: "Revolutionary moss-embedded Plaster of Paris for creating living walls that naturally purify air.",
      category: 'applicant',
      specifications: "5kg bag, covers 25 sqm",
      application: "Mix with water, apply on walls, moss activates in 7-10 days",
      coverage: "25 sqm wall coverage",
      impactStory: "Each bag transforms ordinary walls into air-purifying surfaces, removing 200mg pollutants daily per sqm.",
      inStock: true,
      badges: ["Revolutionary", "DIY Friendly", "High Coverage"]
    },
    // Moss Paint
    {
      id: 3,
      name: "Moss-Active Paint - Bengaluru Blend",
      price: 2800,
      image: mossFramesImage,
      rating: 4.9,
      description: "Specialized paint infused with moss spores that develop into living air purification systems on your walls.",
      category: 'paint',
      specifications: "4L can, water-based, non-toxic",
      application: "Apply like regular paint, mist weekly for moss activation",
      coverage: "40 sqm wall coverage",
      impactStory: "Creates living walls that remove formaldehyde, benzene, and other indoor pollutants while adding natural beauty.",
      inStock: true,
      badges: ["Innovative", "Easy Application", "Living Paint"]
    },
    // Starter Kits
    {
      id: 4,
      name: "Moss Garden Starter Kit - Balcony Edition",
      price: 1800,
      image: mossFramesImage,
      rating: 4.7,
      description: "Complete kit to create your own moss garden using collected dust, perfect for Bengaluru balconies.",
      category: 'kit',
      specifications: "Includes containers, growth medium, moss cultures, tools",
      application: "Follow guide to create 5 moss containers from local dust",
      coverage: "Creates 5 small moss gardens",
      impactStory: "Enables families to transform their daily dust collection into thriving mini-ecosystems that purify 50L air/hour.",
      inStock: true,
      badges: ["Complete Kit", "Educational", "Family Project"]
    },
    // Advanced Applicants
    {
      id: 5,
      name: "Industrial Moss Compound - Heavy Duty",
      price: 4200,
      image: mossFramesImage,
      rating: 4.8,
      description: "Professional-grade moss compound for large-scale applications in offices and commercial spaces.",
      category: 'applicant',
      specifications: "20kg industrial pack",
      application: "Professional application recommended, covers large areas",
      coverage: "100 sqm coverage",
      impactStory: "Designed for Electronic City offices, each application can remove industrial pollutants equivalent to 50 air purifiers.",
      inStock: true,
      badges: ["Professional", "Industrial Grade", "High Impact"]
    },
    // Specialty Paints
    {
      id: 6,
      name: "Heritage Moss Paint - Palace Series",
      price: 3500,
      image: mossFramesImage,
      rating: 5.0,
      description: "Premium moss paint using indigenous species, perfect for heritage building restoration with modern benefits.",
      category: 'paint',
      specifications: "3L premium can, heritage colors available",
      application: "Specialized application for heritage buildings",
      coverage: "30 sqm premium coverage",
      impactStory: "Preserves heritage aesthetics while adding modern air purification, removing 150mg pollutants per sqm daily.",
      inStock: true,
      badges: ["Heritage", "Premium", "Conservation Grade"]
    }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = [
    { id: 'all', name: 'All Products', count: mossProducts.length },
    { id: 'frame', name: 'Moss Frames', count: mossProducts.filter(p => p.category === 'frame').length },
    { id: 'applicant', name: 'Moss Applicants', count: mossProducts.filter(p => p.category === 'applicant').length },
    { id: 'paint', name: 'Moss Paint', count: mossProducts.filter(p => p.category === 'paint').length },
    { id: 'kit', name: 'Starter Kits', count: mossProducts.filter(p => p.category === 'kit').length },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? mossProducts 
    : mossProducts.filter(product => product.category === selectedCategory);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Moss Solutions Marketplace ✨
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform urban pollution into living solutions. From moss frames to innovative applicants and paints, 
            discover products that turn waste into air-purifying ecosystems.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'glass-card hover:bg-primary/10'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
          
          {/* Impact Banner */}
          <div className="glass-card p-8 mb-12 bg-gradient-elegant">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-3xl font-bold text-primary">₹4,47,890</div>
                  <div className="text-sm text-muted-foreground">Revenue This Month</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-secondary" />
                <div>
                  <div className="text-3xl font-bold text-secondary">1,423</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-3xl font-bold text-accent">189.2kg</div>
                  <div className="text-sm text-muted-foreground">Dust Transformed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="glass-card overflow-hidden group hover:scale-105 transition-all duration-500 border-2 hover:border-primary/30">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      favorites.includes(product.id) 
                        ? 'bg-red-500 text-white scale-110' 
                        : 'bg-white/20 text-white hover:bg-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/90 text-primary-foreground text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm px-3 py-1">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-3 h-3 text-primary" />
                    <span>{product.specifications}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Paintbrush className="w-3 h-3 text-primary" />
                    <span>{product.coverage}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                      className="hover:bg-primary hover:text-primary-foreground p-2"
                    >
                      <Info className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      disabled={!product.inStock}
                      className="bg-primary hover:bg-primary/90 text-xs px-3"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {product.inStock ? 'Add' : 'Notify'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-primary">
                      ₹{selectedProduct.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedProduct.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary" />
                        <div>
                          <span className="font-medium">Product:</span>
                          <span className="text-muted-foreground ml-2">{selectedProduct.specifications}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Paintbrush className="w-5 h-5 text-primary" />
                        <div>
                          <span className="font-medium">Application:</span>
                          <span className="text-muted-foreground ml-2">{selectedProduct.application}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Ruler className="w-5 h-5 text-primary" />
                        <div>
                          <span className="font-medium">Coverage:</span>
                          <span className="text-muted-foreground ml-2">{selectedProduct.coverage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Impact Story</h3>
                    <p className="text-muted-foreground leading-relaxed bg-primary/5 p-4 rounded-lg">
                      {selectedProduct.impactStory}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Environmental Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-secondary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {selectedProduct.category === 'frame' ? '2.5kg' : selectedProduct.category === 'paint' ? '150mg' : '200mg'}
                        </div>
                        <div className="text-sm text-muted-foreground">Daily Pollutant Removal</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {selectedProduct.category === 'frame' ? '15L' : selectedProduct.category === 'paint' ? '40L' : '25L'}
                        </div>
                        <div className="text-sm text-muted-foreground">Air Purified/Hour</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={!selectedProduct.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {selectedProduct.inStock ? 'Add to Cart' : 'Notify When Available'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(selectedProduct.id) ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default MossFrameStore;