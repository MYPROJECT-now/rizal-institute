import { Sheet,
    SheetContent,
    SheetTrigger
 } from "../ui/sheet";  

import { Menu } from "lucide-react";
import { Sidebar_teacher } from "./sidebar_teacher";


export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_teacher/>    
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 