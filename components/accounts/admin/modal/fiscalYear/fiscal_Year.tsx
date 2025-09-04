"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFiscalYearModal } from "@/src/store/ADMIN/fiscal_year";
import { UpdateCurrentYear } from "./updateCurrentYear";
import { InsertNewYear } from "./insertNewYear";
import { useState } from "react";
import { AcademicYear } from "@/components/sidebar/utils/academicYearAdmin";





export const Fiscal_Year = () => {
  const { isOpen, close } = useFiscalYearModal();
    const [refresh, setRefresh] = useState(0);

    const handleRefresh = () => {
      setRefresh(prev => prev + 1); // trigger refresh
    };


  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] sm:w-[500px] w-[280px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-sm font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
           Manage Academic Year
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 sm:px-4 px-2 py-6 text-sm text-gray-700">
          {/* Current Fiscal Year Info */}
          <section className="bg-gray-100 sm:p-4 p-1 rounded-lg shadow-sm border">
            <h3 className="sm:text-lg text-sm font-semibold mb-2">📅 Current Academic Year</h3>
              <UpdateCurrentYear refreshTrigger={refresh} />
          </section>

          {/* Update Form */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">✏️ Set New Academic Year</h3>
              <InsertNewYear onCreated={handleRefresh} />          
          </section>
  
          {/* select academic year */}
            <section className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">✏️ Select Academic Year</h3>
                <AcademicYear />          
            </section>       

        </div>
      </DialogContent>
    </Dialog>
  );
};
