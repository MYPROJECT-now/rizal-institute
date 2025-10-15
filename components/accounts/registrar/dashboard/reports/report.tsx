"use client";

import { Button } from "@/components/ui/button";
import { useReportModal } from "@/src/store/REGISTRAR/reports";
import { Reports } from "../../reports/reports";

export const Report = () => {
    const { open: openReports } = useReportModal();
    
    return (
    <section className="flex justify-between bg-green-200 rounded-xl px-6 py-4">
        <p className=" sm:text-xl text-lg font-bold text-dGreen mb-2">
            Reports and Summaries
        </p>
        <Reports />
        <Button
            variant="confirmButton"
            className="px-5 py-2 rounded-lg "
            onClick={openReports}
        >
            Download
        </Button>
    </section>
    )
};