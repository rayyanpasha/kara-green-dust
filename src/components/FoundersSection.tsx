import { Card } from '@/components/ui/card';
import founderKanishka from '@/assets/founder-kanishka.jpg';
import founderRayyan from '@/assets/founder-rayyan.jpg';
import { Linkedin, Mail } from 'lucide-react';

const FoundersSection = () => {
  const founders = [
    {
      name: "Kanishka Raghavendra",
      role: "Co-Founder & Environmental Scientist",
      image: founderKanishka,
      bio: "Leading Bengaluru's transition to living solutions with expertise in environmental restoration and community engagement.",
      linkedin: "#",
      email: "kanishka@kara.eco"
    },
    {
      name: "Rayyan Pasha",
      role: "Co-Founder & Technology Director", 
      image: founderRayyan,
      bio: "Pioneering the integration of biotechnology and urban planning to create sustainable moss-based solutions.",
      linkedin: "#",
      email: "rayyan@kara.eco"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Meet the Founders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two visionaries transforming Bengaluru's urban landscape through innovative moss-based environmental solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <Card key={index} className="glass-card p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Founder
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {founder.name}
              </h3>
              
              <p className="text-primary font-medium mb-4">
                {founder.role}
              </p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {founder.bio}
              </p>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href={founder.linkedin}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={`mailto:${founder.email}`}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;