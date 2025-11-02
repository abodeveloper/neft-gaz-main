"use client";

import { useState, useRef, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import LogoImage from "@/assets/logo.png";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

import RuLogo from "@/assets/lang-icon/ru.png";
import UkLogo from "@/assets/lang-icon/uk.png";
import UzLogo from "@/assets/lang-icon/uz.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// FlagIcon — <img> sifatida
const FlagIcon = ({ code }: { code: string }) => {
  const flags: Record<string, string> = {
    en: UkLogo,
    uz: UzLogo,
    ru: RuLogo,
  };

  const src = flags[code];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${code} flag`}
      className="w-5 h-5 mr-2 object-contain rounded-sm"
    />
  );
};

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

const menuList: MenuItem[] = [
  {
    label: "Biz haqimizda",
    children: [
      { label: "Institut tarixi", href: "#history" },
      { label: "Rahbariyat", href: "#leadership" },
      { label: "Tuzilma", href: "#structure" },
      { label: "Hamkorliklar", href: "#partners" },
      { label: "Hujjatlar", href: "#documents" },
    ],
  },
  {
    label: "Faoliyat yo‘nalishlari",
    children: [
      {
        label: "Geologik tadqiqotlar",
        children: [
          { label: "Mineralogiya", href: "#mineralogy" },
          { label: "Geofizika", href: "#geophysics" },
          { label: "Gidrogeologiya", href: "#hydrogeology" },
        ],
      },
      {
        label: "Ekologiya va atrof-muhit",
        children: [
          { label: "Monitoring tizimi", href: "#monitoring" },
          { label: "Barqaror rivojlanish", href: "#sustainability" },
        ],
      },
      { label: "Innovatsion loyihalar", href: "#projects" },
    ],
  },
  {
    label: "Ilmiy faoliyat",
    children: [
      { label: "Tadqiqotlar", href: "#research" },
      { label: "Nashrlar", href: "#publications" },
      { label: "Konferensiyalar", href: "#conferences" },
      { label: "Grantlar", href: "#grants" },
    ],
  },
  {
    label: "Aloqa",
    href: "#contact",
  },
];


// Hover Dropdown Component (Desktop)
const HoverMenu = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  if (!item.children) {
    return (
      <a href={item.href} className={buttonVariants({ variant: "ghost" })}>
        {item.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-1 h-full"
        )}
      >
        {item.label}
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-90" : ""
          )}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="py-1">
            {item.children.map((child) => (
              <HoverMenuItem key={child.label} item={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Submenu Item (with nested support)
const HoverMenuItem = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (!item.children) {
    return (
      <a
        href={item.href}
        className={cn(
          "block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        )}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      {/* Submenu Trigger */}
      <button
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        )}
      >
        {item.label}
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Nested Dropdown */}
      {isOpen && (
        <div
          className="absolute top-0 left-full w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50"
          style={{ marginLeft: "0.25rem" }}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="py-1">
            {item.children.map((child) => (
              <HoverMenuItem key={child.label} item={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile Menu (Click + Indent)
const MobileMenuItem = ({
  item,
  depth = 0,
}: {
  item: MenuItem;
  depth?: number;
}) => {
  const [open, setOpen] = useState(false);
  const paddingLeft = `${1.5 + depth * 1.8}rem`;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
            depth === 0 && "border-b border-slate-200 dark:border-slate-700"
          )}
          style={{ paddingLeft }}
        >
          {item.label}
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open ? "rotate-90" : ""
            )}
          />
        </button>

        {open && (
          <div className="border-l-2 border-slate-300 dark:border-slate-600 ml-8">
            {item.children.map((child) => (
              <MobileMenuItem
                key={child.label}
                item={child}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className={cn(
        "block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      )}
      style={{ paddingLeft }}
    >
      {item.label}
    </a>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "uz", label: "O‘zbekcha" },
    { code: "ru", label: "Русский" }, // To‘g‘ri: label: "Русский"
  ];

  const handleLanguageChange = async (value: string) => {
    await i18n.changeLanguage(value);
  };

  const currentLang = languages.find(
    (l) => l.code === (i18n.resolvedLanguage || i18n.language)
  );

  return (
    <header className="sticky py-2 top-0 z-40 w-full border-b bg-white dark:bg-background dark:border-slate-700">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 w-screen flex justify-between items-center">
          {/* Logo */}
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="flex items-center gap-2">
              <img src={LogoImage} alt="" width={50} />
              <div className="flex flex-col leading-tight">
                <div className="font-bold text-xl">NGGI</div>
                <div className="text-sm opacity-70 font-light">
                  National Geology and Geoscience Institute
                </div>
              </div>
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] pt-12"
              >
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-1">
                  {menuList.map((item) => (
                    <MobileMenuItem key={item.label} item={item} />
                  ))}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <a
                      href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full flex justify-center border ${buttonVariants(
                        {
                          variant: "secondary",
                        }
                      )}`}
                    >
                      Github
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {menuList.map((item) => (
              <HoverMenu key={item.label} item={item} />
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <Select
              value={i18n.resolvedLanguage || i18n.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-36 h-9">
                <SelectValue>
                  {currentLang && (
                    <div className="flex items-center">
                      <FlagIcon code={currentLang.code} />
                      <span>{currentLang.label}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center">
                      <FlagIcon code={lang.code} />
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
