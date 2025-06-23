<<<<<<< HEAD:app/ACCOUNTS/admin/layout.tsx
import { Sidebar_admin } from "@/components/sidebar/admin/sidebar_admin";
=======
import { Sidebar_admin } from "@/components/sidebar/sidebar_admin";
import { MobileHeader } from "@/components/sidebar/admin_mobile_header";
>>>>>>> ef5f7a4d548cc18291632314bac8ce0d1a15c7c7:app/admin/layout.tsx

type props  = {
    children: React.ReactNode;
};
// mobile header para may drawer, pindutan para ma trigger yung sidebar
const AdminLayout = ({children}: props) => {
    return (
        <>

         <MobileHeader /> 
        <Sidebar_admin className="hidden lg:flex" />
        <main className="lg:pl-[300px] h-full">
        <div className="min-h-screen w-full flex flex-row">
            
            {children}
        </div>
        </main>
        </>

        
    );
};

export default AdminLayout;