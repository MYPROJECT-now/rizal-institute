"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { useEffect, useState } from "react";
import { useShowSOAModal } from "@/src/store/CASHIER/student";
import { getSOAsStudent } from "@/src/actions/cashierAction";
import { SOAsStudent } from "@/src/type/CASHIER/STUDENT/student";
import SoaTodosPage from "./SoaTodos";

export const SoaModal = () => {
  const { isOpen, close, selectedLRN } = useShowSOAModal();
  const [soaData, setSoaData] = useState<SOAsStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSOAData = async () => {
      if (selectedLRN && isOpen) {
        setIsLoading(true);
        try {
          const data = await getSOAsStudent(selectedLRN);
          console.log("Fetched SOA data:", data); // Debug log
          setSoaData(data);
        } catch (error) {
          console.error("Error fetching SOA data:", error);
          setSoaData([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSOAData();
  }, [isOpen, selectedLRN]);

  // Reset data when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSoaData([]);
      setIsLoading(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
     <DialogContent className="w-[730px] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
        <DialogTitle 
            className="text-2xl font-bold text-white bg-dGreen h-[60px] items-center justify-center flex"
          >
            Statement of Account
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg">Loading...</div>
            </div>
          ) : (
            <SoaTodosPage SOATodos={soaData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
)
}