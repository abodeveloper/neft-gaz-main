import { About } from "./components/About";
import Contact from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { HeroCarousel } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { NewsSection } from "./components/NewsSection";
import PostgraduatePrograms from "./components/PostgraduatePrograms";

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <About />
      <NewsSection />
      <HowItWorks />
      <PostgraduatePrograms />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
