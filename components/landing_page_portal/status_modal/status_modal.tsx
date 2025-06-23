"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStatusByTrackingId } from "@/src/actions/landingPage";
import { format } from "date-fns";
import { useShowStatusModal } from "@/src/store/LANDING_PAGE/landing_page";

interface StatusData {
    applicationStatus: string;
    regRemarks?: string | null;
    cashierRemarks?: string | null;
    regDate?: string | null;
    cashierDate?: string | null;
}

export const StatusModal = () => {
    const { isOpen, close } = useShowStatusModal();
    const [trackingId, setTrackingId] = useState("");
    const [statusData, setStatusData] = useState<StatusData | null>(null);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const data = await getStatusByTrackingId(trackingId);
            setStatusData(data);
            setError("");
        } catch {
            setError("No application was found.");
            setStatusData(null);
        }
    };

    const handleReApply = () => {
        close();
        router.push(`/reApplications?trackingId=${trackingId}`);
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "text-green-600";
            case "declined":
                return "text-red-600";
            case "pending":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="flex flex-col items-center min-h-[200px] w-[600px] rounded-t-lg">
                <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
                    <DialogTitle className="text-center text-white text-2xl">
                        Track Application
                    </DialogTitle>
                </DialogHeader>
                
                <div className="w-full px-6 py-4 space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Application ID"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        className="w-full h-[50px] rounded-md border-2 border-dGreen px-3"
                    />

                    {error && (
                        <p className="text-center text-red-500">{error}</p>
                    )}

                    {statusData && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Application Status</h3>
                                <p className={`text-xl font-bold ${getStatusColor(statusData.applicationStatus)}`}>
                                    {statusData.applicationStatus}
                                </p>
                            </div>

                            {statusData.regRemarks && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Registrar&apos;s Remarks</h3>
                                    <p className="text-gray-700">{statusData.regRemarks}</p>
                                    {statusData.regDate && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Date: {format(new Date(statusData.regDate), 'MMMM dd, yyyy')}
                                        </p>
                                    )}
                                </div>
                            )}

                            {statusData.cashierRemarks && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Cashier&apos;s Remarks</h3>
                                    <p className="text-gray-700">{statusData.cashierRemarks}</p>
                                    {statusData.cashierDate && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Date: {format(new Date(statusData.cashierDate), 'MMMM dd, yyyy')}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex justify-center mt-4">
                        {statusData?.applicationStatus === "Declined" ? (
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
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
