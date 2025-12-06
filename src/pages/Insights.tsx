import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, FileText, BookOpen, TrendingUp, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/home/ContactCTA';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const articles = [
  {
    id: 1,
    category: 'Data Privacy',
    title: 'Navigating Data Privacy Laws in India: Challenges & Opportunities for Businesses',
    excerpt: 'Understanding the evolving landscape of data protection regulations and compliance requirements for businesses operating in India.',
    date: 'Dec 2024',
    readTime: '8 min read',
    views: '2.5K',
    trending: true,
    type: 'article',
  },
  {
    id: 2,
    category: 'M&A',
    title: 'Structuring Cross-Border M&A Transactions: A Practical Guide',
    excerpt: 'Key considerations and best practices for successful international mergers and acquisitions in today\'s global market.',
    date: 'Nov 2024',
    readTime: '12 min read',
    views: '3.1K',
    trending: true,
    type: 'article',
  },
  {
    id: 3,
    category: 'Employment',
    title: 'Employment Law Challenges for Startups in India',
    excerpt: 'Essential compliance requirements and HR strategies for emerging companies navigating the Indian employment landscape.',
    date: 'Oct 2024',
    readTime: '6 min read',
    views: '1.8K',
    trending: false,
    type: 'article',
  },
  {
    id: 4,
    category: 'Corporate',
    title: 'Corporate Governance Best Practices for Growing Companies',
    excerpt: 'Implementing robust governance frameworks that support sustainable growth and stakeholder confidence.',
    date: 'Sep 2024',
    readTime: '10 min read',
    views: '2.2K',
    trending: false,
    type: 'article',
  },
];

const caseStudies = [
  {
    id: 1,
    category: 'M&A Success',
    title: 'Cross-Border Acquisition: $50M Tech Company Deal',
    excerpt: 'How we facilitated a seamless international acquisition for a leading technology firm.',
    impact: 'Deal closed in 90 days',
    type: 'case-study',
  },
  {
    id: 2,
    category: 'Regulatory Win',
    title: 'Compliance Framework for Fintech Startup',
    excerpt: 'Implementing comprehensive regulatory compliance for a fast-growing fintech company.',
    impact: 'Zero compliance issues',
    type: 'case-study',
  },
  {
    id: 3,
    category: 'IP Protection',
    title: 'Patent Portfolio Strategy for AI Company',
    excerpt: 'Securing intellectual property rights for innovative AI technology solutions.',
    impact: '15+ patents secured',
    type: 'case-study',
  },
  {
    id: 4,
    category: 'Dispute Resolution',
    title: 'Commercial Arbitration: $10M Contract Dispute',
    excerpt: 'Successfully resolved complex commercial dispute through strategic arbitration.',
    impact: 'Favorable settlement',
    type: 'case-study',
  },
];

const resources = [
  {
    id: 1,
    title: 'Legal Compliance Checklist for Startups',
    category: 'Corporate',
    description: 'Essential legal requirements every startup must fulfill',
    type: 'checklist',
  },
  {
    id: 2,
    title: 'Contract Review Template',
    category: 'Commercial',
    description: 'Comprehensive template for reviewing business contracts',
    type: 'template',
  },
  {
    id: 3,
    title: 'IP Protection Strategy Guide',
    category: 'IP',
    description: 'Step-by-step guide to protecting your intellectual property',
    type: 'guide',
  },
  {
    id: 4,
    title: 'Employment Law Quick Reference',
    category: 'Employment',
    description: 'Key employment laws and regulations at a glance',
    type: 'reference',
  },
  {
    id: 5,
    title: 'M&A Due Diligence Checklist',
    category: 'M&A',
    description: 'Complete checklist for merger and acquisition due diligence',
    type: 'checklist',
  },
  {
    id: 6,
    title: 'Data Privacy Compliance Framework',
    category: 'Privacy',
    description: 'Framework for implementing data privacy compliance',
    type: 'framework',
  },
];

const Insights = () => {
  return (
    <>
      <Helmet>
        <title>Insights & Thought Leadership | JBS Legal</title>
        <meta name="description" content="Stay updated with legal insights, regulatory updates, and thought leadership articles from JBS Legal experts." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero */}
          <section className="gradient-hero py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Insights & <span className="text-gradient">Thought Leadership</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Stay updated with articles, reports, and guides on legal, regulatory, and business developments.
              </p>
            </div>
          </section>

          {/* Content */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="articles" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                  <TabsTrigger value="articles" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Articles
                  </TabsTrigger>
                  <TabsTrigger value="casestudies" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Case Studies
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="articles">
                  <div className="grid md:grid-cols-2 gap-8">
                    {articles.map((article) => (
                      <article key={article.id} className="glass-card p-6 hover-lift group cursor-pointer relative overflow-hidden">
                        {article.trending && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 flex items-center gap-1.5">
                            <TrendingUp className="w-3 h-3 text-gold" />
                            <span className="text-xs font-semibold text-gold">Trending</span>
                          </div>
                        )}
                        <span className="text-gold text-xs font-semibold uppercase tracking-wider mb-3 block">
                          {article.category}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-navy transition-colors pr-20">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="casestudies">
                  <div className="grid md:grid-cols-2 gap-8">
                    {caseStudies.map((study) => (
                      <article key={study.id} className="glass-card p-8 hover-lift group cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-navy/20 flex items-center justify-center mb-6">
                          <TrendingUp className="w-6 h-6 text-navy" />
                        </div>
                        <span className="text-gold text-xs font-semibold uppercase tracking-wider mb-3 block">
                          {study.category}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-navy transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {study.excerpt}
                        </p>
                        <div className="pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gold" />
                            <span className="text-sm font-semibold text-foreground">{study.impact}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources">
                  <div className="grid md:grid-cols-3 gap-6">
                    {resources.map((resource) => (
                      <article key={resource.id} className="glass-card p-6 hover-lift group cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                          <FileText className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-gold text-xs font-semibold uppercase tracking-wider mb-2 block">
                          {resource.category}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-navy transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {resource.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <ContactCTA />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Insights;
