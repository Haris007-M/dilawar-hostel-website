import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Hostels from "@/components/Hostels";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import Steps from "@/components/Steps";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Hostels />
        <Amenities />
        <Steps />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
