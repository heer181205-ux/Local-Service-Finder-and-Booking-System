import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Mail, Lock, Briefcase, UserPlus, CalendarDays } from "lucide-react"
import { Button, Input, useToast, ProviderIllustration } from "../../components/ui"
import { simulateNetworkDelay } from "../../lib/utils"
import { useRole } from "../../contexts/RoleContext"

import api from "../../lib/api"

export function Register() {
  const [accountType, setAccountType] = useState("customer")
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [providerCategory, setProviderCategory] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { setRole } = useRole()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !birthdate || (accountType === "provider" && !providerCategory)) {
      addToast({ title: "Error", description: "All fields are required.", type: "error" })
      return
    }

    try {
      setIsLoading(true)
      
      const userData = {
        name,
        email,
        password,
        role: accountType,
        birthdate
      };

      const result = await api.register(userData);
      
      // Store user info and token
      localStorage.setItem("app-user-token", result.data.token)
      localStorage.setItem("app-user-name", result.data.user.name)
      localStorage.setItem("app-user-role", result.data.user.role)
      localStorage.setItem("app-user-id", result.data.user.id)

      setRole(result.data.user.role)
      
      if (result.data.user.role === "provider") {
        localStorage.setItem("app-provider-category", providerCategory)
      }

      addToast({ 
        title: "Account Created!", 
        description: `Welcome to LocalServe, ${result.data.user.name}!`, 
        type: "success" 
      })
      
      if (result.data.user.role === "provider") {
        navigate("/provider/dashboard")
      } else {
        navigate("/")
      }
    } catch (error) {
      addToast({ 
        title: "Registration Failed", 
        description: error.message || "An error occurred during registration.", 
        type: "error" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      
      {/* Right Side: Form Container */}
      <div className="w-full lg:w-1/2 ml-auto flex flex-col items-center justify-center p-6 lg:p-12 z-10 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.03)] relative overflow-y-auto">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
           className="w-full max-w-md my-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Join LocalServe to find or offer services</p>
          </div>

          <div className="mb-8">
            <label className="text-sm font-semibold text-primary-700 ml-1 block mb-3">I want to...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType("customer")}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  accountType === "customer"
                    ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                    : "bg-white border-primary-200 text-slate-500 hover:border-primary-300 hover:bg-primary-50"
                }`}
              >
                <User size={28} className={accountType === "customer" ? "text-primary-600" : ""} />
                <span className={`font-semibold ${accountType === "customer" ? "text-primary-900" : ""}`}>Hire Providers</span>
              </button>
              <button
                type="button"
                onClick={() => setAccountType("provider")}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  accountType === "provider"
                    ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                    : "bg-white border-primary-200 text-slate-500 hover:border-primary-300 hover:bg-primary-50"
                }`}
              >
                <Briefcase size={28} className={accountType === "provider" ? "text-primary-600" : ""} />
                <span className={`font-semibold ${accountType === "provider" ? "text-primary-900" : ""}`}>Offer Services</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary-700 ml-1">Full Name</label>
              <Input
                type="text"
                placeholder={accountType === "customer" ? "John Doe" : "Business Name / Your Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={User}
                className="!bg-white/90 !border-primary-200 !text-slate-900 !shadow-sm placeholder:!text-slate-400 focus-visible:!border-primary-500 focus-visible:!ring-primary-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-primary-700 ml-1">Birth Date</label>
              <Input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                icon={CalendarDays}
                className="!bg-white/90 !border-primary-200 !text-slate-900 !shadow-sm placeholder:!text-slate-400 focus-visible:!border-primary-500 focus-visible:!ring-primary-500/20"
              />
            </div>

            {accountType === "provider" && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary-700 ml-1">Main Service Category</label>
                <Input
                  type="text"
                  placeholder="e.g. Plumbing, Cleaning, Electrician"
                  value={providerCategory}
                  onChange={(e) => setProviderCategory(e.target.value)}
                  icon={Briefcase}
                  className="!bg-white/90 !border-primary-200 !text-slate-900 !shadow-sm placeholder:!text-slate-400 focus-visible:!border-primary-500 focus-visible:!ring-primary-500/20"
                />
              </div>
            )}

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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                className="!bg-white/90 !border-primary-200 !text-slate-900 !shadow-sm placeholder:!text-slate-400 focus-visible:!border-primary-500 focus-visible:!ring-primary-500/20"
              />
            </div>

            <Button type="submit" className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40" size="lg" isLoading={isLoading}>
              {!isLoading && <UserPlus size={18} className="mr-2" />}
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 pb-2">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-500 font-bold transition-colors">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Left Side: Animated Layout Panel */}
      <motion.div 
        layoutId="auth-panel"
        className="hidden lg:flex absolute top-0 left-0 w-1/2 h-full z-20 bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-700 flex-col items-center justify-between py-12 px-8 overflow-hidden shadow-2xl"
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
          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Join the Network</h2>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Create an account to start booking top-rated professionals or manage your own service business.
          </p>
        </motion.div>
      </motion.div>
      
    </div>
  )
}
