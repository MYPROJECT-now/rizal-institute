"use client";
import { Button } from "@/components/ui/button";
import { useShowPaymentReceiptModal } from "@/src/store/CASHIER/student";
import { ChangeEvent, FC, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  createTodo: (
    selectedID: number,
) => void;
}

const CashierAddTodo: FC<Props> = ({ createTodo }) => {
  const {  selectedID } = useShowPaymentReceiptModal();


  // const [monthsPayment, setMonthsPayment] = useState<MonthsPayment | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [receipt, setReceipt] =  useState<File | null>(null);

  const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
      setReceipt(file);
      }
  };

  const receiptRef = useRef<HTMLInputElement>(null);

  const handleReceiptUpload = async () => {
    setIsLoading(true);
    try {
    // const uploadImage = async (file: File, folder: string) => {
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   formData.append('upload_preset', 'my_preset'); // Use one preset for all
    //   formData.append('folder', folder); // Dynamically assign the folder

    //   const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
    //   method: 'POST',
    //   body: formData,
    //   });

    //   const data = await response.json();  
    //   return data.secure_url; // Returns the image URL from Cloudinary
    //   };

      // const uploadReceipt = receipt ? await uploadImage(receipt, 'paymentReceipts') : "";

      createTodo(selectedID ?? 0);
      // toast.success("Receipt sent successfully!");
    } catch (error) {
      console.error("Error fetching receipt:", error);
      toast.error("Failed to send receipt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Rendering the AddTodo component
  return (
    <div  className="flex flex-col items-center justify-center py-10">
        <span className="text-start w-[180px] lg:w-[225px] xl:w-[300px] text-sm font-bold font-oswald text-dGreen pb-1">Upload Receipt:</span>
        <input
            type="file"
            accept="image/*"
            onChange={handleReceiptChange}
            ref={receiptRef}
            className="w-[180px] lg:w-[225px] xl:w-[300px] h-[35px] border-2 border-dGreen bg-green-100 rounded-sm outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition"
        />

        <Button
            onClick={handleReceiptUpload}
            variant="confirmButton"
            className="px-5 py-2 rounded-xl mt-10"
            disabled={!receipt}
        >
            {isLoading ? "Uploading..." : "Upload"}
        </Button>
    </div>
  );
};

export default CashierAddTodo;
