import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const Button = forwardRef(({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/20 border border-transparent",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 border border-transparent"
  }
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5",
    lg: "h-14 px-8 text-lg"
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </motion.button>
  )
})
Button.displayName = "Button"

export { Button }
