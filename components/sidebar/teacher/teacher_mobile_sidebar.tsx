"use client";



import { Menu } from "lucide-react";
import { Sidebar_teacher } from "./sidebar_teacher";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    return (
        <Sheet  open={open} onOpenChange = {setOpen}>
            <SheetTrigger asChild>
                <Menu className="text-white cursor-pointer" />
            </SheetTrigger>
            
            <SheetContent className ="p-0 z-[100] bg-lGreen" side="left">
                <Sidebar_teacher onClose={() => setOpen(false)}/>    
            </SheetContent>       
        </Sheet>
    )
}



// sheet content = mismong sidebar, ito yung dinedesesignan 