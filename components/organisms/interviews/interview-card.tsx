"use client";

import { useState } from "react";
import { Badge } from "@/components/atoms/ui/badge";
import { Button } from "@/components/atoms/ui/button";
import { Edit, Trash } from "lucide-react";
import { Interview } from "./interview-list";
import { DeleteInterviewAlert } from "@/components/molecules/delete-alert";
import { InterviewModal } from "./interview-modal";

const formatLastPracticed = (date: Date | null) => {
  if (!date) return "Never";
  const diff = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
};

const InterviewCard = ({
  interview,
  onDeleted,
  isPublic = false,
}: {
  interview: Interview;
  onDeleted?: (id: number) => void;
  isPublic?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localInterview, setLocalInterview] = useState(interview);

  return (
    <div className="w-full bg-card text-card-foreground rounded-lg p-4 md:p-6 space-y-3 border shadow-sm">
      {!isPublic && (
        <div className="flex justify-between items-start gap-4">
          <span className="text-sm text-muted-foreground">
            {new Date(localInterview.updatedAt).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>

          <Badge variant={localInterview.interviewStatus} className="uppercase">
            {localInterview.interviewStatus}
          </Badge>
        </div>
      )}

      <h4 className="text-base md:text-lg font-semibold">
        {localInterview.name}
      </h4>

      <div className="grid max-sm:grid-cols-1 gap-x-6 gap-y-2 text-sm py-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Mode:</span>
          <span className="font-medium capitalize">
            {localInterview.interviewMode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Difficulty:</span>
          <span className="font-medium capitalize">
            {localInterview.interviewDifficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Last Practiced:</span>
          <span className="font-medium">
            {formatLastPracticed(localInterview.lastPracticed)}
          </span>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between border-t text-sm text-muted-foreground gap-4">
        <Button variant="secondary" className="grow">
          Start Interview
        </Button>

        {!isPublic && (
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="size-4" />
            </Button>

            <DeleteInterviewAlert
              confirmDelete={async () => {
                await fetch(`/api/interviews?id=${localInterview.id}`, {
                  method: "DELETE",
                });
                onDeleted?.(localInterview.id);
              }}
            >
              <Button
                variant="ghost"
                className="text-destructive hover:bg-destructive hover:text-background"
              >
                <Trash className="size-4" />
              </Button>
            </DeleteInterviewAlert>
          </div>
        )}
      </div>

      <InterviewModal
        open={isEditing}
        mode="edit"
        initialData={localInterview}
        onClose={() => setIsEditing(false)}
        onSuccess={(updated) =>
          setLocalInterview((prev) => ({
            ...prev,
            ...updated,
            updatedAt: new Date(), // optimistic update
          }))
        }
      />
    </div>
  );
};

export default InterviewCard;
