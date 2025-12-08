import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/jbss.png';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Insights', path: '/insights' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Corporate & Commercial Law',
    'Mergers & Acquisitions',
    'Regulatory & Compliance',
    'Intellectual Property',
    'Dispute Resolution',
  ];

  return (
    <footer className="gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Logo & About */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative group inline-block">
              {/* Animated glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#b8912e]/30 via-[#b8912e]/40 to-[#b8912e]/30 rounded-2xl blur-2xl animate-pulse-slow"></div>
              
              {/* Logo container */}
              <div className="relative px-6 py-5 bg-gradient-to-br from-white via-white to-gray-50 border-b-3 border-l-3 border-r-3 border-[#b8912e] rounded-b-3xl shadow-2xl hover:shadow-[#b8912e]/30 transition-all duration-500 hover:scale-105 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="JBS Legal" 
                  className="h-24 sm:h-28 md:h-32 w-auto object-contain drop-shadow-xl" 
                />
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              JBS Legal is a full-service law firm delivering integrated legal solutions for complex business challenges across industries and borders.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-semibold mb-4 sm:mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-gold transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-semibold mb-4 sm:mb-6 text-gold">Practice Areas</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/80 hover:text-gold transition-colors text-sm block py-1"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-semibold mb-4 sm:mb-6 text-gold">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">India | USA</span>
              </li>
              <li>
                <a
                  href="tel:+917203881108"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="break-all">+91-7203881108</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@jbslegal.com"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="break-all">info@jbslegal.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-primary-foreground/60">
            <p className="text-center sm:text-left">© {new Date().getFullYear()} JBS Legal. All rights reserved.</p>
            <p className="text-center sm:text-right">
              Designed and Developed by <a href="https://yurekh.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">YurekhSolutions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
