
import { Sidebar_teacher } from "@/components/sidebar/teacher/sidebar_teacher";
import { MobileHeader } from "@/components/sidebar/teacher/teacher_mobile_header";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
type props  = {
    children: React.ReactNode;
};

const AdminLayout = async ({children}: props) => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/portal2"); // not logged in
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const role = user?.publicMetadata?.role;

    if (role !== "teacher") {
        redirect("/"); // unauthorized
    }

    return (
        <>
        
                 <MobileHeader /> 
                <Sidebar_teacher className="hidden lg:flex" />
                <main className="lg:pl-[300px] h-full">
                <div className="min-h-screen w-full flex flex-row ">
                    
                    {children}
                </div>
                </main>
                </>
    );
};

export default AdminLayout;