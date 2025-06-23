import { Sidebar_student } from "@/components/sidebar/sidebar_student";
import { MobileHeader } from "@/components/sidebar/student_mobile_header";
type props  = {
    children: React.ReactNode;
};

const AdminLayout = ({children}: props) => {
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