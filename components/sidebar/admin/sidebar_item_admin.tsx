    "use client";

    import { Button } from "@/components/ui/button";
    import Image from "next/image";

    type Props = {
        label: string;
        iconSrc: string;
        onClick?: () => void;
    };

    export const SidebarItemAdmin = ({
    label,
    iconSrc,
    onClick,
    }: Props) => {

        return(
            <Button 
            className="flex flex-row justify-start h-[40px]  sm:text-lg text-sm"
            variant="link"
            asChild
            onClick={onClick}
            >
                <div>
                    <Image 
                        src={iconSrc}    
                        alt={label}
                        className="mr-2"
                        height={32}
                        width={32}
                    />
                    {label}
                </div>
            </Button>
        );
    };

