"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fade } from "react-awesome-reveal";
import { Cloud, Gem, Globe, Layers, Satellite, Waves } from "lucide-react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
  direction?: "up" | "down" | "left" | "right";
}

const features: FeatureProps[] = [
  {
    icon: <Globe className="w-9 h-9 text-primary" />,
    title: "Geofizika",
    description: "Yerning fizik xususiyatlari va jarayonlarini o'rganish",
    direction: "left",
  },
  {
    icon: <Waves className="w-9 h-9 text-sky-600 dark:text-sky-400" />,
    title: "Gidrogeologiya",
    description: "Suv taqsimoti, harakati va sifatini tahlil qilish",
  },
  {
    icon: (
      <Satellite className="w-9 h-9 text-indigo-500 dark:text-indigo-400" />
    ),
    title: "GIS va Masofadan Zondlash",
    description: "Fazoviy tahlil va Yerni kuzatish texnologiyalari",
    direction: "right",
  },
  {
    icon: <Gem className="w-9 h-9 text-amber-500 dark:text-amber-400" />,
    title: "Kon Geologiyasi",
    description: "Mineral resurslarni qidirish va qazib olish",
    direction: "up",
  },
  {
    icon: <Cloud className="w-9 h-9 text-blue-500 dark:text-blue-300" />,
    title: "Iqlim Tadqiqotlari",
    description: "Iqlim o'zgarishi va ekologik ta'sirni o'rganish",
  },
  {
    icon: <Layers className="w-9 h-9 text-green-600 dark:text-green-400" />,
    title: "Stratigrafiya",
    description: "Tog' jinslarining qatlamlari va geologik davr tahlili",
    direction: "up",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="bg-muted text-center py-12 md:py-28">
      <div className="container mx-auto">
        <div className="space-y-16">
          {/* Title */}
          <div className="space-y-6">
            <Fade
              delay={300}
              duration={1000}
              triggerOnce
              fraction={0.5}
              direction="up"
              cascade
              damping={0.3}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Ilmiy{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  yo'nalishlar
                </span>
              </h2>
              <p className="text-xl text-muted-foreground text-center font-light">
                Yer fanlari sohasidagi turli fanlararo tadqiqot yo'nalishlarimiz
              </p>
            </Fade>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(
              ({ icon, title, description, direction }: FeatureProps) => (
                <Fade
                  key={title}
                  delay={400}
                  duration={1000}
                  triggerOnce
                  direction={direction}
                  cascade
                  damping={0.5}
                >
                  <Card
                    className={`
                      relative overflow-hidden rounded-2xl 
                      bg-background/95 border border-border/40 backdrop-blur-sm
                      transition-all duration-500 ease-out
                      hover:scale-[1.01] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)]
                      hover:border-primary/40
                      group h-full
                    `}
                  >
                    {/* Subtle gradient light overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />

                    <CardHeader>
                      <CardTitle className="grid gap-4 place-items-center text-lg font-semibold">
                        <div className="p-4 rounded-md bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                          {icon}
                        </div>
                        {title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center px-6 pb-6">
                      <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </Fade>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
