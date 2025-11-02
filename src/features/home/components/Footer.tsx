"use client";

import Logo from "@/assets/logo.png";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background via-muted/50 to-muted border-t border-border/40">
      {/* Upper section */}
      <section className="container mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo & description */}
        <div className="space-y-5">
          <a href="/" className="flex items-center gap-3">
            <img src={Logo} alt="NGGI Logo" width={55} />
            <div>
              <h3 className="text-xl font-bold">NGGI</h3>
              <p className="text-sm text-muted-foreground leading-tight font-light">
                National Geology and Geoscience Institute
              </p>
            </div>
          </a>

          <p className="text-muted-foreground text-sm leading-relaxed font-light">
            Geologiya sohasida tadqiqot, ta'lim va innovatsiyalarda yetakchi
            institut.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Youtube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-foreground">
            Tezkor havolalar
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Bosh sahifa", "Yangiliklar", "Loyihalar", "Aloqa"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Research Fields */}
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-foreground">
            Ilmiy yo‘nalishlar
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "Geologiya",
              "Geofizika",
              "GIS va Zondlash",
              "Iqlim Tadqiqotlari",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-foreground">Aloqa</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-light">
            <li className="flex gap-2">
              <MapPin className="w-8 h-8 text-primary" />
              <div>Toshkent, O‘zbekiston — Mustaqillik shoh ko‘chasi 12-uy</div>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <div>+998 (71) 200-55-77</div>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <div>info@nggi.uz</div>
            </li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border/90" />

      {/* Bottom copyright */}
      <section className="container mx-auto py-6 text-sm text-muted-foreground text-center">
        <p>
          © 2025 <span className="font-semibold text-foreground">NGGI</span>.
          Barcha huquqlar himoyalangan.
        </p>
      </section>
    </footer>
  );
};
