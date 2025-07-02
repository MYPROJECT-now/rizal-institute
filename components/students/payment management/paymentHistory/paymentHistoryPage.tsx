import { getPaymentHistory } from "@/src/actions/studentAction";
import Todos from "./paymentHistoryTodos";


export const PaymentHistoryPage = async () => {
    const paymentHistory = await getPaymentHistory()
        return <Todos todos={paymentHistory} />;

}
