import { Navbar } from "@/shared/components/moleculas/Navbar";
import { About } from "./components/About";
import Contact from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { HeroCarousel } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { NewsSection } from "./components/NewsSection";
import PostgraduatePrograms from "./components/PostgraduatePrograms";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <About />
      <NewsSection />
      <HowItWorks />
      <PostgraduatePrograms />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
