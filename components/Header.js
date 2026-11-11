"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Moon, Search, Sun, UserRound, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useShop } from "@/components/ShopProvider";

const links = [
  { href: "/collections/men", key: "men" },
  { href: "/collections/women", key: "women" },
  { href: "/collections/all", key: "allProducts" },
  { href: "/contact", key: "contact" },
];

function DesktopNav({ t }) {
  const pathname = usePathname();

  return (
    <nav className="hidden border-t border-line lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-8">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 py-3 text-sm font-bold ${active ? "border-accent text-accent" : "border-transparent text-ink hover:text-accent"}`}
            >
              {t(link.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function DesktopNavFallback({ t }) {
  return (
    <nav className="hidden border-t border-line lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-8">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="border-b-2 border-transparent py-3 text-sm font-bold">
            {t(link.key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Header() {
  const { t, lang, setLang, toggleTheme, count, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useShop();
  const [langOpen, setLangOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-card shadow-[0_1px_0_var(--line)]">
      <Link href="/#shop" className="flex items-center justify-center bg-accent px-4 py-2 text-center text-xs font-bold text-white sm:text-sm">
        {t("announcement")}
      </Link>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
        <Link href="/" aria-label="Haat home" className="shrink-0">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
          className="hidden min-w-0 flex-1 items-center gap-2 rounded-xl bg-bg-alt px-4 py-2.5 text-left text-sm font-medium text-muted md:flex"
        >
          <Search className="h-4 w-4 text-accent" />
          <span className="truncate">{t("searchPlaceholder")}</span>
        </button>
        <div className="ml-auto flex items-center gap-0.5">
          <div className="relative">
            <button
              type="button"
              className="hidden items-center gap-1 rounded-lg px-2 py-2 text-sm font-bold xl:flex"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((open) => !open)}
            >
              {lang === "hi" ? "हि" : "EN"}
              <ChevronDown className="h-4 w-4" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 min-w-32 overflow-hidden rounded-xl border border-line bg-card py-1 shadow-lg">
                {[
                  ["en", "english"],
                  ["hi", "hindi"],
                ].map(([code, key]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm font-semibold hover:bg-bg-alt ${lang === code ? "text-accent" : ""}`}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={toggleTheme} aria-label={t("toggleTheme")} className="rounded-lg p-2 hover:bg-bg-alt">
            <Sun className="hidden h-5 w-5 dark:block" />
            <Moon className="h-5 w-5 dark:hidden" />
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
            aria-label={t("search")}
            className="rounded-lg p-2 hover:bg-bg-alt md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" aria-label={t("profile")} className="rounded-lg p-2 hover:bg-bg-alt">
            <UserRound className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setCartOpen(true);
            }}
            aria-label={`${t("openCart")}, ${count} items`}
            className="relative rounded-lg p-2 hover:bg-bg-alt"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {count > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-md bg-accent px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-bg-alt lg:hidden"
            aria-expanded={menuOpen}
            aria-label={t("toggleMenu")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <Suspense fallback={<DesktopNavFallback t={t} />}>
        <DesktopNav t={t} />
      </Suspense>
      {menuOpen && (
        <nav className="border-t border-line lg:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className="block border-b border-line px-4 py-3.5 text-[15px] font-bold">
              {t(link.key)}
            </Link>
          ))}
          <Link href="/account" onClick={closeMenu} className="block border-b border-line px-4 py-3.5 text-[15px] font-bold">
            {t("profile")}
          </Link>
          <div className="flex gap-2 px-4 py-3">
            <button type="button" onClick={() => setLang("en")} className={`rounded-lg px-3 py-1.5 text-sm font-bold ${lang === "en" ? "bg-accent text-white" : "bg-bg-alt"}`}>
              English
            </button>
            <button type="button" onClick={() => setLang("hi")} className={`rounded-lg px-3 py-1.5 text-sm font-bold ${lang === "hi" ? "bg-accent text-white" : "bg-bg-alt"}`}>
              हिन्दी
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
