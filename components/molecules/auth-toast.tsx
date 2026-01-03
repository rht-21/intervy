"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function AuthToast() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get("signedOut")) {
      toast.success("Signed out successfully.");
      router.replace("/");
    }
    if (params.get("signedIn")) {
      toast.success("Signed in successfully.");
      router.replace("/interviews");
    }
  }, [params, router]);

  return null;
}
