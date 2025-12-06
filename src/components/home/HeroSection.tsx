import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      const tl = gsap.timeline();
      
      tl.from('.hero-badge', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

      // Floating orbs animation
      gsap.to('.floating-orb-1', {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floating-orb-2', {
        y: 30,
        x: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floating-orb-3', {
        y: -20,
        x: -30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Animate the traveling light around the border
      if (lightRef.current && borderRef.current) {
        const border = borderRef.current;
        const rect = border.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Create a timeline for the light traveling around the border
        const lightTl = gsap.timeline({ repeat: -1 });

        lightTl
          .to(lightRef.current, {
            x: width,
            y: 0,
            duration: 2,
            ease: 'none'
          })
          .to(lightRef.current, {
            x: width,
            y: height,
            duration: 2,
            ease: 'none'
          })
          .to(lightRef.current, {
            x: 0,
            y: height,
            duration: 2,
            ease: 'none'
          })
          .to(lightRef.current, {
            x: 0,
            y: 0,
            duration: 2,
            ease: 'none'
          });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F19]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0E1420] to-[#0B0F19]" />

      {/* Matrix Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)'
          }}
        />
      </div>

      {/* Animated Grid Boxes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left box */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 border border-blue-500/30 rounded-lg animate-pulse-slow"
          style={{ animationDelay: '0s' }}
        />
        {/* Top right box */}
        <div 
          className="absolute top-32 right-20 w-24 h-24 border border-cyan-500/30 rounded-lg animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        />
        {/* Middle left box */}
        <div 
          className="absolute top-1/2 left-20 w-28 h-28 border border-blue-400/20 rounded-lg animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        {/* Bottom right box */}
        <div 
          className="absolute bottom-32 right-32 w-36 h-36 border border-cyan-400/25 rounded-lg animate-pulse-slow"
          style={{ animationDelay: '1.5s' }}
        />
        {/* Center box */}
        <div 
          className="absolute top-1/3 right-1/3 w-20 h-20 border border-blue-300/20 rounded-lg animate-pulse-slow"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Ambient background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-300 text-sm font-medium">
              JBS Legal – Trusted Legal Advisory
            </span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-white">Elevate Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
              Legal Strategy
            </span>
            <span className="text-white">.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
              Speed, Visibility & Access – Unleashed!
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-6">
            We connect U.S. businesses with top 2% Vetted candidates delivered in ≤ 72 hours with JBS Legal Technologies.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
            >
              <Link to="/about">About Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 hover:border-blue-500/50 font-semibold px-8 h-12 rounded-lg transition-all backdrop-blur-sm"
            >
              <Link to="/contact" className="inline-flex items-center gap-2">
                Book a demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      
       
      </div>
       <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 w-full">
          {/* Border box with animated light */}
          <div
            ref={borderRef}
            className="relative rounded-t-[32px] p-[1px] bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(14, 165, 233, 0.05) 50%, rgba(59, 130, 246, 0.15) 100%)'
            }}
          >
            {/* Traveling light effect */}
            <div
              ref={lightRef}
              className="absolute top-0 left-0 w-40 h-40 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 25%, transparent 60%)',
                filter: 'blur(25px)'
              }}
            />

            {/* Inner content container */}
            <div className="relative rounded-t-[32px] bg-[#0E1420]/90 backdrop-blur-xl border border-white/5 overflow-hidden p-8 md:p-12">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;
