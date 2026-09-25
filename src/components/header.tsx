"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#membership", label: "Абонемент" },
  { href: "#request", label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-black/30 backdrop-blur-2xl backdrop-saturate-150 min-[768px]:hidden">
      <div className="flex h-[50px] items-center justify-between px-4">
        <a
          href="#top"
          className="font-nav text-lg leading-[18px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          T-FIT PREMIUM
        </a>
        <button
          type="button"
          className="relative h-4 w-[42px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Закрыть меню" : "Открыть меню"}</span>
          <img src="/icons/menu.svg" alt="" className="absolute inset-x-0 -top-0.5 h-[18px] w-[42px]" />
        </button>
      </div>
      {menuOpen ? (
        <nav id="mobile-nav" aria-label="Разделы" className="bg-ink px-4 py-3">
          <ul className="grid">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex min-h-12 items-center font-nav text-lg text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#request"
                className="mt-2 inline-flex h-12 items-center bg-bronze px-6 text-base font-medium text-white"
                onClick={() => setMenuOpen(false)}
              >
                Оставить заявку
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
    <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-white/30 bg-black/30 backdrop-blur-2xl backdrop-saturate-150 min-[768px]:block md:hidden">
      <div className="flex h-[50px] items-center justify-between px-4">
        <a
          href="#top"
          className="font-nav text-lg leading-[18px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          T-FIT PREMIUM
        </a>
        <button
          type="button"
          className="relative h-4 w-[42px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-expanded={menuOpen}
          aria-controls="tablet-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Закрыть меню" : "Открыть меню"}</span>
          <img src="/icons/menu.svg" alt="" className="absolute inset-x-0 -top-0.5 h-[18px] w-[42px]" />
        </button>
      </div>
      {menuOpen ? (
        <nav id="tablet-nav" aria-label="Разделы" className="bg-ink px-4 py-3">
          <ul className="grid">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex min-h-12 items-center font-nav text-lg text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#request"
                className="mt-2 inline-flex h-12 items-center bg-bronze px-6 text-base font-medium text-white"
                onClick={() => setMenuOpen(false)}
              >
                Оставить заявку
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
    <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-white/30 bg-black/30 backdrop-blur-2xl backdrop-saturate-150 md:block">
      <div className="flex h-[50px] items-center justify-between px-5 min-[1100px]:grid min-[1100px]:h-[50px] min-[1100px]:grid-cols-[1fr_auto_1fr] min-[1100px]:items-center min-[1100px]:px-[60px]">
        <a
          href="#top"
          className="font-nav text-lg leading-none font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          T-FIT PREMIUM
        </a>

        <nav className="hidden items-center justify-center gap-[33px] min-[1100px]:flex" aria-label="Разделы">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-nav text-lg leading-none text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#request"
          className="hidden h-12 items-center justify-self-end bg-bronze px-6 text-base font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold min-[1100px]:inline-flex"
        >
          Оставить заявку
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white min-[1100px]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-expanded={menuOpen}
          aria-controls="compact-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Закрыть меню" : "Открыть меню"}</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden>
            <span className="h-px w-full bg-white" />
            <span className="h-px w-full bg-white" />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <nav id="compact-nav" aria-label="Разделы" className="border-t border-white/15 px-4 py-3 min-[1100px]:hidden">
          <ul className="grid">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex min-h-12 items-center font-nav text-lg text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#request"
                className="mt-2 inline-flex h-12 items-center bg-bronze px-6 text-base font-medium text-white"
                onClick={() => setMenuOpen(false)}
              >
                Оставить заявку
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
    </>
  );
}
