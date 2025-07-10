import { paymentToVerify } from "@/src/actions/cashierAction";
import VerifyTodos from "./VerifyTodos";

export const VerifyPage = async () => {
  const data = await paymentToVerify();
  return <VerifyTodos VerifyTodos={data} />;
}
