import { Sheet,
    SheetContent,
    SheetTrigger
 } from "../ui/sheet";  

import { Menu } from "lucide-react";
import { Sidebar_student } from "./sidebar_student";


export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_student/>    
            </SheetContent>       
        </Sheet>
    )
}

