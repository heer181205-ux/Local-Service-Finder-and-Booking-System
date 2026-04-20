import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, LogIn, ArrowRight, User, CalendarDays } from "lucide-react"
import { Button, Input, useToast, ProviderIllustration } from "../../components/ui"
import { simulateNetworkDelay } from "../../lib/utils"
import { useRole } from "../../contexts/RoleContext"

import api from "../../lib/api"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { setRole } = useRole()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      addToast({ title: "Error", description: "Please enter your email and password.", type: "error" })
      return
    }

    try {
      setIsLoading(true)
      
      const credentials = {
        email,
        password
      };

      const result = await api.login(credentials);
      
      // Store user info and token
      localStorage.setItem("app-user-token", result.data.token)
      localStorage.setItem("app-user-name", result.data.user.name)
      localStorage.setItem("app-user-role", result.data.user.role)
      localStorage.setItem("app-user-id", result.data.user.id)

      setRole(result.data.user.role)
      
      addToast({ 
        title: "Welcome Back!", 
        description: `Successfully logged in as ${result.data.user.name}.`, 
        type: "success" 
      })
      
      if (result.data.user.role === "provider") {
        navigate("/provider/dashboard")
      } else {
        navigate("/")
      }
    } catch (error) {
      addToast({ 
        title: "Login Failed", 
        description: error.message || "Invalid email or password.", 
        type: "error" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      
      {/* Left Side: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 z-10 bg-white shadow-[20px_0_50px_rgba(0,0,0,0.03)] relative">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
           className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary-700 ml-1">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                className="!bg-white/90 !border-primary-200 !text-slate-900 !shadow-sm placeholder:!text-slate-400 focus-visible:!border-primary-500 focus-visible:!ring-primary-500/20"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary-700 ml-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                className="!bg-white/90 !border-primary-200 !text-slate-900 !shadow-sm placeholder:!text-slate-400 focus-visible:!border-primary-500 focus-visible:!ring-primary-500/20"
              />
            </div>

            <Button type="submit" className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40" size="lg" isLoading={isLoading}>
              {!isLoading && <LogIn size={18} className="mr-2" />}
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 pb-2">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary-600 hover:text-primary-500 font-bold inline-flex items-center group transition-colors">
              Sign up
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Animated Layout Panel */}
      <motion.div 
        layoutId="auth-panel"
        className="hidden lg:flex absolute top-0 right-0 w-1/2 h-full z-20 bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-700 flex-col items-center justify-between py-12 px-8 overflow-hidden shadow-2xl"
      >
        <div className="flex-1 w-full flex items-center justify-center">
           <ProviderIllustration />
        </div>

        {/* Dynamic Panel Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="relative z-10 text-center text-white max-w-md pb-8"
        >
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">Hello, Friend!</h2>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Welcome back to LocalServe. Your trusted companion for connecting with top-tier local service providers.
          </p>
        </motion.div>
      </motion.div>
      
    </div>
  )
}
