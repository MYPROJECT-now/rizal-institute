"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { useDeclineRemarksModal } from "@/src/store/REGISTRAR/applicant";
import { Button } from "@/components/ui/button";

interface Props {
  onDecline?: (studentId: number) => void;
}

export const StatusModal = ({ onDecline }: Props) => {
  const { isOpen, close, remarks, setRemarks, studentId } = useDeclineRemarksModal();
  const [isDeclining, setIsDeclining] = useState(false);

  const handleDecline = async () => {
    if (!remarks.trim()) {
      toast.error("Please enter remarks before declining.");
      return;
    }

    setIsDeclining(true);

    try {
      const response = await fetch("/api/decline_registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, remarks }),
      });

      if (!response.ok) {
        throw new Error("Failed to send decline email.");
      }

      toast.success("Decline email sent successfully.");
      if (onDecline && studentId) {
        onDecline(studentId);
      }
      close();

    } catch (error) {
      console.error("Error declining application:", error);
      toast.error("Error sending decline email.");
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col items-center justify-center h-[280px] w-[500px] rounded-t-lg">
        <DialogHeader className="h-[90px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white text-2xl">Remarks</DialogTitle>
        </DialogHeader>
        <div className="w-full  p-4">
          <textarea
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border-black px-2 py-1 text-sm w-full h-[100px] focus:ring-2 focus:ring-dGreen focus:border-dGreen outline-none transition"
          />
          <Button
            onClick={handleDecline}
            variant={"rejectButton"}
            className="mt-4 h-[40px] px-3 py-1 rounded-xl w-full"
            disabled={isDeclining}
          >
            {isDeclining ? "Declining..." : "Decline"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
