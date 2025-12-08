import { useEffect, useRef } from "react";
import { ArrowRight, Scale, Shield, Award, Users } from "lucide-react";

// Type definition for ButtonLink component
interface ButtonLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

// Placeholder for Tailwind-styled button/link behavior in a single file
const ButtonLink = ({ href, className, children, style }: ButtonLinkProps) => (
  <a 
    href={href} 
    className={`inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl ${className}`}
    style={style}
  >
    {children}
  </a>
);

// Removed gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  
  useEffect(() => {
    // Animated background gradient using CSS animation
    // GSAP scroll trigger animations disabled
    if (bgRef.current) {
      bgRef.current.style.animation = 'gradient-shift 20s ease-in-out infinite';
    }
  }, []);

  return (
    // Tailwind CSS is assumed to be available
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Animated gradient background with enhanced blur */}
      <div 
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%'
        }}
      />

      {/* Enhanced glowing gradient orbs - responsive sizing */}
      <div className="absolute top-10 sm:top-20 right-1/2 sm:right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-[#c3a14b]/8 to-transparent rounded-full blur-3xl shadow-2xl" style={{ boxShadow: '0 0 80px rgba(195, 161, 75, 0.15)' }} />
      <div className="absolute bottom-10 sm:bottom-20 left-1/2 sm:left-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tr from-blue-500/8 to-transparent rounded-full blur-3xl shadow-2xl" style={{ boxShadow: '0 0 60px rgba(59, 130, 246, 0.12)' }} />

      {/* Main content container */}
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
            
            {/* Premium badge */}
            <div className="hero-badge inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white backdrop-blur-xl border-2 border-[#c3a14b]/30 shadow-lg shadow-[#c3a14b]/20 mx-auto lg:mx-0 w-fit text-xs sm:text-sm" style={{ boxShadow: '0 0 30px rgba(195, 161, 75, 0.15)' }}>
              <Scale className="w-4 sm:w-5 h-4 sm:h-5 text-[#c3a14b] flex-shrink-0" />
              <span className="text-slate-800 font-bold tracking-wider uppercase">
                Premier Legal Advisory
              </span>
              <div className="w-2 h-2 rounded-full bg-[#c3a14b] animate-pulse flex-shrink-0" />
            </div>

            {/* Main heading */}
            <h1 className="space-y-1 sm:space-y-2">
              <div className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
                Excellence in
              </div>
              <div className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c3a14b] via-[#d4af37] to-[#c3a14b] drop-shadow-lg">
                  Legal Services
                </span>
              </div>
              <div className="hero-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight tracking-tight text-slate-700">
                Trusted. Professional. Results-Driven.
              </div>
            </h1>

            {/* Description */}
            <p className="hero-subtitle text-slate-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Partner with <span className="font-bold text-slate-900">elite legal professionals</span> who deliver exceptional results. 
              Our comprehensive legal services combine <span className="font-semibold text-[#c3a14b]">decades of expertise</span> with innovative solutions tailored to your needs.
            </p>

            {/* Trust indicators */}
            <div className="hero-stats flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 md:gap-3 text-xs">
              <div className="flex items-center gap-2 bg-white backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap">
                <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-600 flex-shrink-0" />
                <span className="text-slate-700 font-medium">U.S. Licensed</span>
              </div>
              <div className="flex items-center gap-2 bg-white backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap">
                <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600 flex-shrink-0" />
                <span className="text-slate-700 font-medium">72-Hour Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap">
                <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c3a14b] flex-shrink-0" />
                <span className="text-slate-700 font-medium">500+ Experts</span>
              </div>
            </div>

            {/* CTA buttons - Replaced external Button/Link with styled <a> tags */}
            <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-0 sm:pt-1">
              <ButtonLink
                href="/contact"
                className="w-full xs:w-auto bg-[#c3a14b] hover:bg-[#b39041] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#c3a14b]/40 hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: '0 0 30px rgba(195, 161, 75, 0.3)' }}
              >
                Schedule Consultation
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-1.5 sm:ml-2" />
              </ButtonLink>
              <ButtonLink
                href="/about"
                className="w-full xs:w-auto border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 hover:border-[#c3a14b] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base rounded-lg hover:-translate-y-1 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Our Expertise
              </ButtonLink>
            </div>
          </div>

          {/* Right Column - Professional Image Grid */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            {/* Image grid with reduced spacing for professional look */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 w-full max-w-xl lg:max-w-2xl">
              
              {/* Image Card 1 - Top Left */}
              <div className="hero-image-card relative group overflow-hidden rounded-lg sm:rounded-xl border-2 border-[#c3a14b]/30 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:border-[#c3a14b]/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 bg-white" style={{ boxShadow: '0 0 25px rgba(195, 161, 75, 0.12)' }}>
                <div className="relative overflow-hidden" style={{ height: 'clamp(120px, 30vw, 200px)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=90" 
                    alt="Professional legal consultation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-100"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <div className="bg-[#c3a14b] w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                      <Scale className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">Corporate Law</h3>
                  </div>
                </div>
              </div>

              {/* Image Card 2 - Top Right */}
              <div className="hero-image-card relative group overflow-hidden rounded-lg sm:rounded-xl border-2 border-slate-300 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:border-[#c3a14b]/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 bg-white" style={{ boxShadow: '0 0 20px rgba(195, 161, 75, 0.08)' }}>
                <div className="relative overflow-hidden" style={{ height: 'clamp(120px, 30vw, 200px)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=90" 
                    alt="Legal document review"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-100"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <div className="bg-[#c3a14b] w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                      <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">Contract Review</h3>
                  </div>
                </div>
              </div>

              {/* Image Card 3 - Bottom Left */}
              <div className="hero-image-card relative group overflow-hidden rounded-lg sm:rounded-xl border-2 border-slate-300 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:border-[#c3a14b]/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 bg-white" style={{ boxShadow: '0 0 20px rgba(195, 161, 75, 0.08)' }}>
                <div className="relative overflow-hidden" style={{ height: 'clamp(120px, 30vw, 200px)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=90" 
                    alt="Legal team collaboration"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-100"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <div className="bg-[#c3a14b] w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">Legal Advisory</h3>
                  </div>
                </div>
              </div>

              {/* Image Card 4 - Bottom Right */}
              <div className="hero-image-card relative group overflow-hidden rounded-lg sm:rounded-xl border-2 border-slate-300 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:border-[#c3a14b]/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 bg-white" style={{ boxShadow: '0 0 20px rgba(195, 161, 75, 0.08)' }}>
                <div className="relative overflow-hidden" style={{ height: 'clamp(120px, 30vw, 200px)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&q=90" 
                    alt="Courtroom litigation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-100"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <div className="bg-[#c3a14b] w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                      <Award className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">Litigation</h3>
                  </div>
                </div>
              </div>

              {/* Decorative accent with glow */}
              <div className="hidden sm:block absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-[#c3a14b]/15 to-transparent rounded-full blur-3xl pointer-events-none" style={{ boxShadow: '0 0 50px rgba(195, 161, 75, 0.15)' }} />
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.1)' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/50 to-transparent" />
    </section>
  );
};

export default HeroSection;