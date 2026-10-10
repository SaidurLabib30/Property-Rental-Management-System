"use client"

// Form UI primitives: lightweight styled building blocks for building forms.
// Wraps a native <form> plus helper parts and uses Radix UI's Slot (for
// FormControl) and the project's Label component. Exports Form (the <form>),
// layout/content parts (FormItem, FormLabel, FormControl, FormDescription,
// FormMessage, FormField), a useFormField hook, and the inputVariants styles.

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as SlotPrimitive from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

// Reusable style variants for text inputs (size and visual variant options).
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

// Style variants controlling the form's layout (stacked "default" or "inline").
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

// Hook that generates a stable random id, useful for linking labels to fields.
function useFormField() {
  const [id] = React.useState(() => Math.random().toString(36).slice(2, 9))
  return { id }
}

// The native <form> element, styled with the chosen `layout`.
function Form({ className, layout, ...props }: React.ComponentProps<"form"> & VariantProps<typeof formVariants>) {
  return (
    <form
      data-slot="form"
      className={cn(formVariants({ layout }), className)}
      {...props}
    />
  )
}

// Wrapper that groups one field's label, control, and messages together.
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

// A field label (built on the shared Label); turns red when the field errors.
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

// Uses Radix Slot to pass form-control props onto whatever input it wraps.
function FormControl({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>) {
  return <SlotPrimitive.Slot data-slot="form-control" {...props} />
}

// Muted helper text shown beneath a field to explain it.
function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

// Red text used to show a field's validation/error message.
function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-message"
      className={cn("text-destructive text-sm", className)}
      {...props}
    />
  )
}

// A simple div wrapper for a single form field's elements.
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
