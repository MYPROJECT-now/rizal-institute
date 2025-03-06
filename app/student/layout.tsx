import { Sidebar_student } from "@/components/sidebar/sidebar_student";

type props  = {
    children: React.ReactNode;
};

const AdminLayout = ({children}: props) => {
    return (
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
            <Sidebar_student />
            {children}
        </div>
    );
};

export default AdminLayout;