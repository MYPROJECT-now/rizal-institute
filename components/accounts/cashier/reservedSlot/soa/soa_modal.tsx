  "use client";

  import React, { useState, useEffect } from "react";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useUploadSoaModal } from "@/src/store/CASHIER/reserved";
  import { toast } from "sonner";
  import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

  export const UploadSoaModal = () => {
    

    const { isOpen, close } = useUploadSoaModal();
    const [lrn, setLrn] = useState("");
    const [academicDiscount, setAcademicDiscount]= useState("");
    const [siblingDiscount, setSiblingDiscount]= useState("");
    const [acads, setAcads] = useState("");
    const [escDiscount, setEscDiscount] = useState ("");
    const [amount, setAmount] = useState<number | "">("");
    const [misc, setMisc] = useState<number | ""> ("");
    const [otherF, setOtherF] = useState<number | ""> ("");
    const [otherD, setOtherD] = useState<number | ""> ("");
    const handleClose = () => {
      close();
    };
    return(
      <Dialog  open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[800px] h-auto  bg-gray-50 rounded-xl shadow-lg ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
              Upload SOA
            </DialogTitle>
          </DialogHeader>
          <main className="m-10 flex-col gap-4">
            <div className="grid grid-cols-2 items-center gap-2">
          <label htmlFor="lrn" className="font-bold">LRN:</label>
              <input
                id="lrn"
                type="number"
                value={lrn}
                onChange={(e) => setLrn(e.target.value)}
                className="w-auto border px-2 py-1 rounded outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
              />
              </div>
              <div className="mt-5 grid grid-cols-2 items-center gap-2">
                <label htmlFor="amount" className=" font-bold">
                  Tuition Fee:
                </label>
                <input type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-auto border px-2 py-1 rounded outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                
                />
              </div>

              <div className="mt-5 grid grid-cols-2 items-center gap-2">
                <label htmlFor="misc" className=" font-bold">
                  Miscellaneous Fee:
                </label>
                <input type="number"
                  id="misc"
                  value={misc}
                  onChange={(e) => setMisc(Number(e.target.value))}
                  className="w-auto border px-2 py-1 rounded outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                
                />
              </div>
              <div className="mt-5 grid grid-cols-2">
                <p className="font-bold grid">Academic Discount</p>
              <select
                name="acads"
                value={acads}
                onChange={(e) => setAcads(e.target.value)}
                className="grid border rounded-lg p-2 items-center ml-10 w-auto lg:w-[300px] text-center"
              >
                <option value="">--- Select ---</option>
                <option value="honor" className="font-semibold text-green-900">With Honors</option>
                <option value="high" className="font-semibold text-green-900">With High Honors</option>
                <option value="highest" className="font-semibold text-green-900">With Highest Honors</option>
              </select>
             
              </div>

                <div className="mt-5 grid grid-cols-2">
                <label htmlFor="discount" className="font-bold grid">Sibings Discount</label>
                <select
                name="sibs"
                value={siblingDiscount}
                onChange={(e) => setSiblingDiscount(e.target.value)}
                className="grid border rounded-lg p-2 items-center ml-10 w-auto lg:w-[300px] text-center"
              >
                <option value="">--- Select ---</option>
                <option value="yes" className="font-semibold text-green-900">YES</option>
                <option value="no" className="font-semibold text-green-900">NO</option>
              </select>
              </div>
              

              
              <div className="mt-5 grid grid-cols-2 gap-2">
                <p className="font-bold">ESC Grant Remaining:</p>
                <p className="font-bold text-green-800 text-center">10</p>
              </div>
            
            <div className="mt-5 grid grid-cols-2 items-center gap-2">
                <label htmlFor="otherF" className=" font-bold">
                  Other Fees:
                </label>
                <input type="number"
                  id="otherF"
                  value={otherF}
                  onChange={(e) => setOtherF(Number(e.target.value))}
                  className="w-auto border px-2 py-1 rounded outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                
                />
              </div>

            <div className="mt-5 grid grid-cols-2 items-center gap-2">
                <label htmlFor="otherD" className=" font-bold">
                  Other Discounts:
                </label>
                <input type="number"
                  id="otherD"
                  value={otherD}
                  onChange={(e) => setOtherD(Number(e.target.value))}
                  className="w-auto border px-2 py-1 rounded outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                
                />
              </div>
          </main>
        </DialogContent>
      </Dialog>
    );
  };

  
