import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { 
  Building2, Briefcase, Shield, Lightbulb, Users, Home, Scale, Landmark, Globe, 
  FileText, Settings, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/home/ContactCTA';

const services = [
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate & Commercial Law',
    description: 'Comprehensive corporate legal solutions for businesses of all sizes.',
    details: [
      'Company formation & structuring',
      'Corporate governance & compliance',
      "Shareholders' agreements & joint ventures",
      'Corporate restructuring & business transactions',
    ],
  },
  {
    id: 'ma',
    icon: Briefcase,
    title: 'Mergers, Acquisitions & Investments',
    description: 'Strategic advisory for complex transactions and investments.',
    details: [
      'Due diligence & transaction advisory',
      'M&A structuring & negotiation',
      'Private equity & venture capital support',
      'Restructuring & divestiture solutions',
    ],
  },
  {
    id: 'regulatory',
    icon: Shield,
    title: 'Regulatory, Risk & Compliance',
    description: 'Navigate regulatory complexities with confidence.',
    details: [
      'Regulatory compliance audits',
      'Risk assessment & mitigation',
      'Anti-bribery & anti-corruption advisory',
      'Corporate policy design & implementation',
    ],
  },
  {
    id: 'ip',
    icon: Lightbulb,
    title: 'Intellectual Property & Technology Law',
    description: 'Protect and maximize the value of your innovations.',
    details: [
      'IP registration & protection (patents, trademarks, copyrights)',
      'Licensing & IP commercialization',
      'Technology, software, & IT agreements',
      'Data privacy & cybersecurity compliance',
    ],
  },
  {
    id: 'employment',
    icon: Users,
    title: 'Employment & Labour Law',
    description: 'Expert guidance on workforce legal matters.',
    details: [
      'Employment contracts & policies',
      'Labour compliance & dispute resolution',
      'HR advisory & compensation structuring',
      'Cross-border employment legal support',
    ],
  },
  {
    id: 'realestate',
    icon: Home,
    title: 'Real Estate & Infrastructure Law',
    description: 'Full-spectrum real estate and infrastructure advisory.',
    details: [
      'Property acquisition & leasing',
      'Construction & project agreements',
      'Real estate development advisory',
      'Infrastructure & public-private partnership (PPP) legal support',
    ],
  },
  {
    id: 'dispute',
    icon: Scale,
    title: 'Dispute Resolution & Litigation',
    description: 'Effective resolution of complex disputes.',
    details: [
      'Commercial, civil & corporate litigation',
      'Arbitration & mediation services',
      'Contractual & cross-border dispute management',
      'Regulatory & financial disputes',
    ],
  },
  {
    id: 'banking',
    icon: Landmark,
    title: 'Banking, Finance & Tax Law',
    description: 'Navigate financial regulations and optimize tax strategies.',
    details: [
      'Corporate finance advisory',
      'Banking regulation & compliance',
      'Securities & investment advisory',
      'Tax planning, compliance & representation',
    ],
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International & Cross-Border Law',
    description: 'Global legal solutions for international operations.',
    details: [
      'Cross-border transactions & M&A',
      'International trade & customs law',
      'Global regulatory & compliance guidance',
      'Immigration & expatriate legal advisory',
    ],
  },
  {
    id: 'family',
    icon: FileText,
    title: 'Family Business, Succession & Trusts',
    description: 'Preserve and protect family wealth across generations.',
    details: [
      'Succession planning & estate advisory',
      'Family governance & dispute management',
      'Wills, trusts & estate planning',
    ],
  },
  {
    id: 'operations',
    icon: Settings,
    title: 'Legal Operations & Outsourcing Support',
    description: 'Efficient legal process management and support.',
    details: [
      'Contract lifecycle management',
      'Corporate secretarial services',
      'Legal process outsourcing',
      'Compliance monitoring & reporting',
    ],
  },
];

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Legal Services | JBS Legal - Corporate, M&A, IP, Regulatory Law</title>
        <meta name="description" content="Explore JBS Legal's comprehensive legal services: Corporate Law, M&A, Regulatory Compliance, IP, Employment, Real Estate, Dispute Resolution, and Cross-Border Advisory." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero */}
          <section className="gradient-hero py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Our <span className="text-gradient">Legal Services</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Comprehensive legal services spanning corporate, regulatory, IP, employment, real estate, dispute resolution, and cross-border advisory.
              </p>
            </div>
          </section>

          {/* Services */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="glass-card overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleService(service.id)}
                      className="w-full p-6 lg:p-8 flex items-center gap-6 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-8 h-8 text-gold" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-1">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm lg:text-base">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedService === service.id ? (
                          <ChevronUp className="w-6 h-6 text-gold" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                        <div className="pl-[88px]">
                          <div className="border-t border-border pt-6">
                            <h4 className="font-semibold text-foreground mb-4">Key Services:</h4>
                            <ul className="grid md:grid-cols-2 gap-3">
                              {service.details.map((detail, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                  <ArrowRight className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                                  <span className="text-sm">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Services;
