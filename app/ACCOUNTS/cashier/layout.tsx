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
        <>

        <MobileHeader />
        <Sidebar_cashier className ="hidden lg:flex"/>
        <main className="lg:pl-[300px] h-full">
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
            
            {children}
        </div>
        </main>
        </>
    );
};

export default RegistrarLayout;