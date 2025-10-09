import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "text-white text-xl font-bold font-merriweather w-full hover:bg-white/10 rounded-md border-l-4 border-transparent hover:border-white px-4 py-3 transition-all duration-200 justify-start text-left flex items-center gap-3 hover:translate-x-1",
        link: "text-white text-xl font-bold font-merriweather w-full px-4 py-3 transition-all duration-200 justify-start text-left flex items-center gap-3 hover:text-slate-100 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-white/60 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300",
        mainButton:
          "bg-gradient-to-r from-green-500 to-green-800 text-white hover:bg-green-500 sm:border-b-[7px] border-b-[5px] active:border-0 border-b-dGreen shadow-lg hover:scale-105  transition-all duration-200 disabled:opacity-60 font-oswald",
        subMainButton:
          "bg-gradient-to-r from-green-500 to-green-800 text-dGreen hover:bg-green-300 sm:border-b-[7px] border-b-[5px] active:border-0 border-b-green-600 font-oswald shadow-lg hover:scale-105  transition-all duration-200 disabled:opacity-60",
        subButton:
          "bg-gradient-to-r from-white to-green-200 text-dGreen hover:bg-green-500 sm:border-b-[7px] border-b-[5px] active:border-0 border-b-slGreen font-oswald shadow-lg hover:scale-105  transition-all duration-200 disabled:opacity-60",

        acceptButton:
          "bg-gradient-to-b from-blue-500 to-blue-900 text-white transition-all duration-200 active:scale-95 active:shadow-inner disabled:opacity-60 hover:brightness-60",
        
        rejectButton:
          "bg-gradient-to-b from-red-500 to-red-900 text-white transition-all duration-200 active:scale-95 active:shadow-inner disabled:opacity-60 hover:brightness-60",

        confirmButton:
          "bg-gradient-to-b from-green-500 to-green-800 text-white transition-all duration-200 active:scale-95 active:shadow-inner disabled:opacity-60 hover:brightness-110",

          prevButton:
          "bg-gradient-to-b from-gray-300 to-gray-500 text-gray-800 transition-all duration-200 active:scale-95 active:shadow-inner hover:brightness-110 disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-60",



          
        //custome buton
        mButton:
          "bg-lGreen text-white hover:bg-green-500 border-b-[7px] active:border-0 border-b-dGreen font-oswald",
        sButton:
          "bg-white text-lGreen hover:bg-gray/90 border-b-[7px] active:border-0 border-b-slGreen font-oswald",
        hButton:
          "text-3xl font-bold text-white hover:text-slate-100 transition-colors duration-200 hover:underline-offset-4 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-white after:transition-all after:duration-300",
        CButton:
          "bg-gray-100 text-white hover:bg-green-200 border-[3px] border-green-300 font-oswald text-green-500 font-bold",
        
       

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-xl px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
