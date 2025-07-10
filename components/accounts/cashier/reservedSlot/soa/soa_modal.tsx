"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadSoaModal } from "@/src/store/CASHIER/reserved";
import { toast } from "sonner";



export const UploadSoaModal = () => {
  const { isOpen, close } = useUploadSoaModal();

  const [lrn, setLrn] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // setError(null);
    // setSuccess(false);

    if (!lrn || !file) {
      toast.error("Please provide both LRN and SOA file.");
      console.error("Please provide both LRN and SOA file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("lrn", lrn);
    formData.append("file", file);

    try {
      const response = await fetch("/api/soa", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.error  || "Something went wrong."  );
      }
      if (!data.success) {  
        toast.error(data.error || "Error uploading SOA file.");
      }

      toast.success(data.message);
      close();

    } catch (error) {
      console.error("Error uploading SOA file:", error);
      toast.error("Error uploading SOA file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] h-[300px]  bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            SOA Upload
          </DialogTitle>
        </DialogHeader>

        <main className="flex flex-col items-center gap-10 p-6">
          <section className="flex flex-row items-center gap-4">
            <label htmlFor="lrn" className="w-12">LRN:</label>
            <input
              id="lrn"
              type="text"
              value={lrn}
              onChange={(e) => setLrn(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </section>

          <section className="flex flex-row items-center gap-4">
            <label htmlFor="file" className="w-12">SOA:</label>
            <input
              id="file"
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileChange}
              className="border px-2 py-1 rounded"
            />
          </section>

          {/* {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Upload successful!</p>} */}

          <button
            className="bg-dGreen text-white px-6 py-2 rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </main>
      </DialogContent>
    </Dialog>
  );
};
