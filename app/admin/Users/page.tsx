
import { UsersTable } from "@/components/admin/users/users";
import Admin_header from "@/components/header/header_admin";
import { Button } from "@/components/ui/button";
import AdminClientComponent from "@/components/validation/admin_validate";


const Announcement = () => {
    return (
        <AdminClientComponent>
        <div className="w-full max-h-full rounded-xl flex flex-col px-10  bg-page sm:text-sm md:text-base lg:text-lg">
            <Admin_header />
            <div className="w-full h-auto bg-white self-center  rounded-lg">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    Users
                </div>
                    
                    <UsersTable />
                
            </div>
        </div>
        
        </AdminClientComponent>
    );
};

export default Announcement;