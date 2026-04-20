import { forwardRef } from "react"
import { cn } from "../../lib/utils"

const Input = forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-primary-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-10",
          error && "border-red-500/50 focus-visible:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
