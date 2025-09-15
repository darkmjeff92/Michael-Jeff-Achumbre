import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex fold:h-12 xs:h-11 h-10 w-full rounded-md border border-lightning-gray bg-lightning-dark fold:px-4 xs:px-4 px-3 fold:py-3 xs:py-3 py-2 fold:text-base xs:text-sm text-sm text-lightning-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lightning-yellow focus:ring-offset-2 focus:ring-offset-lightning-black disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }