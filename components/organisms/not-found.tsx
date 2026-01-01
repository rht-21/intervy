"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/atoms/ui/button";

export default function NotFound() {
  return (
    <div className="h-dvh flex items-center justify-center p-4 relative">
      <div className="max-w-2xl w-full relative z-10">
        {/* Main heading */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground md:text-lg mb-2">
            You look a little lost...
          </p>
          <h1 className="text-3xl md:text-5xl text-balance font-bold text-foreground mb-6">
            Ooops! Page not found
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">
            Looks like the link went nowhere, or the page moved.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-12 relative">
          <Image
            src="/images/not-found.svg"
            alt="Not Found!"
            width={300}
            height={200}
            className="size-40 md:size-60 dark:invert-100"
          />
        </div>

        {/* Navigation cards */}
        <div className="flex-center">
          <Link href="/">
            <Button className="flex-center gap-1 group">
              <ArrowLeft className="w-5 h-5 stroke-[1.5] group-hover:translate-x-[-0.25rem] duration-200 transition-transform" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
