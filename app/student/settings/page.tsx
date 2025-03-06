
import Admin_student from "@/components/header/header_student";
import StudentClientComponent from "@/components/validation/student_validate";


const Settings = () => {
    return (
        <StudentClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Admin_student />
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
            Settings
            </div>
        </div>
        </StudentClientComponent>
    );
};

export default Settings;