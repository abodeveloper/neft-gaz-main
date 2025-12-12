"use client";

import RuLogo from "@/assets/lang-icon/ru.png";
import UkLogo from "@/assets/lang-icon/uk.png";
import UzLogo from "@/assets/lang-icon/uz.png";
import LogoImage from "@/assets/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllMenus } from "@/features/home/api/home";
import { localized } from "@/i18n";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const FlagIcon = ({ code }: { code: string }) => {
  const flags: Record<string, string> = { en: UkLogo, uz: UzLogo, ru: RuLogo };
  const src = flags[code];
  if (!src) return null;
  return <img src={src} alt={code} className="w-5 h-5 mr-2 rounded-sm" />;
};

// Hover Dropdown (Desktop)
const HoverMenu = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const hasChildren = item.children && item.children.length > 0;
  const href =
    item.has_page && item.page_slug ? `/dynamic-page/${item.page_slug}` : "#";

  if (!hasChildren) {
    return (
      <NavLink to={href} className={cn(buttonVariants({ variant: "ghost" }))}>
        {localized(item, "title")}
      </NavLink>
    );
  }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-1"
        )}
      >
        {localized(item, "title")}
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="py-2">
            {item.children
              .filter((c: any) => c.status)
              .map((child: any) => (
                <HoverMenuItem key={child.id} item={child} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HoverMenuItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  const hasChildren = item.children && item.children.length > 0;
  const href =
    item.has_page && item.page_slug ? `/dynamic-page/${item.page_slug}` : "#";

  if (!hasChildren) {
    return (
      <NavLink
        to={href}
        className="block px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {localized(item, "title")}
      </NavLink>
    );
  }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
        {localized(item, "title")}
        <ChevronRight className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute top-0 left-full ml-1 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="py-2">
            {item.children
              .filter((c: any) => c.status)
              .map((child: any) => (
                <HoverMenuItem key={child.id} item={child} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile Menu
const MobileMenuItem = ({ item, depth = 0 }: { item: any; depth?: number }) => {
  const [open, setOpen] = useState(false);
  const href = item.has_page && item.page_slug ? `/${item.page_slug}` : "#";
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 text-left",
            depth === 0 &&
              "border-b border-slate-200 dark:border-slate-700 font-medium"
          )}
          style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
        >
          {localized(item, "title")}
          <ChevronRight
            className={cn("h-4 w-4 transition-transform", open && "rotate-90")}
          />
        </button>

        {open && (
          <div className="border-l-2 border-slate-300 dark:border-slate-600">
            {item.children
              .filter((c: any) => c.status)
              .map((child: any) => (
                <MobileMenuItem key={child.id} item={child} depth={depth + 1} />
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="block px-4 py-3 text-sm"
      style={{ paddingLeft: `${depth * 1.5 + 1.5}rem` }}
    >
      {localized(item, "title")}
    </a>
  );
};

export const Navbar = () => {
  const { i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: menuData = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: getAllMenus,
  });

  // Faqat status: true va parent: null bo‘lganlarni olamiz (root)
  const rootItems = menuData
    .filter((item) => item.parent === null && item.status)
    .sort((a, b) => a.position - b.position);

  const languages = [
    { code: "uz", label: "UZ" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  const currentLang = languages.find(
    (l) => l.code == (i18n.resolvedLanguage || i18n.language)
  );

  const changeLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-20 w-screen flex justify-between items-center">
          {/* Logo */}
          <NavigationMenuItem className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img src={LogoImage} alt="Logo" width={50} height={50} />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-bold text-xl">NGGI</span>
                {/* <span className="text-xs opacity-70">
                  Institute of Geology and Exploration of Oil and Gas Fields
                </span> */}
              </div>
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <ModeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 pt-10">
                <nav className="flex flex-col space-y-1 mt-6">
                  {rootItems.map((item) => (
                    <MobileMenuItem key={item.id} item={item} />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {rootItems.map((item) => (
              <HoverMenu key={item.id} item={item} />
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Select
              value={i18n.resolvedLanguage || i18n.language}
              onValueChange={changeLang}
            >
              <SelectTrigger className="w-24 h-9">
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
