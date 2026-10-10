// Separator: a thin line that visually divides content.
// A styled <div> with role="separator" (not a Radix primitive here).
// Supports horizontal (default) or vertical orientation. Exports Separator.
import { cn } from "@/lib/utils"

// Renders the divider; orientation controls whether it is a row or column line.
function Separator({ className, orientation = "horizontal", ...props }: React.ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      data-slot="separator"
      data-orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
