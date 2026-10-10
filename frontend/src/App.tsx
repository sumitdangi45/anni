import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Lenis from "lenis";
import { API_BASE } from "@/lib/api";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Projects from "./pages/Projects.tsx";
import Blogs from "./pages/Blogs.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import Contact from "./pages/Contact.tsx";
import Pricing from "./pages/Pricing.tsx";
import DigitalMarketing from "./pages/DigitalMarketing.tsx";
import AIAutomation from "./pages/AIAutomation.tsx";
import AIMLSolutions from "./pages/AIMLSolutions.tsx";
import ChatbotDevelopment from "./pages/ChatbotDevelopment.tsx";
import DigitalGrowthSEO from "./pages/DigitalGrowthSEO.tsx";
import BrandingIdentity from "./pages/BrandingIdentity.tsx";
import WebDevelopment from "./pages/WebDevelopment.tsx";
import WebApplications from "./pages/WebApplications.tsx";
import SaaSDevelopment from "./pages/SaaSDevelopment.tsx";
import MobileAppDevelopment from "./pages/MobileAppDevelopment.tsx";
import MaintenanceSupport from "./pages/MaintenanceSupport.tsx";
import EcommerceDevelopment from "./pages/EcommerceDevelopment.tsx";
import CloudDevOps from "./pages/CloudDevOps.tsx";
import Cybersecurity from "./pages/Cybersecurity.tsx";
import PrebuiltSolutions from "./pages/PrebuiltSolutions.tsx";
import CustomisedSolutions from "./pages/CustomisedSolutions.tsx";
import UIUXDesign from "./pages/UIUXDesign.tsx";
import AIAgents from "./pages/AIAgents.tsx";
import Internship from "./pages/Internship.tsx";
import FAQ from "./pages/FAQ.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import NoiseBackground from "./components/NoiseBackground.tsx";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminPhotos from "./pages/admin/AdminPhotos";
import AdminResume from "./pages/admin/AdminResume";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
};

// Updates OG/Twitter meta tags from DB og_image key
const OgImageUpdater = () => {
  useEffect(() => {
    fetch(`${API_BASE}/api/site-images`)
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (!data.og_image) return;
        const url = data.og_image;
        const selectors: [string, string][] = [
          ['meta[property="og:image"]', "content"],
          ['meta[name="twitter:image"]', "content"],
        ];
        selectors.forEach(([sel, attr]) => {
          const el = document.querySelector(sel);
          if (el) el.setAttribute(attr, url);
        });
      })
      .catch(() => {});
  }, []);
  return null;
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OgImageUpdater />
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="photos" element={<AdminPhotos />} />
              <Route path="resume" element={<AdminResume />} />
            </Route>
            <Route path="/*" element={
              <LenisProvider>
                <NoiseBackground />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/:id" element={<BlogDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/digital-marketing" element={<DigitalMarketing />} />
                  <Route path="/ai-automation" element={<AIAutomation />} />
                  <Route path="/services/ai-ml" element={<AIMLSolutions />} />
                  <Route path="/services/chatbot" element={<ChatbotDevelopment />} />
                  <Route path="/services/seo" element={<DigitalGrowthSEO />} />
                  <Route path="/services/branding" element={<BrandingIdentity />} />
                  <Route path="/services/web-development" element={<WebDevelopment />} />
                  <Route path="/services/web-apps" element={<WebApplications />} />
                  <Route path="/services/saas" element={<SaaSDevelopment />} />
                  <Route path="/services/mobile" element={<MobileAppDevelopment />} />
                  <Route path="/services/maintenance" element={<MaintenanceSupport />} />
                  <Route path="/services/ecommerce" element={<EcommerceDevelopment />} />
                  <Route path="/services/cloud-devops" element={<CloudDevOps />} />
                  <Route path="/services/cybersecurity" element={<Cybersecurity />} />
                  <Route path="/work/prebuilt" element={<PrebuiltSolutions />} />
                  <Route path="/work/custom" element={<CustomisedSolutions />} />
                  <Route path="/internship" element={<Internship />} />
                  <Route path="/services/ai-agents" element={<AIAgents />} />
                  <Route path="/services/design" element={<UIUXDesign />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </LenisProvider>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
