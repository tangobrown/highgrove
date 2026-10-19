"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site, type NavItem, type NavLink } from "@/lib/site";
import { buttonClasses } from "@/components/ui/Button";

const isGroup = (item: NavItem): item is Extract<NavItem, { children: NavLink[] }> => "children" in item;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`relative top-0.5 size-[18px] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  };

  // Close menus on navigation. Adjusting state during render on pathname change
  // avoids a cascading effect render.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // Escape + click outside close the desktop dropdowns.
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openDropdown]);

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: lock body scroll, trap focus, Escape closes, close if resized to desktop.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      [menuButtonRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(
        Boolean,
      ) as HTMLElement[];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeMobile();
      if (e.key !== "Tab") return;
      const els = focusables();
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1240px)");
    const onMq = () => mq.matches && setMobileMenuOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [mobileMenuOpen, closeMobile]);

  const bookHref = pathname === "/" ? "#visit" : "#enquire";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/94 backdrop-blur-[10px]">
      <div className="container-site flex items-center gap-x-8 py-4">
        <Link href="/" className="flex shrink-0" aria-label="Highgrove — home">
          <Image
            src="/images/logo-wide.png"
            alt="Highgrove Retirement Village & Patrick Ferry House"
            width={259}
            height={48}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <div className="ml-auto flex items-center gap-3 sm:gap-6">
          <nav ref={navRef} aria-label="Main" className="hidden items-center gap-x-[26px] text-base font-bold nav:flex">
            {nav.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`py-2.5 whitespace-nowrap transition-colors hover:text-green-text ${
                      isActive(item.href) ? "text-green-text" : "text-teal"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const open = openDropdown === item.key;
              const groupActive = item.children.some((c) => isActive(c.href));
              const menuId = `nav-${item.key}`;
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenDropdown(item.key);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() => setOpenDropdown(open ? null : item.key)}
                    className={`flex items-center gap-1 py-2.5 font-bold whitespace-nowrap transition-colors hover:text-green-text ${
                      groupActive ? "text-green-text" : "text-teal"
                    }`}
                  >
                    {item.label}
                    <Chevron open={open} />
                  </button>
                  <div
                    id={menuId}
                    hidden={!open}
                    className="absolute top-full -left-4 z-60 pt-2"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setOpenDropdown(null);
                        (e.currentTarget.previousElementSibling as HTMLElement | null)?.focus();
                      }
                    }}
                  >
                    <ul className="grid min-w-[220px] rounded-2xl bg-white p-2 shadow-pop">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className={`block rounded-[10px] px-4 py-[11px] text-base font-normal whitespace-nowrap hover:bg-cream ${
                              isActive(child.href) ? "text-green-text" : "text-teal"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <a href={bookHref} className={buttonClasses("primary", "md", "hidden shrink-0 xs:inline-flex")}>
            Book a tour
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-teal px-5 text-base font-bold whitespace-nowrap text-teal transition-colors hover:bg-teal hover:text-white nav:hidden"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="max-h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain border-t border-border bg-cream nav:hidden"
        >
          <nav aria-label="Mobile" className="container-site pt-2 pb-7">
            {nav.map((item) =>
              isGroup(item) ? (
                <div key={item.key} className="border-b border-rule pt-[18px] pb-3">
                  <div className="mb-1.5 font-display text-[26px]">{item.label}</div>
                  <div className="grid pl-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive(child.href) ? "page" : undefined}
                        className={`block py-[9px] text-[17px] hover:text-green-text ${
                          isActive(child.href) ? "font-bold text-green-text" : "text-body"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block border-b border-rule py-[18px] font-display text-[26px] hover:text-green-text ${
                    isActive(item.href) ? "text-green-text" : "text-teal"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="flex flex-wrap items-center gap-4 pt-[22px]">
              <a href={site.phone.href} className="text-[17px] font-bold">
                Phone {site.phone.short}
              </a>
              <a
                href={bookHref}
                onClick={() => setMobileMenuOpen(false)}
                className={buttonClasses("primary", "md", "xs:hidden")}
              >
                Book a tour
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
