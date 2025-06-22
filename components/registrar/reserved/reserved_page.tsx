
import { get_ReservedApplicants } from "@/src/actions/registrarAction";
import Reserved from "./reservedTodos";


export const Reserved_Page = async () => {
    const students = await get_ReservedApplicants();

    return <Reserved reserved={students} />

};