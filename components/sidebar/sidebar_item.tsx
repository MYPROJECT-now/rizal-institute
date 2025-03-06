"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

export const SidebarItem = ({
label,
iconSrc,
href,
}: Props) => {

    return(
        <Button 
        className="flex flex-row justify-start h-[40px]  "
        variant="link"
        asChild
        >
            <Link href={href}>
                <Image 
                    src={iconSrc}    
                    alt={label}
                    className="mr-2"
                    height={32}
                    width={32}
                />
                {label}
            </Link>
        </Button>
    );
};

