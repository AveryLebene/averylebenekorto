"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFolder, FiBook, FiUser, FiMail } from "react-icons/fi";

const navItems = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/blog", label: "Blog", icon: FiBook },
  { href: "/about", label: "About", icon: FiUser },
  { href: "/contact", label: "Contact", icon: FiMail },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1e1e1e]/95 backdrop-blur border-t border-white/10 safe-area-pb active:font-bold"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-green-200 text-[#1E1E1E]"
                    : "text-[#c7c7c7] hover:text-green-200 hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden />
              </span>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? "text-green-200" : "text-white/80 hover:text-green-200/90"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
