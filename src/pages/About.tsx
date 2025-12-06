import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart, Users, Award, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/home/ContactCTA';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Heart, title: 'Integrity & Ethics', description: 'Upholding the highest standards of professional conduct.' },
  { icon: Users, title: 'Client-Centric Solutions', description: 'Putting client needs at the center of everything we do.' },
  { icon: Award, title: 'Excellence & Innovation', description: 'Striving for excellence through innovative approaches.' },
  { icon: Lightbulb, title: 'Practical & Clear Advice', description: 'Delivering actionable guidance without unnecessary complexity.' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | JBS Legal - Full-Service Law Firm</title>
        <meta name="description" content="Learn about JBS Legal's mission, values, and expert team. We combine legal expertise with commercial insight to serve businesses globally." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero */}
          <section className="gradient-hero py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                About <span className="text-gradient">JBS Legal</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Combining legal expertise with commercial insight to help you navigate complex challenges.
              </p>
            </div>
          </section>

          {/* Who We Are */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-navy/10 border border-gold/30 mb-4">
                    <Users className="w-4 h-4 text-gold" />
                    <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                      Who We Are
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    A Full-Service Law Firm with Global Reach
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    JBS Legal is a full-service law firm combining legal expertise with commercial insight. We provide strategic advice to businesses, investors, and individuals navigating complex legal and regulatory environments.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    With offices in India and the USA, we deliver cross-border solutions while maintaining deep understanding of local laws and business practices.
                  </p>
                </div>
                <div className="glass-card p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-6">Our Approach</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Business-first mindset:</strong> Align legal strategies with your objectives.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Collaborative:</strong> Partnering closely to understand client needs.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Innovative:</strong> Leveraging technology and best practices for efficiency.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Global & Local:</strong> Delivering cross-border solutions with local expertise.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card p-8 lg:p-12 hover-lift">
                  <div className="w-16 h-16 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be recognized as a leading law firm delivering actionable, client-focused legal services globally, setting the standard for excellence and innovation in legal practice.
                  </p>
                </div>
                <div className="glass-card p-8 lg:p-12 hover-lift">
                  <div className="w-16 h-16 rounded-xl bg-navy/20 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-navy" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To help clients navigate complexity with clarity, minimize risk, and achieve sustainable growth through strategic, practical legal solutions tailored to their unique needs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section ref={sectionRef} className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-navy/10 to-gold/20 border border-gold/30 mb-4 shadow-md">
                  <Heart className="w-4 h-4 text-gold animate-pulse" />
                  <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                    Our Values
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  The Principles That Guide Us
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={value.title} className="fade-up glass-card p-6 text-center hover-lift opacity-0">
                    <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ContactCTA />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
