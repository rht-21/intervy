"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/atoms/ui/dialog";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import { Button } from "@/components/atoms/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/atoms/ui/select";
import type { Interview } from "./interview-list";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type Mode = "create" | "edit";
type InterviewStatus = "draft" | "active" | "archived";
type InterviewMode = "technical" | "behavioral" | "mixed";
type InterviewDifficulty = "beginner" | "intermediate" | "advanced";

export function InterviewModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
}: {
  open: boolean;
  mode: Mode;
  initialData?: Interview;
  onClose: () => void;
  onSuccess?: (interview: Partial<Interview>) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    interviewStatus: InterviewStatus;
    interviewMode: InterviewMode;
    interviewDifficulty: InterviewDifficulty;
    numberOfQuestions: number;
  }>({
    name: "",
    interviewStatus: "draft",
    interviewMode: "technical",
    interviewDifficulty: "beginner",
    numberOfQuestions: 8,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: initialData.name,
        interviewStatus: initialData.interviewStatus,
        interviewMode: initialData.interviewMode,
        interviewDifficulty: initialData.interviewDifficulty,
        numberOfQuestions: initialData.numberOfQuestions!,
      });
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = mode === "create" ? "POST" : "PATCH";
    const body =
      mode === "create" ? formData : { id: initialData?.id, ...formData };

    await fetch("/api/interviews", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    toast.success(
      mode === "create"
        ? "Interview created successfully"
        : "Interview updated successfully"
    );

    onSuccess?.({
      ...(mode === "edit" && { id: initialData?.id }),
      name: formData.name,
      interviewStatus: formData.interviewStatus,
      interviewMode: formData.interviewMode,
      interviewDifficulty: formData.interviewDifficulty,
      numberOfQuestions:
        formData.numberOfQuestions && Number(formData.numberOfQuestions),
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Interview" : "Edit Interview"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new interview to your collection. Fill in the details below."
              : "Update the interview details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Frontend Developer Interview"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {mode == "edit" && (
              <div className="grid gap-2">
                <Label htmlFor="mode">Interview Status</Label>
                <Select
                  value={formData.interviewStatus}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      interviewStatus: value as InterviewStatus,
                    })
                  }
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mode">Interview Mode</Label>
                <Select
                  value={formData.interviewMode}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      interviewMode: value as InterviewMode,
                    })
                  }
                >
                  <SelectTrigger id="mode" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.interviewDifficulty}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      interviewDifficulty: value as InterviewDifficulty,
                    })
                  }
                >
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="numberOfQuestions">Number of Questions</Label>
              <Input
                id="numberOfQuestions"
                type="number"
                min={3}
                max={10}
                placeholder="Optional"
                value={formData.numberOfQuestions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfQuestions: e.target.value
                      ? Number(e.target.value)
                      : 8,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter className="grid grid-cols-2 gap-2 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (mode === "create") {
                  redirect("/interviews/create");
                } else {
                  onClose();
                }
              }}
              disabled={loading}
            >
              {loading
                ? "Wait..."
                : mode === "create"
                ? "Lazy? Create using AI"
                : "Cancel"}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : mode === "create"
                ? "Create Interview"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
