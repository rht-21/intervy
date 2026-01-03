import InterviewDashboard from "@/components/organisms/interviews/interview-dashboard";
import InterviewList from "@/components/organisms/interviews/interview-list";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/");

  return (
    <main className="pt-20 px-4 space-y-4 max-w-7xl mx-auto">
      <InterviewDashboard />
      <InterviewList
        heading="Recent Interviews"
        subheading="View and manage your recent interviews"
        userId={userId}
      />
    </main>
  );
};

export default page;
