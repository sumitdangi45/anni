import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ImageCarouselSection from "@/components/ImageCarouselSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollImageMorph from "@/components/ScrollImageMorph";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Full Stack Developer & AI/ML Engineer",
    description: "Sumit Dangi — Full Stack Developer specializing in React, Node.js, and AI/ML. Building scalable web applications and intelligent systems.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <ScrollImageMorph />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ImageCarouselSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
