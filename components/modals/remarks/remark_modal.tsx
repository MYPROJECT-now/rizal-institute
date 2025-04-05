"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRemarksModal } from "@/src/store/remarks_modal";
import { toast } from "sonner";
import { useState } from "react";

export const StatusModal = () => {
  const { isOpen, close, remarks, setRemarks, studentId } = useRemarksModal();
  const [isDeclining, setIsDeclining] = useState(false);

  const handleDecline = async () => {
    if (!remarks.trim()) {
      toast.error("Please enter remarks before declining.");
      return;
    }

    setIsDeclining(true);

    try {
      const response = await fetch("/api/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, remarks }),
      });

      if (!response.ok) {
        throw new Error("Failed to send decline email.");
      }

      toast.success("Decline email sent successfully.");
      close();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error declining application:", error);
      toast.error("Error sending decline email.");
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col items-center h-[250px] w-[500px] rounded-t-lg">
        <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white text-2xl">Remarks</DialogTitle>
        </DialogHeader>
        <div className="w-full p-4">
          <input
            type="text"
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border px-2 py-1 text-sm w-full"
          />
          <button
            onClick={handleDecline}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded w-full"
            disabled={isDeclining}
          >
            {isDeclining ? "Declining..." : "Decline"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
