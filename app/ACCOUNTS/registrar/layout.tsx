import { Sidebar_registrar } from "@/components/sidebar/registrar/sidebar_registrar";
import { MobileHeader } from "@/components/sidebar/registrar/registrar_mobile_header";
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
    
        if (role !== "registrar") {
            redirect("/"); // unauthorized
        }




    return (
        <>
                <MobileHeader /> 
                <Sidebar_registrar className="hidden lg:flex" />
                <main className="lg:pl-[300px] h-full">
                <div className="min-h-screen w-full flex flex-row bg-lGreen">
                    
                    {children}
                </div>
                </main>
                </>
    );
};

export default RegistrarLayout;