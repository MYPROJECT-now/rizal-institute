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
      <DialogContent className="flex flex-col items-center w-[450px] rounded-t-lg">
        <DialogHeader className="py-3 w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white text-2xl">Preview</DialogTitle>
        </DialogHeader>
       <div className="w-full py-2 flex justify-center items-center ">
          {imageUrl ? (
            <Image 
            height={1000}
             width={1000} src={imageUrl} 
             alt="Preview"               
            className="w-[300px] h-[400px]"
        />
          ) : (
            <p>No image selected.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
