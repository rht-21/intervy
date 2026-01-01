import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/ui/sheet";
import NavMenu from "./nav-menu";
import NavButtons from "./nav-buttons";

const NavMobile = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden">{children}</SheetTrigger>
      <SheetContent className="flex flex-col p-8 max-sm:visible sm:hidden">
        <SheetHeader>
          <SheetTitle className="sr-only" />
        </SheetHeader>
        <SheetClose asChild>
          <NavMenu isMobile />
        </SheetClose>
        <NavButtons isMobile />
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
