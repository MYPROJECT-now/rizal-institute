"use client";

import { Sheet,
    SheetContent,
    SheetTrigger
 } from "../ui/sheet";  

import { Menu } from "lucide-react";
import { Sidebar_student } from "./sidebar_student";
import { useState } from "react";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Menu className="text-white cursor-pointer" />
            </SheetTrigger>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_student onClose={ () => setOpen(false)}/>    
            </SheetContent>       
        </Sheet>
    )
}

