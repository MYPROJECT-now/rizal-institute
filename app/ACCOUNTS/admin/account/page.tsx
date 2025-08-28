import { CreateAccount } from "@/components/accounts/admin/create_account/account";
import Admin_header from "@/components/sidebar/header/header_admin";


const Announcement = () => {
    return (
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_header />
            <div className="w-full h-[750px] lg:h-[600px] bg-white self-center  rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    Account Creation
                </div>
                <div className="h-[400px] w-full flex mt-[30px] justify-center">
                    <CreateAccount />
                </div>
            </div>
        </div>
    );
};

export default Announcement;