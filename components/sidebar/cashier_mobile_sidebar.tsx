import { Sheet,
    SheetContent,
    SheetTrigger
 } from "../ui/sheet";  

import { Sidebar_cashier } from "./sidebar_cashier"; 
import { Menu } from "lucide-react";


export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_cashier/>    
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 