"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSoaModal } from "@/src/store/cashier/soa"

export const SOA = () => {
  const { isOpen, close } = useSoaModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-full lg:w-[700px] h-[600px] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle 
            className="text-base lg:text-2xl font-bold text-white bg-dGreen h-[60px] items-center justify-center flex"
          >
            Statement of Account
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 py-4 space-y-4 text-sm text-gray-800">
          <div className="space-y-1">
            <p><strong>Student Name:</strong> Juan Andres Tamad</p>
            <p><strong>Grade & Section:</strong> 9 - Mettle</p>
            <p><strong>School Year:</strong> 2025 - 2026</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-xs">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-2 py-1 border">Payment</th>
                  <th className="px-2 py-1 border">Amount</th>
                  <th className="px-2 py-1 border">Date</th>
                  <th className="px-2 py-1 border">SI Number</th>
                  <th className="px-2 py-1 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Downpayment (upon enrollment)", "6,000.00", "15-Jul-24", "0032805", "OP - Gcash"],
                  ["September 5, 2025", "1,500.00", "16-Sep-24", "0032839", "OP - Gcash"],
                  ["October 5, 2025", "1,500.00", "16-Oct-24", "0032855", "OP - Gcash"],
                  ["November 5, 2025", "1,500.00", "20-Nov-24", "0032870", "OP - Gcash"],
                  ["December 5, 2025", "1,500.00", "16-Dec-24", "0032907", "OP - Gcash"],
                  ["January 5, 2026", "1,500.00", "", "", ""],
                  ["February 5, 2026", "1,500.00", "21-Jan-25", "0032912", "OP - Gcash"],
                  ["March 5, 2026", "1,500.00", "", "", ""],
                  ["April 5, 2026", "810.00", "", "", ""],
                ].map(([desc, amount, date, si, remarks], i) => (
                  <tr key={i}>
                    <td className="px-2 py-1 border">{desc}</td>
                    <td className="px-2 py-1 border">₱{amount}</td>
                    <td className="px-2 py-1 border">{date}</td>
                    <td className="px-2 py-1 border">{si}</td>
                    <td className="px-2 py-1 border">{remarks}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-yellow-100">
                  <td className="px-2 py-1 border text-right" colSpan={4}>Remaining Balance</td>
                  <td className="px-2 py-1 border">₱3,810.00</td>
                </tr>
                <tr className="font-bold bg-yellow-200">
                  <td className="px-2 py-1 border text-right" colSpan={4}>Total Amount Due</td>
                  <td className="px-2 py-1 border text-red-600">₱1,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
