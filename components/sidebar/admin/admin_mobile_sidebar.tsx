"use client";

import { Sheet,
    SheetContent,
    SheetTrigger
 } from "../../ui/sheet";  


import { Menu } from "lucide-react";
import { useState } from "react";
import { Sidebar_admin } from "./sidebar_admin";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
             <Menu className ="text-white cursor-pointer"/> 
            </SheetTrigger> 
            <SheetContent className = "p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_admin onClose={() => setOpen(false)}/>   
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 