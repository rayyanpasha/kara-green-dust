import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  HelpCircle, 
  Leaf, 
  MapPin, 
  ShoppingBag, 
  Users,
  Recycle,
  Heart
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'reporting' | 'shopping' | 'community';
  icon: any;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      icon: Leaf,
      question: 'What is Kara and how does it work?',
      answer: 'Kara is a civic-tech platform that transforms dust pollution into living air purifiers. Community members report dust hotspots, we collect the dust, and convert it into beautiful moss frames that purify the air. Revenue from moss frame sales funds more community cleanups!'
    },
    {
      id: '2',
      category: 'reporting',
      icon: MapPin,
      question: 'How do I report a dust hotspot?',
      answer: 'Simply click the "Report Hotspot" button, pin the location on the map, add photos if possible, and describe the pollution level. Our community will verify and prioritize the cleanup based on community votes and severity.'
    },
    {
      id: '3',
      category: 'shopping',
      icon: ShoppingBag,
      question: 'How are moss frames made from dust?',
      answer: 'We use collected dust as a natural growing medium for specially selected moss species. The dust provides nutrients while the moss purifies the air by absorbing pollutants. Each frame is handcrafted by local artisans in Bengaluru.'
    },
    {
      id: '4',
      category: 'community',
      icon: Users,
      question: 'How can schools and communities get involved?',
      answer: 'Schools can organize cleanup drives, students can become hotspot reporters, and communities can host moss frame workshops. We provide educational materials and support for group participation. Contact us for community partnership programs!'
    },
    {
      id: '5',
      category: 'general',
      icon: Recycle,
      question: 'Is this environmentally safe?',
      answer: 'Absolutely! Our process is completely eco-friendly. We use natural filtration methods to clean collected dust, and the moss species we use are native to the region. All materials are biodegradable and sustainable.'
    },
    {
      id: '6',
      category: 'shopping',
      icon: Heart,
      question: 'Do moss frames really improve air quality?',
      answer: 'Yes! Studies show that moss can absorb up to 20 times its weight in dust and pollutants. Our frames include specific moss varieties known for their air-purifying properties, making them both beautiful and functional additions to your space.'
    }
  ];

  const categories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'reporting', name: 'Reporting', icon: MapPin },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
    { id: 'community', name: 'Community', icon: Users }
  ];

  const [activeCategory, setActiveCategory] = useState('general');

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredFAQs = faqData.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="faq">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold">Frequently Asked Questions</span>
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Got Questions? 🤔
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about transforming dust into green solutions
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "eco" : "ghost"}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full ${
                activeCategory === category.id ? 'glass-button' : ''
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => {
            const isOpen = openItems.includes(item.id);
            const ItemIcon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card border-0 overflow-hidden">
                  <motion.button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                    onClick={() => toggleItem(item.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ItemIcon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{item.question}</h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </motion.button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <CardContent className="px-6 pb-6 pt-0">
                      <div className="pl-14">
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Still have questions? We'd love to help! 💬
          </p>
          <Button variant="eco" size="lg" className="glass-button">
            <HelpCircle className="w-5 h-5 mr-2" />
            Contact Support
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;