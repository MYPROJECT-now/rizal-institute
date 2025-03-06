import { Sidebar_admin } from "@/components/sidebar/sidebar_admin";

type props  = {
    children: React.ReactNode;
};

const AdminLayout = ({children}: props) => {
    return (
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
            <Sidebar_admin />
            {children}
        </div>
    );
};

export default AdminLayout;