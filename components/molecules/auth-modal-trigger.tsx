"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store/useUIStore";
import { useRouter } from "next/navigation";

export function AuthModalTrigger({ shouldOpen }: { shouldOpen: boolean }) {
  const openAuthDialog = useUIStore((state) => state.openAuthDialog);
  const router = useRouter();

  useEffect(() => {
    if (shouldOpen) {
      openAuthDialog();
      router.replace("/");
    }
  }, [shouldOpen, openAuthDialog, router]);

  return null;
}
