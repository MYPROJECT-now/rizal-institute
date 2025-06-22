import { Sidebar_cashier } from "@/components/sidebar/sidebar_cashier";


type props  = {
    children: React.ReactNode;
};

const RegistrarLayout = ({children}: props) => {
    return (
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
            <Sidebar_cashier />
            {children}
        </div>
    );
};

export default RegistrarLayout;