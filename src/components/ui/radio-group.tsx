"use client"

// radio-group.tsx
// Radio button group built on Radix UI. RadioGroup is the container that tracks
// the selected value; RadioGroupItem is a single selectable circle option.
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "dark:bg-input dark:border-input dark:hover:bg-input/80 dark:focus-visible:border-ring dark:focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary dark:data-[state=checked]:text-primary-foreground dark:data-[state=checked]:border-primary border-input text-primary shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 size-4 shrink-0 rounded-full border outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-destructive/20 aria-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="fill-current size-2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
