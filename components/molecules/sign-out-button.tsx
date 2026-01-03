import { handleLogout } from "@/actions/auth";

const SignOutButton = () => {
  return (
    <form action={handleLogout}>
      <button type="submit" className="cursor-pointer w-full text-left">
        Sign Out
      </button>
    </form>
  );
};

export default SignOutButton;
