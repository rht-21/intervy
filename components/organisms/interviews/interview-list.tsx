import React from "react";
import InterviewCard from "./interview-card";

const InterviewList = () => {
  return (
    <section className="space-y-4 max-sm:mt-10">
      <h2 className="text-xl md:text-3xl font-semibold">Recent Interviews</h2>
      <p className="text-sm md:text-base text-muted-foreground -mt-2">
        View and manage your recent interviews
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 space-y-4">
        <InterviewCard />
        <InterviewCard />
        <InterviewCard />
      </div>
    </section>
  );
};

export default InterviewList;
