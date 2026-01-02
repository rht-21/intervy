"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/ui/dialog";
import SignInButton from "./sign-in-button";
import Image from "next/image";
import { DialogProps } from "@radix-ui/react-dialog";
import { useUIStore } from "@/lib/store/useUIStore";

type AuthModalProps = DialogProps & {
  children?: React.ReactNode;
};

const AuthModal = ({ children, ...props }: AuthModalProps) => {
  const { isAuthDialogOpen, closeAuthDialog } = useUIStore();

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog} {...props}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="sr-only">
            <DialogTitle className="sr-only" />
          </DialogHeader>
          <section className="flex-center flex-col px-4 py-6 w-full">
            <Image
              src="/logo.svg"
              alt="Intervy logo"
              width={42}
              height={42}
              className="size-14 mb-4"
            />
            <h2 className="text-center text-2xl font-medium mb-2">
              Continue with Intervy
            </h2>
            <p className="text-center text-sm text-muted-foreground max-w-xs mb-8">
              Sign in to manage interviews, track progress, and access your
              personalized dashboard.
            </p>
            <SignInButton />
          </section>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AuthModal;
