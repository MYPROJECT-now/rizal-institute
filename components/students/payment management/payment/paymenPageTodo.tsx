import { addPayment } from "@/src/actions/studentAction";
import AddTodo from "./paymentAddTodo";
import { toast } from "sonner";


export const PaymentPage =  () => {

    const createTodo = async (
      amount: number,
      mop: string,
      POP: string,
    ) => {
      try {
        const result =await addPayment
          ( amount, mop, POP );

      if (result?.success === false) {
        toast.error(result.error || "Payment could not be added.");
        return;
      }
      
      toast.success("Payment was successfully added");

      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message || "Failed to add payment. Please try again.");
        } else {
          toast.error("Failed to add payment. Please try again.");
        }

    }
  };
    
  return (
  <div>
    <AddTodo createTodo={createTodo} />
  </div>
  )
};