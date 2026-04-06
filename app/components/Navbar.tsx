"use client";
import AL from "../../public/images/AL.svg";
import averyPortrait from "../../public/images/avery-3.jpg";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const CV_PATH = "/images/cv.pdf";
const CV_DOWNLOAD_NAME = "Avery-Lebene-Korto-CV.pdf";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const socialLinks = [
  {
    href: "https://github.com/AveryLebene",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    href: "https://www.linkedin.com/in/avery-lebene-korto-046293253/",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  {
    href: "mailto:averylebene@gmail.com",
    label: "Email",
    icon: FiMail,
  },
  {
    href: "https://wa.me/233268051515",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
] as const;

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const linkBase =
    "flex justify-center items-center rounded-full px-3 py-1 transition-all duration-300 border border-transparent hover:border-green-200/60 hover:text-green-200";
  const activeStyle = "border-green-200 text-green-200";
  const linkText =
    "text-[#c7c7c7] hover:text-green-200 transition-colors duration-200";

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const cvButtonClass =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border border-green-200/60 text-green-200 hover:bg-green-200/10 hover:border-green-200";

  return (
    <div className="bg-[#1e1e1e]/20 w-full xl:px-8 px-4 py-4 shadow-sm backdrop-blur">
      <nav
        className="relative flex items-center justify-between w-full max-w-7xl mx-auto gap-4"
        aria-label="Primary"
      >
        <div className="bg-white rounded-full shrink-0 z-10">
          <Link href="/">
            <Image
              src={AL}
              alt="Home"
              className=""
              width={40}
              height={40}
              priority
            />
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
          <div className="bg-[#1a1a1a] rounded-full px-4 py-1 border border-[#333]/60 pointer-events-auto">
            <ul className="flex gap-6 cursor-pointer justify-center items-center">
              {navLinks.map(({ href, label }) => (
                <li
                  key={href}
                  className={`${linkBase} ${pathname === href ? activeStyle : ""}`}
                >
                  <Link
                    href={href}
                    className={`flex justify-center items-center ${pathname === href ? "text-green-200" : linkText}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 shrink-0 z-10 ml-auto">
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className={cvButtonClass}
          >
            View CV
          </a>
        </div>

        <div className="md:hidden flex shrink-0 z-10">
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="p-2 rounded-full text-[#c7c7c7] hover:text-green-200 hover:bg-white/5 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-overlay"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {portalReady &&
        isOpen &&
        createPortal(
          <div
            id="mobile-nav-overlay"
            className="md:hidden fixed inset-0 z-[200] flex flex-col bg-black"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex justify-between shrink-0 items-center gap-2 px-3 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-4 sm:pb-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="shrink-0 rounded-full bg-white p-0.5 ring-1 ring-white/10"
              >
                <Image src={AL} alt="Home" width={40} height={40} priority />
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="shrink-0 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="block h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center min-h-0 overflow-y-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="shrink-0 rounded-full bg-green-200 px-5 py-2.5 text-center text-xs font-semibold tracking-wide text-[#1a1a1a] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8dcc8] sm:px-6 sm:text-sm"
                >
                  View CV
                </a>
              <div
                className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
                aria-label="Social links"
              >
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 transition-colors hover:text-green-200"
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </a>
                ))}
              </div>

              <nav
                className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-8"
                aria-label="Site pages"
              >
                {navLinks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className={`text-xs font-medium uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-green-200"
                          : "text-white/45 hover:text-white/80"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Navbar;
