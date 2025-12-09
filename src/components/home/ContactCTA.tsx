import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactCTA = () => {
  return (
    <section className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Discuss Your{' '}
            <span className="text-gradient">Legal Needs?</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Let's connect and explore how JBS Legal can help you navigate complex legal challenges and achieve your business objectives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-primary-foreground/80">
            <a
              href="tel:+917203881108"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone className="w-5 h-5 text-gold" />
              +91-7203881108
            </a>
            <a
              href="mailto:info@jbslegal.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail className="w-5 h-5 text-gold" />
              info@jbslegal.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
