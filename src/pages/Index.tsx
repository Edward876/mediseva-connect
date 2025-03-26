
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SpecialtiesSection from "@/components/home/SpecialtiesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import EmergencySection from "@/components/home/EmergencySection";
import InternshipSection from "@/components/home/InternshipSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";
import Chatbot from "@/components/chatbot/Chatbot";

const Index = () => {
  // Set page title
  useEffect(() => {
    document.title = "Mediseva - Healthcare Platform";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SpecialtiesSection />
        <HowItWorksSection />
        <EmergencySection />
        <InternshipSection />
        <TestimonialsSection />
        <CallToAction />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
