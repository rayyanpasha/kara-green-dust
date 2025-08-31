import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  MapPin, 
  ShoppingBag, 
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'hotspot' | 'product' | 'complaint' | 'page';
  description: string;
  icon: any;
  href: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Koramangala Dust Hotspot',
      type: 'hotspot',
      description: 'High dust pollution reported near forum mall',
      icon: MapPin,
      href: '#hotspots'
    },
    {
      id: '2',
      title: 'Premium Moss Frame Collection',
      type: 'product',
      description: 'Handcrafted air-purifying moss frames',
      icon: ShoppingBag,
      href: '#shop'
    },
    {
      id: '3',
      title: 'Construction Noise Complaint - Indiranagar',
      type: 'complaint',
      description: 'Excessive noise during night hours',
      icon: MessageSquare,
      href: '#community'
    },
    {
      id: '4',
      title: 'BTM Layout Air Quality',
      type: 'hotspot',
      description: 'Community reports improved after cleanup',
      icon: MapPin,
      href: '#hotspots'
    },
    {
      id: '5',
      title: 'Mini Desktop Moss Garden',
      type: 'product',
      description: 'Perfect for office spaces and study tables',
      icon: ShoppingBag,
      href: '#shop'
    }
  ];

  const popularSearches = [
    'Koramangala hotspots',
    'Best moss frames',
    'Air quality tips',
    'Report pollution',
    'Community impact'
  ];

  useEffect(() => {
    if (query.length > 2) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotspot': return 'destructive';
      case 'product': return 'eco';
      case 'complaint': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-2xl p-6"
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="glass-card rounded-3xl border-0 overflow-hidden">
              {/* Search Input */}
              <div className="p-6 border-b border-border/50">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search hotspots, products, complaints..."
                    className="pl-12 pr-12 h-14 text-lg rounded-2xl border-0 bg-background/50 focus:bg-background"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="absolute right-2 top-2 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {query.length > 2 ? (
                  results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => {
                        const ResultIcon = result.icon;
                        return (
                          <motion.button
                            key={result.id}
                            className="w-full p-4 rounded-2xl hover:bg-primary/5 transition-colors text-left flex items-center gap-4 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              // Navigate to result
                              const element = document.querySelector(result.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                              onClose();
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <ResultIcon className="w-5 h-5 text-primary" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium group-hover:text-primary transition-colors">
                                  {result.title}
                                </h4>
                                <Badge 
                                  variant={getTypeColor(result.type) as any}
                                  className="text-xs px-2 py-0"
                                >
                                  {result.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {result.description}
                              </p>
                            </div>
                            
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No results found for "{query}"</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Try searching for hotspots, moss frames, or complaints
                      </p>
                    </div>
                  )
                ) : (
                  // Popular Searches
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Popular Searches</span>
                    </div>
                    
                    <div className="space-y-2">
                      {popularSearches.map((search, index) => (
                        <motion.button
                          key={search}
                          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setQuery(search)}
                        >
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="group-hover:text-primary transition-colors">{search}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;