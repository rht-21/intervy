import { auth } from "@/auth";
import InterviewList from "@/components/organisms/interviews/interview-list";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/");

  return (
    <main className="mt-20 md:pt-5 px-4 space-y-4 max-w-7xl mx-auto">
      <InterviewList
        heading="Browse Interviews"
        subheading="All interviews at a glance. View what others have created."
        isPublic
        userId={userId}
      />
    </main>
  );
};

export default page;
