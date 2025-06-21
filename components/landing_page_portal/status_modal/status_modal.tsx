"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useStatusModal } from "@/src/store/status_modal";
import { Button } from "../../ui/button";
import { useState } from "react";
// import { getStatusByTrackingId } from "@/src/actions/serverActions";
import { useRouter } from "next/navigation";
export const StatusModal = () => {
    const { isOpen, close } = useStatusModal();
    const [trackingId, setTrackingId] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            // const status = await getStatusByTrackingId(trackingId);
            setStatusMessage(status);
        } catch {
            setStatusMessage("No application was found.");
        }
    };

    const handleReApply = () => {
  
        close();
        router.push(`/re_apply?trackingId=${trackingId}`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="flex flex-col items-center h-auto w-auto rounded-t-lg text-base lg:text-xl lg:w-[500px] lg:h-[250px]"> {/* w-[500px] h-[250px]*/}
                <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
                    <DialogTitle className="text-center text-white text-2xl">
                        Track Application
                    </DialogTitle>
                </DialogHeader>
                <input
                    type="text"
                    placeholder="Enter Application ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="w-[300px] h-[50px] rounded-md border-2 border-dGreen px-3"   //w-[400px] h-[50px]
                />
                <p className="text-center text-red-500 mt-2">{statusMessage}</p>

                {statusMessage === "Declined" ? (
                    <Button
                        variant="mButton"
                        className="h-[50px] w-[200px] rounded-lg"
                        onClick={handleReApply}
                    >
                        Re-Apply
                    </Button>
                ) : (
                    <Button
                        variant="mButton"
                        className="h-[50px] w-[200px] rounded-lg"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
};
