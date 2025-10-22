"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";
import { useAddAnnouncement } from "@/src/store/ADMIN/announcement";
import { usePreviewModal } from "@/src/store/preview";
import { PreviewModal } from "@/components/landing_page/landing_page_portal/preview/preview_modal";
import { addAnnouncement } from "@/src/actions/adminAction";
import { toast } from "sonner";

export const AddAnnouncement_Modal = () => {
  const { isOpen, close } = useAddAnnouncement();
  const { open: openPreview } = usePreviewModal();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
      setImage(file);
      }
  }
  const imageRef = useRef<HTMLInputElement>(null);
  const previewImage = (file: File | null) => {
    if (!file) return;
      const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
            openPreview(reader.result);
            }
        };
      reader.readAsDataURL(file);
    };
  const handleSubmit = async () => {
    // your submission logic here (e.g., API call or server action)
    console.log({
      title,
      content,
      image,
    });

    const uploadImage = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_preset'); // Use one preset for all
    formData.append('folder', folder); // Dynamically assign the folder

    const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
    method: 'POST',
    body: formData,
    });

    const data = await response.json();  
    return data.secure_url; // Returns the image URL from Cloudinary
    };
    const uploadImages = image ? await uploadImage(image, 'announcement') : "";

    // clear inputs or close modal if you want
    setTitle("");
    setContent("");
    setImage(null);
    if (imageRef.current) imageRef.current.value = "";

    addAnnouncement(title, content, uploadImages);
    toast.success("Announcement was successfully created");

    close();
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] overflow-y-auto bg-white rounded-xl ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Create Announcement
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 items-center">
          {/* Title Input */}
          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Title:</span>
            <input
              placeholder="Enter announcement title"
              value={title}
              className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          {/* Content / Message Input */}
          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Content / Message</span>
            <textarea
              placeholder="Write your announcement message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-[200px] border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <PreviewModal />
          {/* <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Image (optional)</span>
            <input
              type="file"
              accept="image/*"
              className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </section> */}
          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Image (optional)</span> 
            {image ? (
            <div 
                className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]"
            >
              <div className="flex flex-row items-center gap-2">
                <button
                    type="button"
                    onClick={() => previewImage(image)}
                    className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen  rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                    title="Click to preview"
                    >
                    {image.name}
                </button>
                <button
                  type="button"
                  onClick={() => {
                  setImage(null);
                  if (imageRef.current) imageRef.current.value = "";}}
                  className="text-red-500 hover:text-red-700 font-bold"
                  title="Remove file"
                  >
                    ✕
                </button>
              </div>
            </div>
            ) : (
            <div 
              className="flex flex-col gap-1 "
            >
              <input
                type="file"
                ref={imageRef}
                accept="image/*"
                onChange={handleImageChange}
                name="document"
                className="rounded-sm px-1 w-full border-2 py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
              />
            </div>
            )}
          </section>
          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <Button 
              onClick={handleSubmit} 
              variant="confirmButton"
              className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "  
            >
              Post Announcement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
