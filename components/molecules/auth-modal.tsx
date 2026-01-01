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
import { useRouter, useSearchParams } from "next/navigation";

type AuthModalProps = DialogProps & {
  children?: React.ReactNode;
};

const AuthModal = ({ children, ...props }: AuthModalProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const isOpen = params.has("login");

  return (
    <Dialog open={isOpen} onOpenChange={() => router.back()} {...props}>
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
