import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/jbs-logo.jpeg';

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
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <img src={logo} alt="JBS Legal" className="h-16 w-auto bg-white/10 backdrop-blur-sm rounded-lg p-2" />
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
            <h3 className="text-lg font-display font-semibold mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-gold">Practice Areas</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-gold">Contact Us</h3>
            <ul className="space-y-4">
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
                  +91-7203881108
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@jbslegal.com"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  info@jbslegal.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} JBS Legal. All rights reserved.</p>
            <p className="text-center md:text-right">
              Designed and Developed by <a href="https://yurekh.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">YurekhSolutions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
