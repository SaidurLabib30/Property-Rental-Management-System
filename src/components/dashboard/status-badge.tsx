// status-badge.tsx
// A small colored pill used to show a status (e.g. "available", "pending").
// `class-variance-authority` (cva) defines the color variants; pass `variant`
// to pick one. Falls back to the "default" (primary) style.
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Each variant maps to a background/text color pair, with dark-mode versions.
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        muted: "bg-muted text-muted-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function StatusBadge({ className, variant, children, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { StatusBadge, badgeVariants };
