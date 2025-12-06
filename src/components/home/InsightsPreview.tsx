import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const insights = [
  {
    category: 'Data Privacy',
    title: 'Navigating Data Privacy Laws in India: Challenges & Opportunities',
    excerpt: 'Understanding the evolving landscape of data protection regulations and compliance requirements for businesses.',
    date: 'Dec 2024',
    readTime: '8 min read',
  },
  {
    category: 'M&A',
    title: 'Structuring Cross-Border M&A Transactions: A Practical Guide',
    excerpt: 'Key considerations and best practices for successful international mergers and acquisitions.',
    date: 'Nov 2024',
    readTime: '12 min read',
  },
  {
    category: 'Employment',
    title: 'Employment Law Challenges for Startups in India',
    excerpt: 'Essential compliance requirements and HR strategies for emerging companies in the Indian market.',
    date: 'Oct 2024',
    readTime: '6 min read',
  },
];

const InsightsPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.insight-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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
    <section ref={sectionRef} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-navy/10 to-gold/20 border border-gold/30 mb-4 shadow-lg">
              <Lightbulb className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                Insights & Thought Leadership
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Latest Legal Insights
            </h2>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link to="/insights">
              View All Insights
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Link
              key={insight.title}
              to="/insights"
              className="insight-card group opacity-0"
            >
              <article className="glass-card h-full p-6 flex flex-col hover-lift">
                <span className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                  {insight.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-navy transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                  {insight.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {insight.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {insight.readTime}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;
