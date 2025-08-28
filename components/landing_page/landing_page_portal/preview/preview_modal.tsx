"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePreviewModal } from "@/src/store/preview";
import Image from "next/image";


export const PreviewModal = () => {
  const { isOpen, close, imageUrl } = usePreviewModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col items-center h-fit w-[500px] rounded-t-lg">
        <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white text-2xl">Preview</DialogTitle>
        </DialogHeader>
       <div className="w-full h-[400px] p-5 flex justify-center items-center ">
          {imageUrl ? (
            <Image src={imageUrl} alt="Preview"               
            className="w-full h-full object-fill rounded "
        />
          ) : (
            <p>No image selected.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
