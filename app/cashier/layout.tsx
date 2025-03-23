import { Sidebar_registrar } from "@/components/sidebar/sidebar_registrar";

type props  = {
    children: React.ReactNode;
};

const RegistrarLayout = ({children}: props) => {
    return (
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
            <Sidebar_registrar />
            {children}
        </div>
    );
};

export default RegistrarLayout;