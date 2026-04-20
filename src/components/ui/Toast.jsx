import { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "../../lib/utils"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(({ title, description, type = "info", duration = 3000 }) => {
    const id = Date.now() + Math.random().toString()
    setToasts((prev) => [...prev, { id, title, description, type, duration }])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext)

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function Toast({ title, description, type, onClose }) {
  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <AlertCircle className="text-red-400" size={20} />,
    info: <Info className="text-primary-400" size={20} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="glass-panel p-4 rounded-xl flex items-start gap-3 w-full shadow-lg border border-white/10"
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        {description && <p className="text-sm text-slate-300 mt-1">{description}</p>}
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  )
}
