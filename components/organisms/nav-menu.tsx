"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItems = {
  label: string;
  href: string;
};

const navItems: NavItems[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Interviews",
    href: "/interviews",
  },
];

type NavMenuProps = {
  isMobile?: boolean;
};

const NavMenu = ({ isMobile = false }: NavMenuProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn(isMobile ? "" : "grow")}>
      <ul
        className={cn(
          "gap-6 sm:gap-4 lg:gap-6",
          isMobile
            ? "flex max-sm:flex-col items-start"
            : "items-center justify-center hidden sm:flex"
        )}
      >
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "duration-300 hover:text-primary capitalize",
                pathname === item.href ? "text-primary" : "",
                isMobile ? "text-lg" : "text-sm"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
