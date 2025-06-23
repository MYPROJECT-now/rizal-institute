import { MobileHeader } from "@/components/sidebar/cashier_mobile_header";
import { Sidebar_cashier } from "@/components/sidebar/sidebar_cashier";


type props  = {
    children: React.ReactNode;
};

const RegistrarLayout = ({children}: props) => {
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