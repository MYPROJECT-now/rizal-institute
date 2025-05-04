
import { Registration_Form } from "@/components/students/reg form/reg_form";
import Admin_student from "@/components/header/header_student";
import StudentClientComponent from "@/components/validation/student_validate";


const Reg_Form = () => {
    return (
        <StudentClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_student />
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div>
                <Registration_Form />
                </div>
            </div>
           
        </div>
        </StudentClientComponent>
    );
};

export default Reg_Form;