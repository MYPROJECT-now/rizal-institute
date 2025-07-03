
import { UsersTable } from "@/components/admin/users/users";
import Admin_header from "@/components/header/header_admin";
import { Button } from "@/components/ui/button";
import AdminClientComponent from "@/components/validation/admin_validate";


const Announcement = () => {
    return (
        <AdminClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_header />
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    Users
                </div>
                <div>
                    <div className="flex flex-row items-center my-5 ml-10 gap-5">
                        <p className="font-bold text-xl text-dGreen font-merriweather">
                            Filter By:
                        </p>
                        <input 
                            type="text"
                            placeholder="Username"
                            className="border border-gray-600 p-2 rounded" 
                        />     
                        <input 
                            type="text"
                            placeholder="Role"
                            className="border border-gray-600 p-2 rounded" 
                        />     
                        <Button
                            variant="mButton"
                            className="text-white px-7 py-4 rounded-lg"
                        >
                            Clear Filter
                        </Button>
                       
                    </div>
                    <UsersTable />
                </div>
            </div>
        </div>
        </AdminClientComponent>
    );
};

export default Announcement;