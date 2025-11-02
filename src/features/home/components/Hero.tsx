"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image1 from "@/assets/login-image.png";
import Image2 from "@/assets/carousel/car-1.jpeg";
import Image3 from "@/assets/carousel/car-2.jpg";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Yer bag‘ridan kelajakni kashf etamiz",
    subtitle:
      "Milliy geologiya tadqiqotlari orqali tabiiy boyliklarni ilmiy asosda o‘rganamiz.",
    buttonText: "Batafsil",
    image: Image1,
  },
  {
    id: 2,
    title: "Geofanlarda innovatsion yondashuv",
    subtitle:
      "Zamonaviy texnologiyalar yordamida yer osti resurslarini chuqur tahlil qilamiz.",
    buttonText: "Batafsil",
    image: Image2,
  },
  {
    id: 3,
    title: "Barqaror taraqqiyot uchun ilm",
    subtitle:
      "Geologik tadqiqotlar iqtisodiy o‘sish va ekologik muvozanatni ta’minlaydi.",
    buttonText: "Batafsil",
    image: Image3,
  },
  {
    id: 4,
    title: "Ilm, amaliyot va kadrlar tayyorlash",
    subtitle:
      "Geologiya sohasida yetuk mutaxassislarni tayyorlash — bizning ustuvor maqsadimiz.",
    buttonText: "Batafsil",
    image: Image1,
  },
  {
    id: 5,
    title: "Tabiiy resurslar — millat boyligi",
    subtitle:
      "Geologiya orqali tabiiy boyliklarni oqilona boshqarish va kelajak avlodga yetkazish.",
    buttonText: "Batafsil",
    image: Image2,
  },
];
export const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Autoplay + Loop
  const plugin = Autoplay({
    delay: 6000,
    stopOnInteraction: true,
  });

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative w-full h-[calc(100vh-70px)] overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin]}
        opts={{
          loop: true, // Loop yoqildi
        }}
        onMouseEnter={() => plugin.stop()}
        onMouseLeave={() => plugin.reset()}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="h-[calc(100vh-70px)] p-0 relative"
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Text content */}
                <div className="absolute h-full w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-ful inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="text-white max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl opacity-90 font-light">
                      {slide.subtitle}
                    </p>
                    <Button
                      size="lg"
                      variant={'default'}
                      className="px-8 py-6 text-base sm:text-lg shadow-md transition-transform hover:shadow-lg"
                    >
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm border-0 transition">
          <ChevronLeft className="h-6 w-6 text-primary" />
        </CarouselPrevious>
        <CarouselNext className="right-3 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm border-0 transition">
          <ChevronRight className="h-6 w-6 text-white" />
        </CarouselNext>
      </Carousel>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slayd ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
