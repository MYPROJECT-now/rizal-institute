"use client";
import { Button } from "@/components/ui/button";
import { getBalance } from "@/src/actions/studentAction";
import { usePreviewModal } from "@/src/store/preview";
import { Balance } from "@/src/type/STUDENT/student";
import { ChangeEvent, FC, useRef, useState, useEffect } from "react";
import { toast } from "sonner";


interface Props {
  createTodo: (
    amount: number,
    mop: string,
    POP: string,
  ) => void;
}
// Custom hook for balance
const useBalance = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  
  useEffect(() => {
    getBalance().then(setBalance);
  }, []);
  return balance;
};


const PaymentAddTodo: FC<Props> = ({ createTodo }) => {

  const [amount, setAmount] = useState("");
  const [mop, setMop] = useState("");
  const [POP, setPOP] =  useState<File | null>(null);
  const balance = useBalance();
  const { open: openPreview } = usePreviewModal();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMop = (e: ChangeEvent<HTMLSelectElement>) => {
    setMop(e.target.value);
  };

  const handlePOP = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPOP(file);
    }
};

  const POPRef = useRef<HTMLInputElement>(null);

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

  const handleAdd = async () => {
    try{
    setIsSubmitting(true);

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
      return data.secure_url; // Returns the image URL from Cloudinar
    }

    const uploadPOP = POP ? await uploadImage(POP, 'monthlyPayments') : "";

    await createTodo(Number(amount), mop, uploadPOP);
    setAmount("");
    setMop("");
    setPOP(null);

    if (POPRef.current) POPRef.current.value = "";

  }catch(error) {
    toast.error("Something went wrong");
    console.log(error)
  } finally {
    setIsSubmitting(false);
  }

  };
  return (
    <section className="w-full  p-6 ">
      <section className="bg-green-50 rounded-lg p-4 mb-4">
        <p className="text-lg font-bold text-dGreen mb-1 flex items-center gap-2">
          <span>Due this month:</span>
          <span className="font-semibold text-gray-800">{balance?.dueThisMonth || <span className='animate-pulse text-gray-400'>Loading...</span>}</span>
        </p>
        <p className="text-lg font-bold text-dGreen flex items-center gap-2">
          <span>Total Remaining Balance:</span>
          <span className="font-semibold text-gray-800">{balance?.totalRemainingBalance || <span className='animate-pulse text-gray-400'>Loading...</span>}</span>
        </p>
      </section>

      <main className="flex flex-col gap-10">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="amount"
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
            onChange={handleAmount}
            value={amount}
            placeholder="Enter amount to pay"
          />
        </div>
        
        <div>
          <label htmlFor="mop" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            id="mop"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
            onChange={handleMop}
            value={mop}
          >
            <option value="">Select payment method</option>
            <option value="GCash">GCash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="OTC">Over the Counter (OTC)</option>
          </select>
        </div>

        <div>
          <label htmlFor="pop" className="block text-sm font-medium text-gray-700">Upload Receipt</label>
          {POP ? (
            <div className="flex items-center gap-2 w-full ">
              <button
                type="button"
                onClick={() => previewImage(POP)}
                className="flex-1 text-dGreen underline text-sm bg-gray-100 rounded px-2 py-1 text-left truncate hover:bg-dGreen/10 transition"
                title="Click to preview"
              >
                {POP.name}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPOP(null);
                  if (POPRef.current) POPRef.current.value = "";
                }}
                className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded transition"
                title="Remove file"
              >
                ✕
              </button>
            </div>
          ) : (
            <input
              type="file"
              ref={POPRef}
              accept="image/*"
              onChange={handlePOP}
              name="document"
              id="pop"
              className="border bg-gray-100 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-dGreen transition"
            />
          )}
        </div>


        {/* Button for adding a new todo */}
        <Button
          className="px-2 py-1"
          onClick={handleAdd}
          variant="confirmButton"
          disabled={!amount || !mop || !POP || isSubmitting}
        >
        {isSubmitting ? "Submitting..." : "Submit Payment"}
        </Button>
      
      </main>

      
    </section>
  );
};

export default PaymentAddTodo;
