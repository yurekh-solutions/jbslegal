import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import InsightsPreview from '@/components/home/InsightsPreview';
import ContactCTA from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>JBS Legal | Trusted Legal Advisory - Global Perspective, Practical Solutions</title>
        <meta name="description" content="JBS Legal is a full-service law firm delivering integrated legal solutions for complex business challenges across industries and borders. Corporate, M&A, IP, Regulatory advisory." />
        <meta name="keywords" content="law firm, legal advisory, corporate law, M&A, intellectual property, regulatory compliance, India, USA" />
        <link rel="canonical" href="https://jbslegal.com" />
        <meta property="og:title" content="JBS Legal | Trusted Legal Advisory" />
        <meta property="og:description" content="Strategic, actionable legal solutions across industries and borders." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <AboutSnapshot />
          <ServicesOverview />
          <WhyChooseUs />
          <InsightsPreview />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
