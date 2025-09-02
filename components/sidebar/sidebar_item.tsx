    "use client";

    import { Button } from "@/components/ui/button";
    import Image from "next/image";
    import Link from "next/link";

    type Props = {
        label: string;
        iconSrc: string;
        href: string;
        onClick?: () => void;
    };

    export const SidebarItem = ({
    label,
    iconSrc,
    href,
    onClick
    }: Props) => {

    return(
        <Button 
            className="flex flex-row justify-start h-[40px] lg:text-xl sm:text-lg text-sm  "
            variant="link"
            onClick={onClick}
            asChild
            >
            <Link href={href}
            onClick={() => {
            onClick?.();
            }}
            >
                <Image 
                    src={iconSrc}    
                    alt={label}
                    className="mr-2 w-[32px] h-[32px] "
                    height={1000}
                    width={1000}
                />
                {label}
            </Link>
        </Button>
        );
    };

