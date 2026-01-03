"use client";

import { useEffect, useState } from "react";
import CountCard from "@/components/molecules/count-card";
import { useUIStore } from "@/lib/store/useUIStore";
import Loader from "@/components/molecules/loader";

type InterviewStats = {
  totalInterviews: number;
  completedInterviews: number;
};

const DashboardCounts = () => {
  const { isLoading, openLoader, closeLoader, fetchInterviewList } =
    useUIStore();
  const [stats, setStats] = useState<InterviewStats>({
    totalInterviews: 0,
    completedInterviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        openLoader();
        const res = await fetch("/api/interviews/getInterviewStats");

        if (!res.ok) return;

        const json = await res.json();

        setStats({
          totalInterviews: json?.data?.totalInterviews ?? 0,
          completedInterviews: json?.data?.completedInterviews ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch interview stats:", error);
      } finally {
        closeLoader();
      }
    };

    fetchStats();
  }, [openLoader, closeLoader, fetchInterviewList]);

  if (isLoading) return <Loader />;

  return (
    <div role="grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
      <CountCard
        title="Interviews Created"
        count={stats.totalInterviews}
        countClass="text-chart-4"
      />
      <CountCard
        title="Interviews Completed"
        count={stats.completedInterviews}
        countClass="text-chart-1"
      />
    </div>
  );
};

export default DashboardCounts;
