"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText, Clock, GraduationCap, Medal } from "lucide-react";
import React from "react";
import { Fade } from "react-awesome-reveal";

interface ProgramProps {
  icon: JSX.Element;
  title: string;
  field: string;
  duration: string;
  description: string;
  direction?: "up" | "down" | "left" | "right";
}

const programs: ProgramProps[] = [
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: "Doktorantura (PhD)",
    field: "Geologiya va mineralogiya",
    duration: "3 yil",
    description:
      "Geologiya sohasida ilmiy tadqiqotlar olib borish va doktorlik dissertatsiyasi yozish.",
    direction: "left",
  },
  {
    icon: <Medal className="w-8 h-8 text-primary" />,
    title: "Tayanch Doktorantura (DSc)",
    field: "Geofizika va geodinamika",
    duration: "3 yil",
    description:
      "Yuqori malakali ilmiy kadrlar tayyorlash va fundamental tadqiqotlar olib borish.",
    direction: "up",
  },
  {
    icon: <BookOpenText className="w-8 h-8 text-primary" />,
    title: "Magistratura",
    field: "Amaliy geologiya",
    duration: "2 yil",
    description:
      "Chuqur nazariy va amaliy bilimlarni egallash orqali malakani oshirish.",
    direction: "right",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Stajirovka Dasturlari",
    field: "Barcha yo'nalishlar",
    duration: "3–6 oy",
    description:
      "Xalqaro hamkorlik asosida ilmiy tajriba almashish dasturlari.",
    direction: "down",
  },
];

export const PostgraduatePrograms = () => {
  return (
    <section id="postgraduate" className="container mx-auto py-12 md:py-28">
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
              Oliy ta'limdan{" "}
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                {" "}
                keyingi ta'lim
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-center font-light">
              Ilmiy faoliyatingizni yangi bosqichga olib chiqing – PhD, DSc va
              magistratura dasturlarimiz orqali
            </p>
          </Fade>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {programs.map(
            ({ icon, title, field, duration, description, direction }) => (
              <Fade
                key={title}
                delay={400}
                duration={900}
                triggerOnce
                direction={direction}
                damping={0.4}
              >
                <Card
                  className={`
    relative overflow-hidden rounded-2xl 
    bg-gradient-to-b from-muted/60 to-background 
    border border-transparent 
    hover:transform hover:-translate-y-3
    group h-full text-left
    transition-all duration-500
  `}
                >
                  {/* Aylanadigan gradient border */}
                  <div className="absolute inset-0 rounded-2xl p-[2px] bg-[conic-gradient(from_0deg,theme(colors.primary)_0%,theme(colors.primary/60)_25%,theme(colors.primary/30)_50%,theme(colors.primary/60)_75%,theme(colors.primary)_100%)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-b from-muted/60 to-background" />
                  </div>

                  <CardHeader className="relative z-10">
                    <CardTitle className="flex flex-col gap-4 items-start text-lg font-semibold">
                      {/* Icon Box */}
                      <div
                        className="p-3 rounded-full bg-primary/10 text-primary 
                                                     group-hover:bg-primary group-hover:text-background 
                                                     transition-all duration-300"
                      >
                        {React.cloneElement(icon, {
                          className: "w-8 h-8 transition-colors duration-300",
                        })}
                      </div>
                      {title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 px-6 pb-6">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        <strong>Yo‘nalish:</strong> {field}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Davomiyligi:</strong> {duration}
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                        {description}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className="w-full mt-5 transition-transform duration-300 hover:scale-105"
                    >
                      Batafsil ma'lumot
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PostgraduatePrograms;
