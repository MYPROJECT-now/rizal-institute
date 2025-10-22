"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActiveAnnouncement, UpdateAnnouncementReadStatus } from "@/src/actions/studentAction";
import { useAnnouncement } from "@/src/store/ADMIN/announcement";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  date: string;
  image?: string | null;
}

export const Announcement_Modal = () => {
  const { isOpen, open, close } = useAnnouncement();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  const fetchAnnouncement = async () => {
    const data = await ActiveAnnouncement();
    if (data && data.length > 0) {
      setAnnouncement(data[0]);
      open(); // 👈 open automatically if announcement exists
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const handleClose = async () => {
    if (announcement) {
      await UpdateAnnouncementReadStatus(announcement.announcement_id);
    }
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="lg:w-[600px] max-h-[600px] overflow-y-auto rounded-xl bg-green-50">
        {announcement ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
                {announcement.title}
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 pt-8 space-y-5">
              <p className="text-[16px] font-normal font-merriweather whitespace-pre-line leading-[3]">
                {announcement.content}
              </p>

              {announcement.image && (
                <CldImage
                  alt="Announcement Image"
                  src={announcement.image}
                  width="400"
                  height="400"
                  className="w-[550px] h-full rounded-md"
                />
              )}

              <footer className="text-center border-gray-300 border-t-[1.5px] py-2 w-full">
                <p className="text-sm font-light font-merriweather">
                  {new Date(announcement.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  | Admin
                </p>
              </footer>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Loading announcement...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
