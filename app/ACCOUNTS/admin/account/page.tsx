import { CreateAccount } from "@/components/admin/create_account/account";
import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Announcement = () => {
    return (
        <AdminClientComponent>
<<<<<<< HEAD:app/admin/account/page.tsx
        <div className="w-full h-auto rounded-xl flex flex-col px-10  bg-page">
=======
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
>>>>>>> 69fa2d4498f24bef8e4bb818cf37c25028ffe2c1:app/ACCOUNTS/admin/account/page.tsx
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