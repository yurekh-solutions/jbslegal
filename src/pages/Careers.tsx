import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Users, Heart, ArrowRight, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const positions = [
  {
    title: 'Senior Associate - Corporate Law',
    location: 'Mumbai, India',
    type: 'Full-time',
    department: 'Corporate & Commercial',
  },
  {
    title: 'Associate - Litigation',
    location: 'Delhi, India',
    type: 'Full-time',
    department: 'Dispute Resolution',
  },
  {
    title: 'Legal Analyst - M&A',
    location: 'Mumbai, India',
    type: 'Full-time',
    department: 'Mergers & Acquisitions',
  },
  {
    title: 'Paralegal',
    location: 'Remote',
    type: 'Full-time',
    department: 'Legal Operations',
  },
];

const benefits = [
  {
    icon: Briefcase,
    title: 'Challenging Work',
    description: 'Work on high-impact projects with leading organizations.',
  },
  {
    icon: GraduationCap,
    title: 'Professional Growth',
    description: 'Continuous learning through mentoring and development programs.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'An inclusive, supportive environment where teamwork thrives.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible arrangements that support your wellbeing.',
  },
];

const values = [
  'Integrity in all we do',
  'Excellence through continuous improvement',
  'Teamwork and collaboration',
  'Innovation and adaptability',
  'Commitment to client success',
];

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers | JBS Legal - Join Our Team</title>
        <meta name="description" content="Join JBS Legal and work on challenging, high-impact projects. Explore career opportunities for lawyers, analysts, and legal professionals." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero */}
          <section className="gradient-hero py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Join Our <span className="text-gradient">Team</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Build your career with a firm that values excellence, innovation, and professional growth.
              </p>
            </div>
          </section>

          {/* Why Work With Us */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-navy/10 to-gold/20 border border-gold/30 mb-4 shadow-md">
                  <Briefcase className="w-4 h-4 text-gold animate-pulse" />
                  <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                    Why Work With Us
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  A Career That Makes a Difference
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="glass-card p-6 text-center hover-lift">
                    <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Culture & Values */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-navy/10 border border-gold/30 mb-4">
                    <Heart className="w-4 h-4 text-gold" />
                    <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                      Our Culture
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Values That Drive Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    At JBS Legal, we foster an environment where talent thrives, ideas are valued, and professional growth is prioritized. Our culture is built on mutual respect, collaboration, and a shared commitment to excellence.
                  </p>
                  <ul className="space-y-3">
                    {values.map((value) => (
                      <li key={value} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-foreground">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-8 lg:p-12">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                    What We Offer
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li>Competitive compensation packages</li>
                    <li>Comprehensive health and wellness benefits</li>
                    <li>Professional development opportunities</li>
                    <li>Mentorship programs</li>
                    <li>Flexible working arrangements</li>
                    <li>Global exposure and networking</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 mb-4">
                  <GraduationCap className="w-4 h-4 text-gold" />
                  <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                    Open Positions
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Current Opportunities
                </h2>
              </div>

              <div className="grid gap-4 max-w-3xl mx-auto mb-12">
                {positions.map((position) => (
                  <div
                    key={position.title}
                    className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover-lift group"
                  >
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-navy transition-colors mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                        <span className="text-gold">{position.department}</span>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="md:flex-shrink-0"
                    >
                      <a href={`mailto:info@jbslegal.com?subject=Application for ${position.title}&body=Dear JBS Legal Team,%0D%0A%0D%0AI am interested in applying for the ${position.title} position.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards`}>
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Don't see a position that fits? Send us your resume.
                </p>
                <Button asChild variant="gold" size="lg">
                  <a href="mailto:info@jbslegal.com?subject=Resume Submission&body=Dear JBS Legal Team,%0D%0A%0D%0AI am interested in exploring career opportunities at JBS Legal.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards">
                    Submit Your Resume
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
