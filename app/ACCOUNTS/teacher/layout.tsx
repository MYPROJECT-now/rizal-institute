import { Sidebar_teacher } from "@/components/sidebar/sidebar_teacher";

type props  = {
    children: React.ReactNode;
};

const AdminLayout = ({children}: props) => {
    return (
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
            <Sidebar_teacher />
            {children}
        </div>
    );
};

export default AdminLayout;