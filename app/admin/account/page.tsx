import { CreateAccount } from "@/components/admin/create_account/account";
import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Announcement = () => {
    return (
        <AdminClientComponent>
        <div className="w-full h-auto rounded-xl flex flex-col px-10  bg-page">
            <Admin_header />
            <div className="w-full h-[750px] lg:h-[600px] bg-white self-center  rounded-lg ">
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