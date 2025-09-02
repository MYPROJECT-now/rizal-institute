import { MobileHeader } from "@/components/sidebar/cashier/cashier_mobile_header";
import { Sidebar_cashier } from "@/components/sidebar/cashier/sidebar_cashier";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type props  = {
    children: React.ReactNode;
};

const RegistrarLayout = async ({children}: props) => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/portal2"); // not logged in
    }


    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const role = user?.publicMetadata?.role;

    if (role !== "cashier") {
        redirect("/"); // unauthorized
    }

    return (
        <div className=" flex lg:flex-row flex-col">

        <MobileHeader />
        <Sidebar_cashier className ="hidden lg:flex"/>
        <main className="bg-red-400  min-h-screen w-full ">
        <div className="h-full w-full bg-lGreen">
            
            {children}
        </div>
        </main>
        </div>
    );
};

export default RegistrarLayout;