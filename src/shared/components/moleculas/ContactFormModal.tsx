import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Headset, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInputWithCountrySelect from "react-phone-number-input";

const ContactFormModal = () => {
  const [phone, setPhone] = useState<string>("");
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed h-14 w-14 bottom-12 right-12 opacity-90 shadow-md"
          size="icon"
        >
          <Headset className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t("Create Menu")}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
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
              <PhoneInputWithCountrySelect
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
