import InterviewDashboard from "@/components/organisms/interviews/interview-dashboard";
import InterviewList from "@/components/organisms/interviews/interview-list";

const page = () => {
  return (
    <main className="pt-20 px-4 space-y-4 max-w-7xl mx-auto">
      <InterviewDashboard />
      <InterviewList />
    </main>
  );
};

export default page;
