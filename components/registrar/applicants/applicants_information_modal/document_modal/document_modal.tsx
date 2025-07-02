// document_modal.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CldImage } from "next-cloudinary"
import { useShowDocumentModal } from "@/src/store/REGISTRAR/applicant"

type DocumentModalProps = {
  src: string | null
  title?: string
}

export const Document_Modal = ({ src, title }: DocumentModalProps) => {
  const { isOpen, close } = useShowDocumentModal()



  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[600px] min-h-[400px]  bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
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
      width="400"
      height="400"
      crop={{ type: "auto", source: true }}
    />
  </main>
)}

        
      </DialogContent>
    </Dialog>
  )
}
