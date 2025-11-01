import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addCashPayment, getBalanceForCash } from "@/src/actions/cashierAction";
import { useCashPaymentModal } from "@/src/store/CASHIER/montly";
import { useState } from "react";

interface CashPayment {
  dueThisMonth: number;
  student_id: number | null;
  month_id: number;

}
export const CashPayment = () => {
  const { isOpen, close } = useCashPaymentModal();
  const [lrn, setLrn] = useState("");
  const [lrnLoading, setLrnLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountLoading, setAmountLoading] = useState(false);
  const [balanceInfo, setBalanceInfo] = useState< CashPayment | null>(null);

  const handleClose = () => {
    setLrn("");
    setBalanceInfo(null);
    close();
  }

  const handleLRN = async () => {
    setLrnLoading(true);

    const balance = await getBalanceForCash(lrn);
    setBalanceInfo(balance);

    setLrnLoading(false);

  }

  

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow empty string or non-negative numbers
    if (value === "" || (/^\d*\.?\d*$/.test(value) && Number(value) >= 0)) {
      setAmount(value);
    }
  };


  const handleAddAmount = async () => {
    setAmountLoading(true);

    await addCashPayment(Number(amount), lrn, balanceInfo?.month_id ?? 0, balanceInfo?.student_id ?? 0);
    setAmountLoading(false);
  };

  return(
    <Dialog  open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:w-[500px] w-[290px]   bg-gray-50 rounded-lg shadow-lg ">
            <DialogHeader>
            <DialogTitle className="sm:text-xl  text-lg font-bold text-white bg-dGreen py-4 flex items-center justify-center rounded-t-lg">
                Cash Payment Verification
            </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-5 py-5">
              {balanceInfo === null && (
                <>
                <section className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-5 gap-0 ">
                  <span className="font-bold font-merriweather sm:text-[17px] text-xs text-dGreen ">
                    LRN:
                  </span>
                  <input
                    type="text"
                    placeholder="Enter LRN"
                    value={lrn}
                    onChange={(e) => setLrn(e.target.value)}
                    className="w-full sm:w-[250px] py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen  transition rounded-lg"
                  />
                </section>

                <section>
                  <Button
                    variant="confirmButton"
                    className="px-5 py-2 rounded-lg"
                    onClick={handleLRN}
                    disabled={lrnLoading || lrn === ""}
                  >
                    {lrnLoading ? "Submitting..." : "Submit"}
                  
                  </Button>
                </section>
                </>
              )}


              {balanceInfo && (
                <>
                <section className="flex flex-col gap-1 ">
                  <span className="font-bold font-merriweather text-sm text-dGreen ">
                    Due this month:
                  </span>
                  <input
                    type="text"
                    value={balanceInfo.dueThisMonth}
                    disabled
                    className="w-full sm:w-[250px] py-2 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen  transition rounded-lg"
                  />
                </section>

                <section className="flex flex-col gap-1 ">
                  <span className="font-bold font-merriweather text-sm text-dGreen ">
                    Amount:
                  </span>
                  <input
                    type="text"
                    placeholder="Enter amount paid"
                    value={amount}
                    onChange={handleAmount}
                    disabled={balanceInfo.dueThisMonth === 0}
                    className="w-full sm:w-[250px] py-2 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen  transition rounded-lg"
                  />
                </section>

                <section>
                  <Button
                    variant="confirmButton"
                    className="px-5 py-2 rounded-lg mt-5"
                    onClick={handleAddAmount}
                    disabled={amountLoading || amount === "" || balanceInfo.dueThisMonth === 0}
                  >
                    {amountLoading ? "Submitting..." : "Submit"}
                  
                  </Button>
                </section>
                </>
              )}

            </div>
        </DialogContent>
    </Dialog>
    )
};