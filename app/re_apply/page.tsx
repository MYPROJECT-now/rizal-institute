import ReApplyContent from "@/components/re_apply/re_apply";
import { Suspense } from "react";

const ReApplyPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            <ReApplyContent />
        </Suspense>
    );
};

export default ReApplyPage;
