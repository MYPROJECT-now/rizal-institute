import { Sidebar_registrar } from "@/components/sidebar/sidebar_registrar";
import { MobileHeader } from "@/components/sidebar/registrar_mobile_header";

type props  = {
    children: React.ReactNode;
};

const RegistrarLayout = ({children}: props) => {
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