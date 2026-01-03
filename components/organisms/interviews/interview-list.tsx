"use client";

import { useCallback, useEffect, useState } from "react";
import InterviewCard from "./interview-card";
import InlineLoader from "@/components/atoms/ui/loader";
import Link from "next/link";
import { useUIStore } from "@/lib/store/useUIStore";

export type Interview = {
  id: number;
  name: string;
  interviewMode: "technical" | "behavioral" | "mixed";
  interviewDifficulty: "beginner" | "intermediate" | "advanced";
  interviewStatus: "active" | "draft" | "archived";
  lastPracticed: Date | null;
  numberOfQuestions: number | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

const InterviewList = ({
  heading,
  subheading,
  isPublic = false,
  userId,
}: {
  heading: string;
  subheading: string;
  isPublic?: boolean;
  userId?: string;
}) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchInterviewList, setFetchInterviewList } = useUIStore();

  const handleDeleted = (id: number) => {
    setInterviews((prev) => prev.filter((i) => i.id !== id));
    setFetchInterviewList(true);
  };

  const fetchInterviews = useCallback(async () => {
    const res = await fetch(`/api/interviews?userId=${userId ?? ""}`, {
      headers: {
        "x-interview-scope": isPublic ? "others" : "own",
      },
    });
    const json = await res.json();
    setInterviews(json.data);
    setIsLoading(false);
  }, [userId, isPublic]);

  useEffect(() => {
    const initFetch = async () => {
      await fetchInterviews();
    };
    initFetch();
  }, [fetchInterviews]);

  useEffect(() => {
    if (fetchInterviewList) {
      const refresh = async () => {
        await fetchInterviews();
        setFetchInterviewList(false);
      };
      refresh();
    }
  }, [fetchInterviewList, fetchInterviews, setFetchInterviewList]);

  return (
    <section className="space-y-4 max-sm:mt-10">
      <h2 className="text-xl md:text-3xl font-semibold">{heading}</h2>
      <p className="text-sm md:text-base text-muted-foreground -mt-2">
        {subheading}
      </p>

      {interviews.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-sm">
          {isLoading ? (
            <InlineLoader />
          ) : !isPublic ? (
            <span>
              No interviews yet.{" "}
              <Link
                href="/interviews/browse"
                className="text-accent-foreground duration-200 hover:underline"
              >
                View
              </Link>{" "}
              what others have created.
            </span>
          ) : (
            <span>
              No interviews yet.{" "}
              <Link
                href="/interviews"
                className="text-accent-foreground duration-200 hover:underline"
              >
                Create
              </Link>{" "}
              your first interview.
            </span>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onDeleted={handleDeleted}
              isPublic={isPublic}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default InterviewList;
