import Student_header from "@/app/header/header_student";
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
        <div className=" h-screen bg-lGreen flex lg:flex-row flex-col">
            <header>
                <MobileHeader /> 
            </header>
            <aside>
                <Sidebar_student className="hidden lg:flex" />
            </aside>
            <main className="flex-1 w-full bg-lGreen flex flex-col ">
                <section className="bg-page rounded-lg flex flex-col flex-1 min-h-0 overflow-hidden m-3">
                    <section className=" bg-page flex flex-col  overflow-y-auto  flex-1 min-h-0 rounded-lg">
                        <Student_header />
                        <div className=" flex-1  min-h-0">
                        {children}
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default AdminLayout;