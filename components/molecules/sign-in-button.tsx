import { handleLogin } from "@/actions/auth";
import { Button } from "../atoms/ui/button";
import { GoogleIcon } from "@/lib/constants/icons";

const SignInButton = () => {
  return (
    <form action={handleLogin}>
      <Button variant="outline" className="flex items-center gap-4">
        <GoogleIcon />
        Sign In with Google
      </Button>
    </form>
  );
};

export default SignInButton;
