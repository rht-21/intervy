import { Badge } from "@/components/atoms/ui/badge";
import { Button } from "@/components/atoms/ui/button";

const InterviewCard = () => {
  return (
    <div className="w-full bg-card text-card-foreground rounded-lg p-4 md:p-6 space-y-3 border shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <h4 className="text-base md:text-lg font-semibold">
          Project Manager Mock Interview
        </h4>
        <Badge variant="active">Active</Badge>
      </div>

      {/* Core info */}
      <div className="grid max-sm:grid-cols-1 sm:grid-flow-col sm:auto-cols-max gap-x-6 gap-y-2 text-sm py-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Mode:</span>{" "}
          <span className="font-medium">Behavioral</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Difficulty:</span>{" "}
          <span className="font-medium">Intermediate</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Last Practiced:</span>{" "}
          <span className="font-medium">2 days ago</span>
        </div>
      </div>

      {/* Action hint */}
      <div className="pt-4 flex items-center justify-between border-t text-sm text-muted-foreground">
        <Button variant="secondary" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default InterviewCard;
