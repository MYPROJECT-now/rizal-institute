"use client";

import { useAcadModal } from "@/src/store/academicYear";
import { Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
 } from "../../ui/sheet";  

import { Sidebar_cashier } from "./sidebar_cashier"; 
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const { isOpen: acadOpen } = useAcadModal();

    // Close sidebar whenever any modal opens
    useEffect(() => {
        if (acadOpen) {
            setOpen(false);
        }
    }, [acadOpen]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Menu className="text-white cursor-pointer" />
            </SheetTrigger>
            <SheetTitle/>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_cashier onClose={() => setOpen(false)}/>    
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 