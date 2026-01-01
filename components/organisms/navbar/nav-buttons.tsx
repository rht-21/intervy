import { Button } from "../../atoms/ui/button";
import { auth } from "@/auth";
import ThemeSwitch from "../../molecules/theme-switch";
import AuthModal from "../../molecules/auth-modal";
import Profile from "../../molecules/profile";
import { cn } from "@/lib/utils";

const NavButtons = async ({ isMobile = false }: { isMobile?: boolean }) => {
  const session = await auth();

  return (
    <div
      role="nav-buttons"
      className={cn(
        isMobile
          ? "flex flex-col-reverse sm:hidden gap-4 mt-6"
          : "hidden sm:flex-center gap-2"
      )}
    >
      <ThemeSwitch />
      {session && session?.user ? (
        <Profile />
      ) : (
        <AuthModal>
          <Button className="rounded-full">Sign In</Button>
        </AuthModal>
      )}
    </div>
  );
};

export default NavButtons;
