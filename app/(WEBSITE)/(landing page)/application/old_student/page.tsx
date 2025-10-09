
import { Suspense } from "react";
import { Old_Application } from "./old_application";

const OldApplicantPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            <Old_Application />
        </Suspense>
    );
};

export default OldApplicantPage;
