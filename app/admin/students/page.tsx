import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Students = () => {
    return (
        <AdminClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Admin_header />
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
            Students
            </div>
        </div>
        </AdminClientComponent>
    );
};

export default Students;