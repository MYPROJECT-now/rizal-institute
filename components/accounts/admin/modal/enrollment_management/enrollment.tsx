"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEnrollmentModal } from "@/src/store/ADMIN/enrollment"; 
import { useState } from "react";
import { InsertEnrollment } from "./insertEnrollment";
import { UpdateCurrentEnrollmentPeriod } from "./updateEnrollment";

export const EnrollmentManagement = () => {
  const { isOpen, close } = useEnrollmentModal();
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh(prev => prev + 1); // trigger refresh
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] sm:w-[500px] w-[290px]  bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-lg font-bold text-white bg-dGreen py-4 flex items-center rounded-t-lg justify-center">
            Manage Enrollment Period
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-4 py-6 text-sm text-gray-700 max-h-[350px] overflow-y-auto">
          {/* Current Enrollment Info */}
          <section className="bg-gray-100 p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📅 Current Academic Year</h3>
              <UpdateCurrentEnrollmentPeriod refreshTrigger={refresh} />
          </section>

          {/* Update Form */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">✏️ Set New Enrollment Period</h3>
              <InsertEnrollment onCreated={handleRefresh} />          
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
