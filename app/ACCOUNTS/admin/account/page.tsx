import { CreateAccount } from "@/components/admin/create_account/account";
import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Announcement = () => {
    return (
        <AdminClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_header />
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    Account Creation
                </div>
                <div>
                    <CreateAccount />
                </div>
            </div>
        </div>
        </AdminClientComponent>
    );
};

export default Announcement;