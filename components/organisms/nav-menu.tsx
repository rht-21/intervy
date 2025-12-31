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
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="grow">
      <ul className="flex items-center justify-center md:gap-4 lg:gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-sm duration-300 hover:text-primary",
                pathname === item.href ? "text-primary" : ""
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
