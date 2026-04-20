import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, User, Settings, Bell, ChevronDown, LogOut } from "lucide-react"
import { useRole } from "../../contexts/RoleContext"
import { Button, Badge } from "../ui"

export function Navbar() {
  const { role, setRole } = useRole()
  const location = useLocation()
  
  // Hide navbar on auth pages
  if (location.pathname.startsWith('/auth')) return null

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 w-full border-b border-slate-200 shadow-sm backdrop-blur-xl bg-white/80"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform">
            <MapPin size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors">
            LocalServe
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                setRole(null)
                localStorage.removeItem("app-role")
                localStorage.removeItem("app-provider-id")
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-red-500 rounded-lg transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
          
          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
          
          <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden text-slate-600">
              <User size={16} />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-800">
                {localStorage.getItem("app-user-name") || (role === "customer" ? "My Account" : "Business Profile")}
              </span>
              <span className="text-[10px] text-primary-600 font-bold tracking-wide uppercase">
                {role === "customer" ? "Customer" : "Service Provider"}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 ml-1 hidden md:block" />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
