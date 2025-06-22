
import { ReApplication } from "@/components/reApplications/reapplication";
import { Suspense } from "react";

const ReApplyPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            <ReApplication />
        </Suspense>
    );
};

export default ReApplyPage;
