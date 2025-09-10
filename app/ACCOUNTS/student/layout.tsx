import { Sidebar_student } from "@/components/sidebar/student/sidebar_student";
import { MobileHeader } from "@/components/sidebar/student/student_mobile_header";
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

    if (role !== "student") {
        redirect("/"); // unauthorized
    }
    return (
        
        <>
        
                 <MobileHeader /> 
                <Sidebar_student className="hidden lg:flex" />
                <main className="lg:pl-[300px] h-full">
                <div className="min-h-screen w-full flex flex-row bg-lGreen">
                    
                    {children}
                </div>
                </main>
                </>
    );
};

export default AdminLayout;