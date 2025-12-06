import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const AboutSnapshot = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.about-stats',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Clients Served' },
    { number: '50+', label: 'Experts' },
    { number: '2', label: 'Countries' },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="about-content opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 mb-4">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                About JBS Legal
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Integrated Legal Solutions for{' '}
              <span className="text-navy">Complex Challenges</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              JBS Legal is a full-service law firm delivering integrated legal solutions for complex business challenges. Our team of seasoned professionals brings together expertise across multiple domains of law, regulatory frameworks, and cross-border advisory.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With a business-first mindset, we align legal strategies with your objectives, partnering closely to understand your needs and deliver innovative, technology-driven solutions.
            </p>
            <Button asChild variant="navy" size="lg">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="about-stats opacity-0">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-8 text-center hover-lift"
                >
                  <div className="font-display text-4xl lg:text-5xl font-bold text-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
