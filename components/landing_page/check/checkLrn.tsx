"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApplicationModal } from "@/src/store/application/application";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { checkLRN } from "@/src/actions/landingPage";

export const CheckLrn = () => {
  const { isOpen, close } = useApplicationModal();
  const router = useRouter();

  const [lrn, setLrn] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleClose = () => {
    close();
    router.push("/");
  };

  const handleSubmit = async () => {
    if (!lrn.trim()) {
      toast.error("Please enter a valid LRN.");
      return;
    }

    setLoading(true);
    setNotFound(false);

    try {
      const exists = await checkLRN(lrn);

      if (exists) {
        close();
        router.push("/application/old_student");
      } else {
        setNotFound(true);
      }
    } catch (err) {
    const error = err as Error; // 👈 assert to Error
    console.error("❌ Unexpected Error:", error);

      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedAsNew = () => {
    close();
    router.push("/application/new_applicant");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[300px] h-auto lg:w-[600px] rounded-t-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center rounded-t-lg">
            INPUT YOUR LRN
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <input
            type="text"
            value={lrn}
            onChange={(e) => setLrn(e.target.value)}
            placeholder="Enter LRN"
          />

          <Button
            className="bg-dGreen text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Checking..." : "Submit"}
          </Button>

          {notFound && (
            <div className="flex flex-col gap-2 mt-4 text-center">
              <p className="text-sm text-gray-600">
                Your record was not yet establish in the sytem fill in information here. Click the button below to proceed.
              </p>
              <Button
                variant="outline"
                className="border-dGreen text-dGreen"
                onClick={handleProceedAsNew}
              >
                Proceed
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
