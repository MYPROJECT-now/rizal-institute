import CashierAddTodo from "./cashierAddTodo";
import { sendReceipt } from "@/src/actions/cashierAction";
import { toast } from "sonner";



export const CashierPage = () => {
  // State to manage the list of todo items

  // Function to create a new todo item
  const createTodo = async (uploadReceipt: string, selectedID: number) => {
    try {
      await sendReceipt(selectedID, uploadReceipt);
      toast.success("Receipt sent successfully!");
    } catch (error) {
      console.error("Error fetching receipt:", error);
      toast.error("Failed ");
    } finally {

    }
  };

  // Rendering the Todo List component
  return (
    <main>
      {/* Adding Todo component for creating new todos */}
      <CashierAddTodo createTodo={createTodo} />
    </main>
  );
};


