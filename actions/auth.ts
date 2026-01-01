"use server";

import { signIn, signOut } from "@/auth";

export const handleLogout = async () => {
  "use server";

  await signOut({ redirect: true, redirectTo: "/?signedOut=1" });
};

export const handleLogin = async () => {
  "use server";

  await signIn("google", { redirect: true, redirectTo: "/?signedIn=1" });
};
