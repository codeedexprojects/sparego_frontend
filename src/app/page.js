import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/home/HeroSection";
import SpecialOffersCarousel from "@/components/landing/home/SpecialOffer";
import FourStoresSection from "@/components/landing/home/StoresDescription";
import WhyChooseUs from "@/components/landing/home/WhyChooseUs";

export default function LandingHomePage() {
  return (
    <div>
      <Header />
      <HeroSection></HeroSection>
      <FourStoresSection></FourStoresSection>
      <SpecialOffersCarousel></SpecialOffersCarousel>
      <WhyChooseUs></WhyChooseUs>
      <Footer></Footer>
    </div>
  );
}
