import { forwardRef } from "react"
import { cn } from "../../lib/utils"

const GlassCard = forwardRef(({ className, interactive = true, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "glass-dark rounded-2xl p-6",
        interactive && "glass-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
GlassCard.displayName = "GlassCard"

export { GlassCard }
