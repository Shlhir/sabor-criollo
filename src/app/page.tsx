import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Reservation } from "@/components/Reservation";
import { Specialties } from "@/components/Specialties";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Specialties />
        <Menu />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
