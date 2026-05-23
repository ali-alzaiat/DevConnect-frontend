import { cva } from 'class-variance-authority'

export const ItemTypes = {
  TASK: 'task'
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-brand text-on-brand shadow-card hover:bg-brand-hover',
        destructive:
          'bg-error text-on-brand shadow-xs hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60',
        outline: 'border border-subtle bg-surface shadow-card hover:bg-surface-hover text-primary',
        secondary: 'bg-surface-hover text-primary shadow-xs hover:bg-surface',
        ghost: 'border border-subtle hover:bg-surface-hover text-subtle hover:text-primary',
        link: 'text-brand underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-brand-tint text-in-brand [a&]:hover:bg-brand [a&]:hover:text-on-brand',
        secondary: 'border-transparent bg-surface-hover text-primary [a&]:hover:bg-surface',
        destructive:
          'border-transparent bg-error text-on-brand [a&]:hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60',
        outline: 'text-primary [a&]:hover:bg-surface-hover'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
