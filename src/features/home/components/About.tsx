import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FileText, Medal, Users } from "lucide-react";
import React from "react";
import { Fade } from "react-awesome-reveal";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    {
      quantity: 2700,
      suffix: "+",
      description: "Talabalar soni",
      icon: <Users className="w-8 h-8" />,
      direction: "left",
    },
    {
      quantity: 1800,
      suffix: "+",
      description: "Ilmiy xodimlar",
      icon: <Award className="w-8 h-8" />,
      direction: "up",
    },
    {
      quantity: 112,
      description: "Loyiha va grantlar",
      icon: <FileText className="w-8 h-8" />,
      direction: "up",
    },
    {
      quantity: 4,
      description: "Ilmiy nashrlar (yiliga)",
      icon: <Medal className="w-8 h-8" />,
      direction: "right",
    },
  ];

  return (
    <section id="about" className="py-12 md:py-28 bg-muted" ref={ref}>
      <div className="container mx-auto">
        <div className="space-y-16">
          <div className="space-y-6">
            <Fade
              delay={500} // Wait 200ms before starting
              duration={1000} // Animation lasts 1 second
              triggerOnce // Only animate once
              fraction={1} // Start animation when element is 50% visible
              direction="up"
              cascade
              damping={0.5}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Raqamlarda
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  {" "}
                  bizning ta'sirimiz
                </span>
              </h2>
              <p className="text-xl text-muted-foreground text-center font-light">
                NGGI – bu zamonaviy geologiya fanining oldingi qatorida
                yuruvchi, ilmiy izlanish, innovatsion yechimlar va amaliy
                natijalarga yo‘naltirilgan kuchli, birlashgan va maqsadga
                intiluvchi jamoa. Bizning har bir a’zomiz – o‘z sohasida
                tajribali mutaxassis, ilmiy izlanishlarga sadoqatli olim va
                tabiatning chuqur sirlarini ochishga qodir geolog.
              </p>
            </Fade>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Fade
                delay={500} // Wait 200ms before starting
                duration={1500} // Animation lasts 1 second
                // triggerOnce // Only animate once
                // fraction={0.5} // Start animation when element is 50% visible
                direction={stat.direction as "up" | "down" | "left" | "right"}
                cascade
                damping={0.5}
              >
                <Card
                  key={index}
                  className="relative overflow-hidden border border-primary/10 bg-card/80 backdrop-blur-sm 
                         hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 
                         hover:-translate-y-1 group"
                >
                  {/* Gradient accent line */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/40 
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />

                  <CardHeader className="pb-3 text-center">
                    <CardTitle className="flex flex-col items-center gap-3">
                      {/* Ikon: hover'da oq, odatda primary rang */}
                      <div
                        className="p-3 rounded-full bg-primary/10 text-primary 
                               group-hover:bg-primary group-hover:text-white 
                               transition-all duration-300"
                      >
                        {React.cloneElement(stat.icon, {
                          className: "w-8 h-8 transition-colors duration-300",
                        })}
                      </div>

                      {/* Animatsiyali raqam */}
                      <div className="text-3xl md:text-4xl font-bold text-foreground">
                        {inView ? (
                          <CountUp
                            start={0}
                            end={stat.quantity}
                            duration={2.5}
                            suffix={stat.suffix || ""}
                            separator=","
                            useEasing={true}
                          />
                        ) : (
                          "0"
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-sm md:text-base text-muted-foreground font-light">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
