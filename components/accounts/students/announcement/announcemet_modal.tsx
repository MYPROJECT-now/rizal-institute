"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAnnouncement } from "@/src/store/ADMIN/announcement";
import { CldImage } from "next-cloudinary";

interface Props {
  title: string;
  content: string;
  image?: string | null;
  date: string;
}

export const Announcement_Modal = ({ title, content, image, date }: Props) => {
  const { isOpen, close } = useAnnouncement();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] max-h-[600px] overflow-y-auto rounded-xl bg-green-50 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-8 space-y-5 ">
          {/* Main content */}
          <p className="text-[16px] font-normal font-merriweather whitespace-pre-line  leading-[3]  ">
            {content}
          </p>

          {image && (
            <CldImage
              alt="Receipt Screenshot"
              src={image}
              width="400" 
              height="400"
              className="w-[550px] h-auto"
              
            />
          )}


          <footer className="text-center border-gray-300 border-t-[1.5px] py-2  w-full">
            <p className="text-sm font-light font-merriweather">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              | Admin
            </p>
                      </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
