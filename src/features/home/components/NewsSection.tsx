"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import NewsImage1 from "@/assets/news/news-1.webp";
import NewsImage2 from "@/assets/news/news-2.webp";
import NewsImage3 from "@/assets/news/news-3.webp";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: string;
  image: string;
  title: string;
  description: string;
  content?: string;
  date: string;
  type?: "news" | "announcement";
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    image: NewsImage1,
    title: "Yangi geofizik tadqiqot loyihasi boshlandi",
    description:
      "Institut olimlari tomonidan Farg‘ona vodiysida yangi geofizik tahlillar boshlanmoqda.",
    date: "2025-10-12",
    type: "news",
  },
  {
    id: "2",
    image: NewsImage2,
    title: "Talabalar uchun ilmiy seminar",
    description:
      "NGGI yosh tadqiqotchilar uchun iqlim o‘zgarishi bo‘yicha maxsus seminar o‘tkazadi.",
    date: "2025-09-28",
    type: "announcement",
  },
  {
    id: "3",
    image: NewsImage3,
    title: "Geologlar xalqaro konferensiyasi",
    description:
      "2025-yilgi xalqaro geologiya konferensiyasida NGGI vakillari qatnashadi.",
    date: "2025-11-04",
    type: "news",
  },
  {
    id: "4",
    image: NewsImage3,
    title: "Yangi laboratoriya ochildi",
    description:
      "Geokimyo bo‘limida zamonaviy asbob-uskunalar bilan jihozlangan yangi laboratoriya ishga tushirildi.",
    date: "2025-08-15",
    type: "news",
  },
  {
    id: "5",
    image: NewsImage1,
    title: "Xalqaro hamkorlik kengaymoqda",
    description:
      "NGGI Turkiya va Germaniya ilmiy markazlari bilan hamkorlik NGGI Turkiya va Germaniya memorandumini imzoladi.",
    date: "2025-09-10",
    type: "news",
  },
  {
    id: "6",
    image: NewsImage2,
    title: "Magistraturaga arizalar qabul qilinmoqda",
    description:
      "Geologiya va Yer fanlari bo‘yicha magistratura dasturlariga arizalar topshirish muddati boshlandi.",
    date: "2025-11-01",
    type: "announcement",
  },
];


export const NewsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto text-center py-12 md:py-28">
      <div className="space-y-16">
        <div className="space-y-6">
          <Fade
            delay={300}
            duration={1000}
            triggerOnce
            direction="up"
            cascade
            damping={0.3}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Yangiliklar va{" "}
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                E'lonlar
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-center font-light">
              NGGI dagi so'nggi yangiliklar, ilmiy yutuqlar va tadbirlardan
              xabardor bo'ling
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <Fade
              key={item.id}
              delay={350 + idx * 80}
              duration={900}
              triggerOnce
              direction="up"
            >
              <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-background border border-border/60 backdrop-blur-sm transition-all duration-500 ease-out  hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] hover:border-primary/40 group">
                {/* Image + Badge in header */}
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Badge positioned over image bottom-left */}
                  {item.type && (
                    <div className="absolute left-4 bottom-4 z-10">
                      <Badge
                        variant={item.type === "news" ? "default" : "secondary"}
                      >
                        {item.type === "news" ? "Yangilik" : "E'lon"}
                      </Badge>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                <CardHeader className="text-left px-6 pt-4">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-left px-6 pb-6">
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Date and Read More placed together */}
                  <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3 justify-between w-full">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 opacity-80" />
                        <span>
                          {new Date(item.date).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Read more button next to date */}
                      <Button
                        size="sm"
                        className="ml-2"
                        onClick={() => navigate(`/news/${item.id}`)}
                      >
                        Batafsil o'qish
                      </Button>
                    </div>

                    <div />
                  </div>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
