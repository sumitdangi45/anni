import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import WorksHeader from "@/components/WorksHeader";
import ProjectCardsSection from "@/components/ProjectCardsSection";
import ProcessSection from "@/components/ProcessSection";
import ComparisonSection from "@/components/ComparisonSection";
import SocialProofSection from "@/components/SocialProofSection";
import WhyAnniSection from "@/components/WhyAnniSection";
import PricingSection from "@/components/PricingSection";
import LogoMarquee from "@/components/LogoMarquee";
import CTABanner from "@/components/CTABanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Anni Web Solutions — Web, Mobile & AI Agency",
    description: "Anni Web Solutions is a full-service tech agency. We design, develop and scale web, mobile and AI solutions for startups and growing businesses.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <WorksHeader />
      <ProjectCardsSection />
      <ProcessSection />
      <ComparisonSection />
      <SocialProofSection />
      <WhyAnniSection />
      <TestimonialsSection />
      <PricingSection />
      <LogoMarquee />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
