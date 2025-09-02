"use client";

import { Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
 } from "../../ui/sheet";  


import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar_admin } from "./sidebar_admin";
import { useFiscalYearModal } from "@/src/store/ADMIN/fiscal_year";
import { useEnrollmentModal } from "@/src/store/ADMIN/enrollment";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const { isOpen: fiscalOpen } = useFiscalYearModal();
    const { isOpen: enrollOpen } = useEnrollmentModal();

    

    useEffect(() => {
        if (fiscalOpen || enrollOpen) {
            setOpen(false);
        }
    }, [fiscalOpen, enrollOpen]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
             <Menu className ="text-white cursor-pointer"/> 
            </SheetTrigger> 
            <SheetTitle/>


            <SheetContent className = "p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_admin onClose={() => setOpen(false)}/>   
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 