"use client";

import { useUIStore } from "@/lib/store/useUIStore";
import DashboardCounts from "./dashboard-counts";
import DottedButton from "@/components/atoms/ui/dotted-button";
import { InterviewModal } from "./interview-modal";

const InterviewDashboard = () => {
  const {
    isCreateInterviewModalOpen,
    openCreateInterviewModal,
    closeCreateInterviewModal,
    setFetchInterviewList,
  } = useUIStore();

  return (
    <section className="p-4 md:p-8 md:my-10 rounded-xl border shadow-md space-y-4">
      <h2 className="text-base md:text-xl font-semibold">
        Interview Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DashboardCounts />
        <DottedButton
          onClick={openCreateInterviewModal}
          text="Create New Interview"
        />
      </div>

      <InterviewModal
        open={isCreateInterviewModalOpen}
        mode="create"
        onClose={closeCreateInterviewModal}
        onSuccess={() => {
          setFetchInterviewList(true);
        }}
      />
    </section>
  );
};

export default InterviewDashboard;
