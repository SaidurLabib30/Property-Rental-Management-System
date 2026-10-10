// Textarea: a styled multi-line text input.
// A thin wrapper around the native <textarea> element (shadcn/ui style).
// Exports Textarea.
import * as React from "react"

import { cn } from "@/lib/utils"

// Renders the <textarea> with app styling, focus ring, and invalid states.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input dark:bg-input/30 dark:hover:bg-input/80 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive dark:aria-invalid:bg-destructive/10 flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
