import Image from "next/image";
import Link from "next/link";
import NavMenu from "./nav-menu";

import { MenuIcon } from "@/lib/constants/icons";
import NavMobile from "./nav-mobile";
import NavButtons from "./nav-buttons";

const Navbar = () => {
  return (
    <section className="fixed top-0 left-0 right-0 h-20 w-full py-3 px-4 z-50">
      <header
        className="
          mx-auto grid h-full max-w-5xl grid-cols-3 items-center rounded-full px-4 sm:px-8 border border-background/20 bg-background/10 backdrop-blur-xl backdrop-saturate-150 shadow-sm"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.svg" alt="Intervy logo" width={42} height={42} />
        </Link>

        <NavMenu />

        <NavMobile>
          <MenuIcon className="h-8 w-auto select-none" />
        </NavMobile>

        <NavButtons />
      </header>
    </section>
  );
};

export default Navbar;
