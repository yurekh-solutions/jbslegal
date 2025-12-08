import { useEffect, useRef } from "react";
import { ArrowRight, Scale, Shield, Award, Users } from "lucide-react";

// Simple Tailwind-styled button
const ButtonLink = ({ href, className, children }) => (
  <a 
    href={href} 
    className={`inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl ${className}`}
  >
    {children}
  </a>
);

const HeroSection = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%'
        }}
      />

      {/* Decorative Orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-[#c3a14b]/8 to-transparent rounded-full blur-3xl shadow-2xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-500/8 to-transparent rounded-full blur-3xl shadow-2xl" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left */}
          <div className="space-y-4 text-center lg:text-left flex flex-col justify-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white backdrop-blur-xl border-2 border-[#c3a14b]/30 shadow-lg mx-auto lg:mx-0 w-fit">
              <Scale className="w-5 h-5 text-[#c3a14b]" />
              <span className="text-slate-800 font-bold text-xs uppercase tracking-wider">
                Premier Legal Advisory
              </span>
              <div className="w-2 h-2 rounded-full bg-[#c3a14b] animate-pulse" />
            </div>

            {/* Headings */}
            <h1 className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                Excellence in
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c3a14b] via-[#d4af37] to-[#c3a14b]">
                  Legal Services
                </span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700">
                Trusted. Professional. Results-Driven.
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Partner with <span className="font-bold text-slate-900">elite legal professionals</span> who deliver exceptional results.
              Our comprehensive legal services combine <span className="font-semibold text-[#c3a14b]">decades of expertise</span> with innovative solutions tailored to your needs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border shadow-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-slate-700 font-medium">U.S. Licensed</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border shadow-sm">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700 font-medium">72-Hour Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border shadow-sm">
                <Users className="w-4 h-4 text-[#c3a14b]" />
                <span className="text-slate-700 font-medium">500+ Experts</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <ButtonLink
                href="/contact"
                className="w-full sm:w-auto bg-[#c3a14b] hover:bg-[#b39041] text-white px-8 py-3 rounded-lg shadow-lg"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </ButtonLink>

              <ButtonLink
                href="/about"
                className="w-full sm:w-auto border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-8 py-3 rounded-lg"
              >
                Our Expertise
              </ButtonLink>
            </div>
          </div>

          {/* Right - Image Grid */}
          <div className="relative flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full max-w-2xl">

              {/* Cards */}
              <ImageCard
                img="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=90"
                title="Corporate Law"
                Icon={Scale}
              />

              <ImageCard
                img="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=90"
                title="Contract Review"
                Icon={Shield}
              />

              <ImageCard
                img="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=90"
                title="Legal Advisory"
                Icon={Users}
              />

              <ImageCard
                img="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&q=90"
                title="Litigation"
                Icon={Award}
              />

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent" />
    </section>
  );
};

const ImageCard = ({ img, title, Icon }) => (
  <div className="relative group overflow-hidden rounded-xl border-2 border-slate-300 shadow-lg bg-white transition-all duration-500">
    <div className="relative overflow-hidden" style={{ height: '200px' }}>
      <img 
        src={img}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute bottom-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
        <div className="bg-[#c3a14b] w-10 h-10 rounded-lg flex items-center justify-center mb-2">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-white text-sm font-bold">{title}</h3>
      </div>
    </div>
  </div>
);

export default HeroSection;
