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
      <DialogContent className="lg:w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Manage Enrollment Period
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-4 py-6 text-sm text-gray-700">
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
