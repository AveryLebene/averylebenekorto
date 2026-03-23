"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

const linkBase =
  "block py-2 px-3 rounded-lg transition-all duration-200 border-l-2 border-transparent -ml-px pl-3 text-[#c7c7c7] hover:text-green-200 hover:border-green-200/50";
const linkActive = "text-green-200 border-green-200 font-medium";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed right-0 flex shadow bg-[#1a1a1a]/95 backdrop-blur border border-[#333]/60 rounded-lg px-6 py-4 z-50 mt-2 mr-2">
      <ul className="space-y-1">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`${linkBase} ${isActive ? linkActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;