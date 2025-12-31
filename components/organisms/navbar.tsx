import Image from "next/image";
import Link from "next/link";
import { Button } from "../atoms/ui/button";
import NavMenu from "./nav-menu";
import ThemeSwitch from "../molecules/theme-switch";

const Navbar = () => {
  return (
    <section className="fixed top-0 left-0 right-0 h-20 w-full py-3 px-4">
      <header className="flex items-center justify-between h-full border rounded-full px-4 md:px-8 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center justify-center gap-1">
          <Image src="/logo.svg" alt="Intervy logo" width={42} height={42} />
        </Link>

        <NavMenu />

        <div role="buttons" className="flex items-center justify-center gap-2">
          <ThemeSwitch />
          {/* {session && session?.user ? (
            <form action={handleLogout}>
              <Button className="rounded-full">Log Out</Button>
            </form>
          ) : (
            <form action={handleLogin}>
              <Button className="rounded-full">Sign In</Button>
            </form>
          )} */}
        </div>
      </header>
    </section>
  );
};

export default Navbar;
