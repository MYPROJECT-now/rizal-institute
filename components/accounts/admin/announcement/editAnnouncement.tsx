"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePreviewModal } from "@/src/store/preview";
import { PreviewModal } from "@/components/landing_page/landing_page_portal/preview/preview_modal";
import { toast } from "sonner";
import { useEditAnnouncement } from "@/src/store/ADMIN/announcement";
import { editAnnouncement } from "@/src/actions/adminAction";
import { CldImage } from "next-cloudinary";

interface Props {
  id: number;
  title: string;
  content: string;
  image?: string | null;
}

export const EditAnnouncement_Modal = ({ id, title, content, image }: Props) => {
  const { isOpen, close } = useEditAnnouncement();
  const { open: openPreview } = usePreviewModal();

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [oldImage, setOldImage] = useState<string | null>(image ?? null);

  const imageRef = useRef<HTMLInputElement>(null);

  // Reset values when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEditTitle(title);
      setEditContent(content);
      setOldImage(image ?? null);
      setNewImage(null);
      if (imageRef.current) imageRef.current.value = "";
    }
  }, [isOpen, id, title, content, image]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setNewImage(file);
  };

  const previewImage = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") openPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      let imageUrl = oldImage;

      // Upload new image if selected
      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", "my_preset");
        formData.append("folder", "announcement");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrl = data.secure_url;
      }

      // Call backend to edit
      await editAnnouncement(id, editTitle, editContent, imageUrl ?? "");

      toast.success("Announcement successfully updated!");
      close();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update announcement.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Edit Announcement
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 items-center max-h-[500px]  overflow-y-auto">
          {/* Title */}
          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Title:</span>
            <input
              placeholder="Enter announcement title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          {/* Content */}
          <section className="flex flex-col gap-1 w-[400px] ">
            <span className="text-dGreen text-sm font-semibold">Content / Message</span>
            <textarea
              placeholder="Write your announcement message..."
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="h-[150px] border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>
          {image && (
            <CldImage
              alt="Receipt Screenshot"
              src={image}
              width="1000"
              height="1000"
              className="w-[300px] h-auto"
            />
          )}

          <PreviewModal />

          {/* Image */}
          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Image (optional)</span>


            <div className="flex flex-row items-center gap-2">
              {newImage ? (
                <>
                  <button
                    type="button"
                    onClick={() => previewImage(newImage)}
                    className="w-full py-[6px] border-2 border-dGreen rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate"
                    title="Click to preview"
                  >
                    {newImage ? newImage.name : "Upload Image"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewImage(null);
                      if (imageRef.current) imageRef.current.value = "";
                    }}
                    className="text-red-500 hover:text-red-700 font-bold"
                    title="Remove file"
                  >
                    ✕
                  </button>
                </>
              ): (
                <div className="w-full">
                  <input
                  type="file"
                  ref={imageRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-sm px-1 w-full border-2 py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition " 
                />
                </div>

              )}

            </div>

          </section>

          {/* Submit */}
          <div className="pt-2 flex justify-center w-full px-4">
            <Button
              onClick={handleSubmit}
              variant="confirmButton"
              className="rounded-lg lg:px-5 sm:px-3 px-2 lg:py-2 py-1 text-xs sm:text-sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
