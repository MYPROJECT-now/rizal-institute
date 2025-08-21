
import { Registration_Form } from "@/components/accounts/students/reg form/reg_form";
import Admin_student from "@/components/sidebar/header/header_student";


const Reg_Form = () => {
    return (
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_student />
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div>
                <Registration_Form />
                </div>
            </div>
           
        </div>
    );
};

export default Reg_Form;