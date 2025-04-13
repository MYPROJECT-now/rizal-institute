"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFiscalYearModal } from "@/src/store/admin/fiscal_year";

export const Fiscal_Year = () => {
  const { isOpen, close } = useFiscalYearModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
           Manage Fiscal Year
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-4 py-6 text-sm text-gray-700">
          {/* Current Fiscal Year Info */}
          <section className="bg-gray-100 p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📅 Current Fiscal Year</h3>
            <p><strong>Year:</strong> 2024 - 2025</p>
            <p><strong>Start Date:</strong> July 1, 2024</p>
            <p><strong>End Date:</strong> June 30, 2025</p>
          </section>

          {/* Update Form */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">✏️ Update Fiscal Year</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="fiscal-year" className="mb-1 font-medium">Fiscal Year</label>
                <input
                  id="fiscal-year"
                  type="text"
                  placeholder="e.g. 2025 - 2026"
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="start-date" className="mb-1 font-medium">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="end-date" className="mb-1 font-medium">End Date</label>
                  <input
                    id="end-date"
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
