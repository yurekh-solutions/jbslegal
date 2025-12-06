import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Integrated Expertise Across Industries',
    description: 'Multidisciplinary teams delivering cohesive solutions across sectors.',
  },
  {
    title: 'Business-Aligned Legal Solutions',
    description: 'Strategies designed to support your commercial objectives.',
  },
  {
    title: 'Global & Local Perspective',
    description: 'Cross-border expertise with deep understanding of local laws.',
  },
  {
    title: 'Innovative, Technology-Driven Approach',
    description: 'Leveraging the latest tools for efficient and effective service.',
  },
];

// Carousel images - law-related professional images
const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    alt: 'Legal books and gavel - Justice and law',
  },
  {
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    alt: 'Law library with legal books',
  },
  {
    url: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&q=80',
    alt: 'Lawyers in consultation meeting',
  },
  {
    url: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=800&q=80',
    alt: 'Legal documents and contract signing',
  },
  {
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    alt: 'Professional legal team collaboration',
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-feature',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Carousel */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Badge */}
              <div className="absolute -top-4 -left-4 z-20">
                <div className="glass-card px-4 py-3 flex items-center gap-2 border-2 border-gold/40 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Trusted By</div>
                    <div className="text-sm font-bold text-gold">500+ Clients</div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-navy/20 rounded-3xl blur-2xl" />
              
              {/* Carousel Container */}
              <div className="relative glass-card overflow-hidden rounded-2xl group">
                {/* Images */}
                <div className="relative h-[400px] lg:h-[500px]">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? 'bg-gold w-8'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/40 mb-4">
              <Award className="w-4 h-4 text-gold" />
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                Why Choose JBS Legal
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              Your Trusted Partner for{' '}
              <span className="text-navy">Legal Excellence</span>
            </h2>

            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="why-feature flex gap-4 opacity-0"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="gold" size="lg">
              <Link to="/about">
                Discover Our Approach
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
