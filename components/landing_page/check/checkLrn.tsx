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
import { checkGrades, checkLRN } from "@/src/actions/landingPage";

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
      toast.error("Please enter your LRN.");
      return;
    }

    if (!/^\d{12}$/.test(lrn)) {
      toast.error("Invalid LRN. Please enter a valid LRN.");
      return;
    }
    setLoading(true);
    setNotFound(false);

    try {

      const allGradesSubmitted = await checkGrades(lrn);

      if (!allGradesSubmitted) {
        toast.error("Some grades are not yet submitted. Try again later.");
        return;
      }

      // Continue your process here...

    } catch (err) {
      const error = err as Error;
      console.error("❌ Unexpected Error:", error);
      toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }


    try {
      const exists = await checkLRN(lrn);

      if (exists) {
        close();
        router.push(`/application/old_student/?lrn=${lrn}`);
      } else {
        setNotFound(true);
      }

    } catch (err) {
      const error = err as Error; // 👈 assert to Error
      console.error("❌ Unexpected Error:", error);

    
      toast.error("An error occurred. Try again.");
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
      <DialogContent className="lg:w-[600px] sm:w-[500px] w-[290px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-bold text-white bg-dGreen sm:py-4 py-3 flex justify-center rounded-t-lg">
            {notFound ? "LRN Not Found" : "INPUT YOUR LRN"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-8 py-6">
          {!notFound ? (
            <>
              <input
                type="text"
                value={lrn}
                onChange={(e) => setLrn(e.target.value)}
                placeholder="Enter LRN"
                className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
              />

              <Button
                variant="confirmButton"
                className="w-full rounded-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Checking..." : "Submit"}
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-4 mt-4 text-center">
              <p className="text-sm text-gray-800">
                Your record was not yet established in the system. Fill in information here.
                Click the button below to proceed.
              </p>
              <Button
                variant="confirmButton"
                className="w-full rounded-lg"
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
