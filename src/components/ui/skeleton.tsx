// Skeleton: a grey, pulsing placeholder shown while content loads.
// A styled <div> with a pulse animation (no external primitive). Exports Skeleton.
import { cn } from "@/lib/utils"

// Renders the animated placeholder box; its size/shape come from className.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent dark:bg-accent/60 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
