"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as SlotPrimitive from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const inputVariants = cva(
  "flex w-full rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
  {
    variants: {
      variant: {
        default:
          "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
      },
      size: {
        default: "h-9 px-3 py-1 text-base md:text-sm",
        sm: "h-8 px-2 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const formVariants = cva("grid gap-2", {
  variants: {
    layout: {
      default: "gap-2",
      inline: "flex flex-row items-center gap-4",
    },
  },
  defaultVariants: {
    layout: "default",
  },
})

function useFormField() {
  const [id] = React.useState(() => Math.random().toString(36).slice(2, 9))
  return { id }
}

function Form({ className, layout, ...props }: React.ComponentProps<"form"> & VariantProps<typeof formVariants>) {
  return (
    <form
      data-slot="form"
      className={cn(formVariants({ layout }), className)}
      {...props}
    />
  )
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()
  return (
    <div
      data-slot="form-item"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <Label
      data-slot="form-label"
      className={cn("data-[fs-error]:text-destructive", className)}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>) {
  return <SlotPrimitive.Slot data-slot="form-control" {...props} />
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-message"
      className={cn("text-destructive text-sm", className)}
      {...props}
    />
  )
}

function FormField({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, inputVariants }
