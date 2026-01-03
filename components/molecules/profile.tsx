import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import ProfileImage from "../atoms/ui/profile-image";

import { auth } from "@/auth";
import SignOutButton from "./sign-out-button";

const Profile = async () => {
  const session = await auth();
  const name = session?.user?.name || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ProfileImage name={name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Hi {name}!</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>My Interviews</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
