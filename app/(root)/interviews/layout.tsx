import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/?login=1");
  }
  return <main className="font-sans">{children}</main>;
};

export default RootLayout;
