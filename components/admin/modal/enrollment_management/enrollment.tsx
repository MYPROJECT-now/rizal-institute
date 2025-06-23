"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEnrollmentModal } from "@/src/store/ADMIN/enrollment"; 

export const EnrollmentManagement = () => {
  const { isOpen, close } = useEnrollmentModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-auto max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-white bg-dGreen h-[60px] flex items-center justify-center sm:text-sm md:text-base lg:text-lg">
            Manage Enrollment Period
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-4 py-6 text-sm text-gray-700">
          {/* Current Enrollment Info */}
          <section className="bg-gray-100 p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📅 Current Enrollment Period</h3>
            <p><strong>Status:</strong> Open</p>
            <p><strong>Open Date:</strong> April 15, 2025</p>
            <p><strong>Close Date:</strong> May 31, 2025</p>
          </section>

          {/* Update Form */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">✏️ Update Enrollment Dates</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="open-date" className="mb-1 font-medium">Open Date</label>
                  <input
                    id="open-date"
                    type="date"
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="close-date" className="mb-1 font-medium">Close Date</label>
                  <input
                    id="close-date"
                    type="date"
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <Button className="w-full mt-4 bg-dGreen text-white hover:bg-green-700">
                Save Changes
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
