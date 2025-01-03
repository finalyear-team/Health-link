import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-primary-700 hover:bg-opacity-10 bg-opacity-5 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        success:
          "border-transparent bg-green-600 text-green-600 hover:bg-opacity-20 bg-opacity-10 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-secondary-600 text-secondary-700 bg-opacity-5 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        outline: "text-slate-950 dark:text-slate-50",
        admin:
          "border-transparent bg-secondary-600 text-secondary-700 hover:bg-opacity-10 bg-opacity-5",
        doctor:
          "border-transparent bg-primary-600 text-primary-700 hover:bg-opacity-10 bg-opacity-5",
        patient:
          "border-transparent bg-yellow-600 text-yellow-700 hover:bg-opacity-10 bg-opacity-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
