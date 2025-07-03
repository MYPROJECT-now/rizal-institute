import { Sidebar_teacher } from "@/components/sidebar/sidebar_teacher";
import { MobileHeader } from "@/components/sidebar/teacher_mobile_header";

type props  = {
    children: React.ReactNode;
};

const AdminLayout = ({children}: props) => {
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