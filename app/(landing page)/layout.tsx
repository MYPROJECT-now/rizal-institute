import Header from "@/components/ui/main_component/header";
import Footer from "@/components/ui/main_component/footer";


// main layout for the admission website
type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }:Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            
            <Header />
            <main>
                {children}
            </main>        
            <Footer />        
        </div>
    );
};

export default MainLayout;