"use client";

import { Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
 } from "../../ui/sheet";  

import { Menu } from "lucide-react";
import { Sidebar_registrar } from "./sidebar_registrar";
import { useState } from "react";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Menu className="text-white cursor-pointer" />
            </SheetTrigger>
            <SheetTitle/>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_registrar onClose={() => setOpen(false)}/>    
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 