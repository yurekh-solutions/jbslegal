import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  ArrowRight,
  FileText,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

// Add Unsplash images for each service
const services = [
  {
    icon: Building2,
    title: "Corporate & Commercial Law",
    description: "Company formation, governance, and business transactions",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Briefcase,
    title: "Mergers & Acquisitions",
    description: "Due diligence, M&A structuring, and investment advisory",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Shield,
    title: "Regulatory & Compliance",
    description: "Risk assessment, audits, and policy implementation",
    image:
     'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=90', gradient: 'from-blue-600 to-cyan-500'
  },
  {
    icon: Lightbulb,
    title: "Intellectual Property & Technology",
    description: "IP protection, licensing, and tech agreements",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Users,
    title: "Employment & Labour Law",
    description: "Contracts, compliance, and dispute resolution",
    image:
         'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=90', gradient: 'from-purple-600 to-pink-500'

  },
  {
    icon: Home,
    title: "Real Estate & Infrastructure",
    description: "Property acquisition, development, and PPP support",
    image:
         'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=90', gradient: 'from-orange-600 to-yellow-500'

  },
  {
    icon: Scale,
    titl: Scale,
    title: "Dispute Resolution & Litigation",
    description: "Commercial litigation, arbitration, mediation",
    image:
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=90', gradient: 'from-teal-600 to-blue-500' 
 },
  {
    icon: Landmark,
    title: "Banking, Finance & Tax",
    description: "Corporate finance, securities, and tax planning",
    image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",

  },
  {
    icon: Globe,
    title: "International & Cross-Border",
    description: "Cross-border transactions and global regulatory guidance",
    image:
      "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=800&q=80",
  },
];

const ServicesOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 text-white">
            Our Legal Expertise
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Expert legal services designed to support businesses, individuals,
            and global enterprises.
          </p>
        </div>

        {/* Image Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group rounded-2xl overflow-hidden bg-white shadow-2xl hover:shadow-gold/20 transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image with Overlay */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                
                {/* Icon on Image */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-14 h-14 rounded-xl bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="font-display text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-navy/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild variant="hero" size="xl" className="shadow-2xl hover:shadow-gold/30">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
