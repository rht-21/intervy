"use client";

import { SheetClose } from "@/components/atoms/ui/sheet";
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
    label: "Browse",
    href: "/interviews/browse",
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

  const isActive = (href: string) => {
    if (pathname === href) return true;

    if (
      href === "/interviews" &&
      pathname.startsWith("/interviews/") &&
      !pathname.startsWith("/interviews/browse")
    ) {
      return true;
    }

    return false;
  };

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
            {isMobile ? (
              <SheetClose asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "duration-300 hover:text-primary capitalize",
                    isActive(item.href) ? "text-primary" : "",
                    "text-lg"
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "duration-300 hover:text-primary capitalize",
                  isActive(item.href) ? "text-primary" : "",
                  "text-sm"
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
