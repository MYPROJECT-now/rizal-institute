"use client";

import { Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
 } from "../../ui/sheet";  

import { Menu } from "lucide-react";
import { Sidebar_student } from "./sidebar_student";
import { useEffect, useState } from "react";
import { useAcadModal } from "@/src/store/academicYear";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const { isOpen: acadOpen } = useAcadModal();
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
                <Sidebar_student onClose={ () => setOpen(false)}/>    
            </SheetContent>       
        </Sheet>
    )
}

