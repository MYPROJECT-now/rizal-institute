import Cashier_header from "@/components/header/header_cashier";
import CashierClientComponent from "@/components/validation/cashier_validate";
import { StudentsPage } from "@/components/cashier/student/studentTable/studentPage";
const RegistrarsStudentsTable = () => {
    return (
        <CashierClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Cashier_header /> 
<<<<<<< HEAD:app/cashier/students/page.tsx
            <div className="w-full h-full bg-white self-center rounded-lg">
                <div className="h-[80px] w-full bg-lGreen font-merriweather font-bold text-lg lg:text-3xl text-white items-center justify-center flex">
=======
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
>>>>>>> 69fa2d4498f24bef8e4bb818cf37c25028ffe2c1:app/ACCOUNTS/cashier/students/page.tsx
                    STUDENT FEE MANAGEMENT
                </div>
                <StudentsPage />
            </div>
        </div>
        </CashierClientComponent>
    );
};

export default RegistrarsStudentsTable;