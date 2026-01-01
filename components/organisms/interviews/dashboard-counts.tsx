import CountCard from "@/components/molecules/count-card";

const DashboardCounts = () => {
  return (
    <div role="grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
      <CountCard
        title="Total Interviews"
        count={21}
        countClass="text-chart-4"
      />
      <CountCard
        title="Interviews Completed"
        count={7}
        countClass="text-chart-1"
      />
    </div>
  );
};

export default DashboardCounts;
