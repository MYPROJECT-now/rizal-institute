import { getAllReservedSlot_cashier } from "@/src/actions/cashierAction";
import Students from "./todos";


export const ReservedSlotPage = async () => {
    const students = await getAllReservedSlot_cashier();

    return <Students students={students} />

};