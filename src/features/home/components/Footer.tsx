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
      <section className="container mx-auto py-16 grid grid-cols-1 sm:grid-cols-[0.8fr_1.4fr_0.8fr] gap-12">
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

        <div className="rounded-2xl overflow-hidden shadow-lg border border-border/40">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.6210669376543!2d69.24007387586727!3d41.29949597131205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b7cf86b2d07%3A0x62f60772fdd8c6f1!2sTashkent!5e0!3m2!1sen!2s!4v1694871612208!5m2!1sen!2s"
            width="100%"
            height="200"
            loading="lazy"
            className="border-0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-foreground">Aloqa</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-light">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="leading-snug">
                Toshkent, O‘zbekiston — Mustaqillik shoh ko‘chasi 12-uy
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="leading-snug">+998 (71) 200-55-77</div>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="leading-snug">info@nggi.uz</div>
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
