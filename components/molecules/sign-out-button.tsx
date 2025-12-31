import { signOut } from "@/auth";

const handleLogout = async () => {
  "use server";

  await signOut({ redirect: true, redirectTo: "/" });
};

const SignOutButton = () => {
  return (
    <form action={handleLogout}>
      <button type="submit" className="cursor-pointer">
        Sign Out
      </button>
    </form>
  );
};

export default SignOutButton;
