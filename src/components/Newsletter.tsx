import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  CheckCircle, 
  Sparkles, 
  Leaf, 
  Bell,
  ArrowRight
} from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast({
        title: "Welcome to the movement! 🌿",
        description: "You'll receive updates on community impact and new moss frames",
      });
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card className="glass-card border-0">
              <CardContent className="p-12">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-4">
                  You're In! 🎉
                </h3>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Welcome to the Kara community! You'll be the first to know about:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: Leaf, text: 'New Moss Frames' },
                    { icon: Bell, text: 'Impact Updates' },
                    { icon: Sparkles, text: 'Community Wins' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-4 glass-panel rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Button
                  variant="eco"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="glass-button"
                >
                  Explore Kara
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-semibold">Stay Updated</span>
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Join the Movement 📧
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get weekly updates on community impact, new moss frame collections, and environmental wins in Bengaluru
          </p>
        </motion.div>

        {/* Newsletter Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-32 h-14 text-lg rounded-2xl border-0 bg-background/50 focus:bg-background"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant="eco"
                    className="absolute right-2 top-2 rounded-xl glass-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[
                  {
                    icon: Bell,
                    title: 'Weekly Impact',
                    description: 'See how many hotspots were cleaned'
                  },
                  {
                    icon: Leaf,
                    title: 'New Products',
                    description: 'First access to limited moss frames'
                  },
                  {
                    icon: Sparkles,
                    title: 'Community Stories',
                    description: 'Inspiring wins from Bengaluru'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 glass-panel rounded-xl hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-6">
                No spam, ever. Unsubscribe anytime. 💚
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;