    "use client";

    import { Button } from "@/components/ui/button";
    import Image from "next/image";

    type Props = {
        label: string;
        iconSrc: string;
        onClick?: () => void;
    };

    export const SidebarAcad = ({
    label,
    iconSrc,
    onClick,
    }: Props) => {

        return(
            <Button 
            className="flex flex-row justify-start h-[40px] lg:text-xl sm:text-lg text-sm "
            variant="link"
            asChild
            onClick={onClick}
            >
                <div>
                    <Image 
                        src={iconSrc}    
                        alt={label}
                        className="mr-2 w-[32px] h-[32px] "
                        height={1000}
                        width={1000}
                    />
                    {label}
                </div>
            </Button>
        );
    };

