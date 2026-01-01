import { ArrowRight } from "lucide-react";
import { Button } from "../atoms/ui/button";
import AuthModal from "../molecules/auth-modal";
import { auth } from "@/auth";
import Link from "next/link";

const Hero = async () => {
  const session = await auth();

  return (
    <section
      id="hero"
      className="bg-[url('/images/blurred-bg.svg')] bg-cover bg-center pt-20 min-h-dvh"
    >
      <main className="center-align flex flex-col items-center gap-6 px-4 py-12 md:py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl lg:text-7xl text-balance md:max-w-2xl lg:max-w-4xl text-center">
          Practice interviews like real{" "}
          <span className="text-primary">conversations.</span>
        </h1>
        <h5 className="text-base lg:text-lg text-muted-foreground text-balance max-w-4xl text-center">
          Practice interviews in real time, without awkward pauses or peers.
          Just your voice, instant feedback, and conversations that flow.
        </h5>
        {!session ? (
          <AuthModal>
            <Button className="flex items-center justify-center gap-1 group">
              Get Started
              <ArrowRight className="stroke-[1.25] transition-transform duration-300 group-hover:-rotate-45" />
            </Button>
          </AuthModal>
        ) : (
          <Link href="/interviews" passHref>
            <Button className="flex items-center justify-center gap-1 group">
              Practice Now
              <ArrowRight className="stroke-[1.25] transition-transform duration-300 group-hover:-rotate-45" />
            </Button>
          </Link>
        )}
      </main>
    </section>
  );
};

export default Hero;
