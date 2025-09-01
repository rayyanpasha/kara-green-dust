import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Leaf, 
  MapPin, 
  ShoppingBag, 
  BarChart3, 
  MessageSquare,
  Search,
  Bell,
  User
} from 'lucide-react';
import karaLogo from '@/assets/kara-logo.png';

interface NavigationProps {
  onSearchOpen?: () => void;
}

const Navigation = ({ onSearchOpen }: NavigationProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setHasScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  const navItems = [
    { name: 'Hotspots', icon: MapPin, href: '#hotspots' },
    { name: 'Shop', icon: ShoppingBag, href: '#shop' },
    { name: 'Impact', icon: BarChart3, href: '#impact' },
    { name: 'Community', icon: MessageSquare, href: '#community' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={karaLogo} alt="KARA" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                KARA
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Environmental Movement</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                onClick={() => onSearchOpen?.()}
              >
                <Search className="w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="eco"
                size="sm"
                className="rounded-full glass-button"
              >
                <User className="w-4 h-4" />
                Join Movement
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          backdropFilter: isOpen ? 'blur(20px)' : 'blur(0px)'
        }}
      >
        <div className="absolute inset-0 bg-background/80" onClick={() => setIsOpen(false)} />
        
        <motion.div
          className="absolute top-20 left-6 right-6 glass-card rounded-3xl p-6"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -20,
            scale: isOpen ? 1 : 0.95
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-primary/10 transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </motion.button>
            ))}
            
            <div className="pt-4 border-t border-border/50">
              <Button variant="eco" className="w-full glass-button">
                <User className="w-4 h-4" />
                Join Movement
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navigation;