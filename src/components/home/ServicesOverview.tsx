import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Briefcase, 
  Shield, 
  Lightbulb, 
  Users, 
  Home,
  Scale,
  Landmark,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Building2, title: 'Corporate & Commercial Law', description: 'Company formation, governance, and business transactions' },
  { icon: Briefcase, title: 'Mergers & Acquisitions', description: 'Due diligence, M&A structuring, and investment advisory' },
  { icon: Shield, title: 'Regulatory & Compliance', description: 'Risk assessment, audits, and policy implementation' },
  { icon: Lightbulb, title: 'Intellectual Property & Technology', description: 'IP protection, licensing, and tech agreements' },
  { icon: Users, title: 'Employment & Labour Law', description: 'Contracts, compliance, and dispute resolution' },
  { icon: Home, title: 'Real Estate & Infrastructure', description: 'Property acquisition, development, and PPP support' },
  { icon: Scale, title: 'Dispute Resolution & Litigation', description: 'Commercial litigation, arbitration, and mediation' },
  { icon: Landmark, title: 'Banking, Finance & Tax', description: 'Corporate finance, securities, and tax planning' },
  { icon: Globe, title: 'International & Cross-Border', description: 'Cross-border transactions and global regulatory guidance' },
];

const ServicesOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-gold/40 mb-4">
            <Briefcase className="w-4 h-4 text-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Comprehensive Legal Solutions
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            We provide end-to-end legal services spanning corporate, regulatory, IP, employment, real estate, disputes, and international advisory.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card flip-card h-72 opacity-0 group"
            >
              <div className="flip-card-inner relative w-full h-full">
                {/* Front */}
                <div className="flip-card-front absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center border-2 border-gold/20 hover:border-gold/40 transition-colors overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/20 to-transparent rounded-bl-full opacity-50" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gold/20 to-transparent rounded-tr-full opacity-50" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <service.icon className="w-10 h-10 text-gold drop-shadow-lg" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-foreground leading-tight">
                      {service.title}
                    </h3>
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute inset-0 p-6 flex flex-col justify-between text-center overflow-hidden rounded-xl border-2 border-gold shadow-2xl">
                  {/* Rich gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold-light to-gold-dark" />
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-hero-pattern opacity-5" />
                  
                  {/* Animated gradient orbs for depth */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl animate-pulse-slow" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-radial from-gold-dark/30 to-transparent rounded-full blur-3xl" />
                  
                  {/* Subtle diagonal lines */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-navy-dark transform -rotate-12" />
                    <div className="absolute top-0 right-1/4 w-px h-full bg-navy-dark transform rotate-12" />
                  </div>
                  
                  {/* Top section - Icon and Title */}
                  <div className="relative z-10 pt-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/30">
                      <service.icon className="w-8 h-8 text-navy-dark" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy-dark leading-tight drop-shadow-sm px-2">
                      {service.title}
                    </h3>
                  </div>

                  {/* Middle section - Description */}
                  <div className="relative z-10 flex-1 flex items-center justify-center px-2">
                    <p className="text-navy-dark/90 text-sm leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom section - Button */}
                  <div className="relative z-10 pb-4">
                    <div className="w-12 h-0.5 bg-navy-dark/40 mx-auto mb-4 rounded-full" />
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy-dark text-white rounded-lg font-semibold text-sm hover:bg-navy transition-all hover:gap-3 hover:shadow-xl transform hover:-translate-y-1 shadow-lg"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="hero" size="xl">
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
