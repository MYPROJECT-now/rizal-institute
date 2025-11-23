"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShowDocumentModal, useUploadSoaModal } from "@/src/store/CASHIER/reserved";
import { CldImage } from 'next-cloudinary';




export const Document_Review = () => {
  const { isOpen, close, documentUrl   } = useShowDocumentModal();

  const { open } = useUploadSoaModal();
  
  const handleClose = () => {
    close();
    open();
  };



  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[450px]  bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-xl font-bold text-white bg-dGreen py-3 flex items-center justify-center">
          Document Review
          </DialogTitle>
        </DialogHeader>
          <div className="bg-white flex text-center items-center justify-center ">
            {documentUrl ? (
              <CldImage
                alt="Document Preview"
                src={documentUrl}
                width="1000"
                height="1000"
                className="w-[300px] h-[320px]"
              />
            ) : (
              <span>No document to display</span>
            )}
          </div>
          
      </DialogContent>
    </Dialog>
  );
};
