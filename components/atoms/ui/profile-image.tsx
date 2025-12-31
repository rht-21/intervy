const ProfileImage = ({ name }: { name: string }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  return (
    <span className="bg-primary text-primary-foreground hover:bg-primary/90 flex aspect-square h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 font-medium">
      {firstNameInitial}
    </span>
  );
};
export default ProfileImage;
