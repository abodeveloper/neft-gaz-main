"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AtSign,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Logo from "@/assets/logo.png";

export const Contact = () => {
  const [phone, setPhone] = useState<string>("");

  return (
    <section id="contact" className="py-16 md:py-28 bg-muted/50 border-t border-border/90">
      <div className="container mx-auto space-y-16">
        {/* Main Contact Card – Rasmga mos layout */}
        <Fade delay={300} duration={1000} 
        triggerOnce 
        direction="up">
          <Card className="bg-background/80 backdrop-blur-xl border border-border/40 shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-12 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* LEFT: Title + Description + Social Icons */}
                <div className="flex flex-col justify-between space-y-8 h-full">
                  {/* Send Icon */}
                  <div className="w-fit">
                    <img src={Logo} width={70} alt="" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      Get in Touch with Us
                    </h2>
                    <p className="text-xl text-muted-foreground font-light">
                      Have questions or need assistance? Our team is here to
                      help you secure and optimize your business anytime.
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-3">
                    {[
                      MessageCircle,
                      Mail,
                      Phone,
                      Instagram,
                      Twitter,
                      AtSign,
                    ].map((Icon, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="p-3 rounded-full bg-muted/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Contact Form */}
                <div className="space-y-6">
                  <form className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="h-12 bg-muted/30 border-border/50 placeholder:text-muted-foreground/60"
                      />
                    </div>

                    {/* Phone – react-phone-number-input */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Your phone number</Label>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="UZ"
                        value={phone}
                        onChange={(value) => setPhone(value || "")}
                        placeholder="Enter phone number"
                        className="phone-input-custom pl-4"
                        id="phone"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Your message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Enter your message"
                        className="bg-muted/30 border-border/50 resize-none placeholder:text-muted-foreground/60"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full font-medium flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </Fade>

        {/* Google Map – Pastda, animatsiyali */}
        <Fade delay={500} duration={1000} 
        triggerOnce 
        direction="up">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border/40">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.6210669376543!2d69.24007387586727!3d41.29949597131205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b7cf86b2d07%3A0x62f60772fdd8c6f1!2sTashkent!5e0!3m2!1sen!2s!4v1694871612208!5m2!1sen!2s"
              width="100%"
              height="400"
              loading="lazy"
              className="border-0"
              allowFullScreen
            ></iframe>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Contact;
