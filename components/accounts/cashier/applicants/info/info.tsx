"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addInfoONReceipt } from "@/src/actions/cashierAction";
import { useShowReceiptsModal } from "@/src/store/CASHIER/applicants";
import { useState } from "react";
import { toast } from "sonner";




export const Receipts_Info = () => {
  const { isOpen, close } = useShowReceiptsModal();
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [tin, setTin] = useState("");
  const [latestSINumber, setLatestSINumber] = useState("");
  const [atpNumber, setAtpNumber] = useState("");
  const [dateIssued, setDateIssued] = useState("");
  const [dateExpired, setDateExpired] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await addInfoONReceipt(schoolName, address, tin, latestSINumber, atpNumber, dateIssued, dateExpired); // Call the action function with the form datatin, latestSINumber, atpNumber, dateIssued, dateExpired);
    toast.success("Receipt info successfully saved.");
    close();
    window.location.reload();
    setLoading(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[600px]   bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Receipt Info
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-2 ">
        <div className="grid grid-cols-2 mx-8  gap-x-7 gap-y-2  items-center">

          <section className="flex flex-col gap-1">
            <span className="text-sm">Registered School Name:</span>
            <input 
              type="text" 
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1">
            <span className="text-sm">School Address:</span>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1">
            <span className="text-sm">TIN:</span>
            <input 
              type="text" 
              value={tin}
              onChange={(e) => setTin(e.target.value)}
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1">
            <span className="text-sm">Latest SI Number:</span>
            <input 
              type="text" 
              value={latestSINumber}
              onChange={(e) => setLatestSINumber(e.target.value)}
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1">
            <span className="text-sm">Autority to Print No.:</span>
            <input 
              type="text" 
              value={atpNumber}
              onChange={(e) => setAtpNumber(e.target.value)}
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1">
            <span className="text-sm">Date Issued:</span>
            <input 
              type="date" 
              value={dateIssued}
              onChange={(e) => setDateIssued(e.target.value)}
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1">
            <span className="text-sm">Date Expired:</span>
            <input 
              type="date"
              value={dateExpired}
              onChange={(e) => setDateExpired(e.target.value)} 
              className="border-2 border-gray-300 rounded px-1 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

        </div>
        <div className="w-full flex  justify-center mt-3">
          <Button
            variant="confirmButton"
            className="px-5 py-1 rounded-lg text-center "
            onClick={handleSave}
            disabled={!schoolName || !tin || !latestSINumber || !atpNumber || !dateIssued || !dateExpired || loading}
          >
            Save
          </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
