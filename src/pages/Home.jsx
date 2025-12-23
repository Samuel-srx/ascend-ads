import Layout from '../components/Layout';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import ResultsSection from '../components/landing/ResultsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ResultsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Layout>
  );
}