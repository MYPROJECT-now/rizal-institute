// document_modal.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CldImage } from "next-cloudinary"
import {  useShowDocumentModal } from "@/src/store/REGISTRAR/applicant"

type DocumentModalProps = {
  src: string | null
  title?: string
}

export const Document_Modal = ({ src, title }: DocumentModalProps) => {
  const { isOpen, close } = useShowDocumentModal()


  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[400px]  bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white bg-dGreen py-3 flex items-center justify-center">
            {title || "Document"}
          </DialogTitle>
        </DialogHeader>

          {!src?.trim() ? (
            <p className="text-center text-sm text-gray-500 mt-2">No document uploaded.</p>
          ) : (
            <main className="flex justify-center items-center p-4">
              <CldImage
                alt={title || "Document"}
                src={src}
                width="1000"
                height="1000"
                className="w-[300px] h-[400px]"
              />
            </main>
          )}

        
      </DialogContent>
    </Dialog>
  )
}
