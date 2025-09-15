import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex fold:min-h-[120px] xs:min-h-[100px] min-h-[80px] w-full rounded-md border border-lightning-gray bg-lightning-dark fold:px-4 xs:px-4 px-3 fold:py-3 xs:py-3 py-2 fold:text-base xs:text-sm text-sm text-lightning-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lightning-yellow focus:ring-offset-2 focus:ring-offset-lightning-black disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }