import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BecomeEntrepreneur from "@/components/sections/BecomeEntrepreneur";
import BigPicture from "@/components/sections/BigPicture";
import Contact from "@/components/sections/Contact";
import EximApp from "@/components/sections/EximApp";
import Faq from "@/components/sections/Faq";
import FirstExport from "@/components/sections/FirstExport";
import Hero from "@/components/sections/Hero";
import Money from "@/components/sections/Money";
import Office from "@/components/sections/Office";
import Papers from "@/components/sections/Papers";
import Plans from "@/components/sections/Plans";
import Rules from "@/components/sections/Rules";
import Services from "@/components/sections/Services";
import WhoIsWho from "@/components/sections/WhoIsWho";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BigPicture />
        <EximApp />
        <WhoIsWho />
        <BecomeEntrepreneur />
        <Services />
        <FirstExport />
        <Money />
        <Office />
        <Rules />
        <Plans />
        <Papers />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
