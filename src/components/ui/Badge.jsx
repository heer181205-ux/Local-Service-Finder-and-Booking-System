import { cn } from "../../lib/utils"

export function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-primary-500/20 text-primary-300 border border-primary-500/30",
    success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    danger: "bg-red-500/20 text-red-300 border border-red-500/30",
    outline: "border border-slate-600 text-slate-300",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
