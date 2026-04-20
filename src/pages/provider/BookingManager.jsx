import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Calendar, Clock, MapPin, Truck, CheckCircle2 } from "lucide-react"
import { GlassCard, Button, Badge, useToast, Skeleton } from "../../components/ui"
import api from "../../lib/api"
import { simulateNetworkDelay } from "../../lib/utils"

export function BookingManager() {
  const [inbox, setInbox] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeJobStatus, setActiveJobStatus] = useState("Accepted")
  const { addToast } = useToast()

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        setIsLoading(true)
        const response = await api.getProviderInbox()
        setInbox(response.data)
      } catch (error) {
        console.error("Failed to load inbox")
      } finally {
        setIsLoading(false)
      }
    }
    fetchInbox()
  }, [])

  const handleAction = async (id, action) => {
    addToast({ title: "Processing...", description: `Please wait`, type: "info", duration: 1000 })
    await simulateNetworkDelay(800)
    
    setInbox(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: action === "accept" ? "Accepted" : "Rejected" }
      }
      return req
    }))
    
    addToast({ 
      title: action === "accept" ? "Booking Accepted" : "Booking Rejected", 
      description: action === "accept" ? "Job added to your schedule." : "Customer has been notified.",
      type: action === "accept" ? "success" : "info" 
    })
  }

  const updateJobStatus = async (newStatus) => {
    addToast({ title: "Updating Status...", type: "info", duration: 800 })
    await simulateNetworkDelay(600)
    setActiveJobStatus(newStatus)
    addToast({ title: "Status Updated", description: `Job is now marked as ${newStatus}`, type: "success" })
  }

  const pendingRequests = inbox.filter(req => req.status === "Pending")
  const acceptedJobs = inbox.filter(req => req.status === "Accepted")

  return (
    <div className="space-y-10 pb-16 relative z-10">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">Booking Management</h1>
        <p className="text-slate-500 font-medium mt-2 text-lg">Review new requests and manage active jobs.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* Inbox / New Requests */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">New Booking Requests</h2>
            {pendingRequests.length > 0 && (
              <span className="bg-red-500 text-white text-sm font-black px-3 py-1 rounded-full shadow-lg shadow-red-500/30 animate-bounce">
                {pendingRequests.length}
              </span>
            )}
          </div>
          
          <div className="space-y-6">
            <AnimatePresence>
              {isLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <GlassCard key={`skel-req-${i}`} interactive={false} className="p-6 mb-5 bg-white border-slate-200">
                    <Skeleton className="h-6 w-1/3 mb-3 bg-slate-100" />
                    <Skeleton className="h-4 w-1/4 mb-5 bg-slate-100" />
                    <Skeleton className="h-24 w-full mb-5 rounded-2xl bg-slate-100" />
                    <div className="flex gap-4">
                       <Skeleton className="h-12 flex-1 rounded-xl bg-slate-100" />
                       <Skeleton className="h-12 flex-1 rounded-xl bg-slate-100" />
                    </div>
                  </GlassCard>
                ))
              ) : pendingRequests.length > 0 ? pendingRequests.map(req => (
                <motion.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="mb-5"
                >
                  <GlassCard interactive={false} className="p-6 border-l-[6px] border-l-amber-400 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <h3 className="font-extrabold text-xl text-slate-900 mb-1">{req.service}</h3>
                        <p className="text-slate-500 font-semibold">{req.customerName}</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 shadow-sm font-bold">New Request</Badge>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mb-8 shadow-inner">
                      <div className="flex items-center text-sm font-semibold text-slate-700">
                        <Calendar size={16} className="mr-3 text-primary-500" /> {req.date}
                      </div>
                      <div className="flex items-center text-sm font-semibold text-slate-700">
                        <Clock size={16} className="mr-3 text-primary-500" /> {req.time}
                      </div>
                      <div className="flex items-center text-sm font-semibold text-slate-700">
                        <MapPin size={16} className="mr-3 text-primary-500" /> {req.customerAddress}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 font-bold h-12 rounded-xl"
                        onClick={() => handleAction(req.id, "accept")}
                      >
                        <Check size={18} className="mr-2" /> Accept
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 font-bold h-12 rounded-xl transition-colors"
                        onClick={() => handleAction(req.id, "reject")}
                      >
                        <X size={18} className="mr-2" /> Reject
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-16 flex flex-col items-center justify-center text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-slate-200 border-dashed"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5 border border-slate-200 shadow-sm">
                    <Calendar size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Inbox Empty</h3>
                  <p className="max-w-[280px] text-base font-medium">You have no new booking requests. We'll notify you when a customer requests your service.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Active Jobs & Status Updater */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Active Jobs</h2>
          
          <div className="space-y-6">
            {isLoading ? (
               Array.from({ length: 1 }).map((_, i) => (
                <GlassCard key={`skel-act-${i}`} interactive={false} className="p-8 bg-white border-slate-200">
                  <div className="flex justify-between mb-5">
                     <Skeleton className="h-6 w-1/3 bg-slate-100" />
                     <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                  </div>
                  <Skeleton className="h-4 w-1/4 mb-8 bg-slate-100" />
                  <Skeleton className="h-28 w-full rounded-2xl bg-slate-100" />
                </GlassCard>
              ))
            ) : acceptedJobs.length > 0 ? acceptedJobs.map((job, i) => (
              <GlassCard key={job.id} interactive={false} className="p-8 border-slate-200 bg-white shadow-xl hover:shadow-2xl transition-shadow rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-extrabold text-2xl text-slate-900 mb-1">{job.service}</h3>
                    <p className="text-primary-600 text-base font-bold">{job.customerName}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm font-bold px-3 py-1">Active</Badge>
                </div>
                
                <div className="flex flex-col gap-3 text-sm font-semibold text-slate-600 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="flex items-center"><Calendar size={16} className="mr-3 text-slate-400"/> {job.date} at {job.time}</span>
                  <span className="flex items-center"><MapPin size={16} className="mr-3 text-slate-400"/> {job.customerAddress}</span>
                </div>

                {/* Status Updater UI */}
                <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Update Job Status</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { status: "Accepted", label: "Accepted", icon: Check },
                      { status: "In Transit", label: "In Transit", icon: Truck },
                      { status: "In Progress", label: "Working", icon: Clock },
                      { status: "Completed", label: "Completed", icon: CheckCircle2 }
                    ].map((s) => (
                      <button
                        key={s.status}
                        onClick={() => i === 0 && updateJobStatus(s.status)} // Only allow first mock job to update for demo
                        className={`py-3 px-2 flex flex-col items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                          (i === 0 ? activeJobStatus : job.status) === s.status
                            ? "bg-primary-50 border-2 border-primary-500 text-primary-700 shadow-md transform scale-105"
                            : "bg-white border-2 border-slate-100 text-slate-500 hover:border-primary-200 hover:bg-primary-50/50 hover:text-primary-600"
                        }`}
                        disabled={i !== 0} // visual constraint for prototype
                      >
                        <s.icon size={20} className={(i === 0 ? activeJobStatus : job.status) === s.status ? "text-primary-600" : "text-slate-400"} />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-slate-200 border-dashed h-full min-h-[300px]"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-5 border border-emerald-100 shadow-sm">
                  <CheckCircle2 size={32} className="text-emerald-500/70" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">All Caught Up</h3>
                <p className="max-w-[300px] text-base font-medium">You don't have any active jobs right now. Accept a new request from your inbox to get started.</p>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
