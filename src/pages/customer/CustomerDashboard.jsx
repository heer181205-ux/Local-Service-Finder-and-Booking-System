import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Map, Star, Settings, User, Wrench } from "lucide-react"
import { GlassCard, Button, Badge, Input, useToast, Skeleton } from "../../components/ui"
import api from "../../lib/api"
import { simulateNetworkDelay } from "../../lib/utils"

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("bookings") // bookings, tracking, settings
  const [selectedBookingForRating, setSelectedBookingForRating] = useState(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const { addToast } = useToast()

  const userName = localStorage.getItem("app-user-name") || "My Account"
  const userDob = localStorage.getItem("app-user-dob") || ""
  const initials = userName === "My Account" ? "ME" : userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        const response = await api.getCustomerBookings()
        setBookings(response.data)
      } catch (error) {
        console.error("Failed to fetch bookings:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const upcomingBookings = bookings.filter(b => b.status === "Upcoming")
  const completedBookings = bookings.filter(b => b.status === "Completed")

  const submitReview = async () => {
    if (rating === 0) {
      addToast({ title: "Rating required", description: "Please select a star rating.", type: "warning" })
      return
    }
    setIsSubmittingReview(true)
    await simulateNetworkDelay(1000)
    setIsSubmittingReview(false)
    addToast({ title: "Review Submitted", description: "Thank you for your feedback!", type: "success" })
    setSelectedBookingForRating(null)
    setRating(0)
    setReviewText("")
  }

  return (
    <>
      {/* Dashboard Background */}
      <div className="dashboard-bg"></div>
      <div className="dashboard-overlay"></div>
      
      <div className="dashboard-container space-y-8 pb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Dashboard</h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">Manage your bookings, track services, and update settings.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 w-fit shadow-sm">
          {[
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "tracking", label: "Live Tracking", icon: Map },
            { id: "settings", label: "Profile", icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <section>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Upcoming Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoading ? (
                    Array.from({ length: 2 }).map((_, i) => (
                      <GlassCard key={`up-skel-${i}`} interactive={false} className="space-y-4 p-6 bg-white border-slate-200">
                         <Skeleton className="h-6 w-1/3 mb-2 bg-slate-100" />
                         <Skeleton className="h-4 w-1/2 bg-slate-100" />
                         <div className="space-y-2 mt-4">
                           <Skeleton className="h-3 w-1/4 bg-slate-100" />
                           <Skeleton className="h-3 w-1/4 bg-slate-100" />
                         </div>
                         <div className="flex gap-3 mt-6">
                           <Skeleton className="h-10 flex-1 rounded-xl bg-slate-100" />
                           <Skeleton className="h-10 flex-1 rounded-xl bg-slate-100" />
                         </div>
                      </GlassCard>
                    ))
                  ) : upcomingBookings.length > 0 ? upcomingBookings.map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard interactive={false} className="relative overflow-hidden p-6 bg-white border-slate-200 hover:border-primary-200 transition-colors group shadow-sm hover:shadow-lg">
                        <div className="absolute top-0 right-0 p-5">
                          <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50 font-bold px-3 py-1">
                            {booking.status}
                          </Badge>
                        </div>
                        <h3 className="font-extrabold text-xl text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{booking.service}</h3>
                        <p className="text-primary-600 text-sm font-bold mb-5 flex items-center gap-2">
                          <User size={14} /> {booking.providerName}
                        </p>
                        
                        <div className="space-y-3 text-sm text-slate-600 font-medium">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-3 text-slate-400" /> {booking.date}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-3 text-slate-400" /> {booking.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-3 text-slate-400" /> {booking.customerAddress}
                          </div>
                        </div>
                        
                        <div className="mt-8 flex gap-3">
                          <Button 
                            variant="primary" 
                            size="md" 
                            className="flex-1 font-bold"
                            onClick={() => setActiveTab("tracking")}
                          >
                            Track Status
                          </Button>
                          <Button variant="outline" size="md" className="flex-1 font-bold bg-white">Reschedule</Button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  )) : (
                    <div className="col-span-full py-16 text-center flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-slate-200 border-dashed shadow-inner">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                        <Calendar size={32} className="text-slate-400" />
                      </div>
                      <h4 className="text-2xl font-extrabold text-slate-900 mb-2">No upcoming bookings</h4>
                      <p className="text-slate-500 max-w-md mx-auto text-lg">When you book a service, your upcoming appointments will appear here.</p>
                      <Button variant="outline" className="mt-8 bg-white font-bold" onClick={() => window.location.href = "/"}>Find a Service</Button>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3 opacity-90">
                  Past Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoading ? (
                    <GlassCard interactive={false} className="space-y-3 p-6 bg-white/50 border-slate-200 border-dashed">
                       <Skeleton className="h-5 w-1/3 mb-1 bg-slate-100" />
                       <Skeleton className="h-4 w-1/4 bg-slate-100" />
                       <Skeleton className="h-10 w-full mt-4 rounded-xl bg-slate-100" />
                    </GlassCard>
                  ) : completedBookings.length > 0 ? completedBookings.map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard interactive={false} className="p-6 bg-white border-slate-200 border-dashed opacity-80 hover:opacity-100 hover:border-solid hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-extrabold text-lg text-slate-900">{booking.service}</h3>
                            <p className="text-slate-500 text-sm font-medium">{booking.providerName}</p>
                          </div>
                          <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 font-bold">
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">{booking.date}</p>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="w-full font-bold bg-white"
                          onClick={() => setSelectedBookingForRating(booking)}
                        >
                          <Star size={16} className="mr-2 text-amber-500" /> Rate Experience
                        </Button>
                      </GlassCard>
                    </motion.div>
                  )) : (
                    <div className="col-span-full py-10 text-center text-slate-500 font-medium bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                      You have no past service history.
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "tracking" && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard interactive={false} className="p-0 overflow-hidden border border-slate-200 shadow-xl bg-white">
                {isLoading ? (
                  <div className="p-16 text-center">
                     <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6 bg-slate-100" />
                     <Skeleton className="h-8 w-1/3 mx-auto mb-3 bg-slate-100" />
                     <Skeleton className="h-4 w-1/4 mx-auto bg-slate-100" />
                  </div>
                ) : upcomingBookings.length === 0 ? (
                  <div className="p-20 flex flex-col items-center justify-center text-center bg-slate-50">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-6">
                      <MapPin size={40} className="text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No Active Provider to Track</h3>
                    <p className="text-slate-500 max-w-sm text-lg block">When a booked service is in progress, you will see the provider's live location here.</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 md:p-8 border-b border-slate-200 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm">Live Tracking: {upcomingBookings[0].providerName}</h2>
                        <p className="text-slate-500 font-bold mt-1 text-lg">{upcomingBookings[0].service}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl">
                          <span className="text-indigo-500 text-[10px] font-black uppercase tracking-widest block mb-0.5">Status</span>
                          <span className="text-indigo-900 font-extrabold">In Transit</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl shadow-sm">
                          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest block mb-0.5">ETA</span>
                          <span className="text-emerald-700 font-extrabold text-lg">15 mins</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock Map View */}
                    <div className="relative w-full h-[500px] bg-slate-100 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"></div>

                      {/* Provider Pin */}
                      <motion.div 
                        className="absolute z-10 flex flex-col items-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        <div className="bg-primary-600 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-xl mb-3 relative">
                          Provider is here
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-primary-600 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                        </div>
                        <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center border-[4px] border-white shadow-[0_10px_30px_rgba(59,130,246,0.4)]">
                          <Wrench size={24} className="text-white" />
                        </div>
                      </motion.div>

                      {/* Customer Pin */}
                      <div className="absolute bottom-24 right-40 flex flex-col items-center">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-[4px] border-white shadow-[0_10px_30px_rgba(16,185,129,0.4)]">
                          <MapPin size={24} className="text-white" />
                        </div>
                      </div>

                      {/* Route Line Mock */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 4px 12px rgba(59,130,246,0.3))' }}>
                        <motion.path 
                          d="M 50% 50% Q 65% 65% 80% 80%" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="6" 
                          strokeLinecap="round"
                          strokeDasharray="12 12"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  </>
                )}
              </GlassCard>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <GlassCard interactive={false} className="p-10 bg-white border-slate-200 shadow-xl rounded-3xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 border-b border-slate-100 pb-10 text-center sm:text-left">
                  <div className="relative">
                    <div className="w-28 h-28 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-[2rem] flex items-center justify-center text-4xl font-black text-primary-700 shadow-inner border border-white">
                      {initials}
                    </div>
                    <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-slate-600 hover:text-primary-600 transition-colors">
                      <User size={18} />
                    </button>
                  </div>
                  <div className="pt-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{userName}</h2>
                    <Badge className="mt-3 bg-emerald-100 text-emerald-700 border-none font-bold px-3 py-1 text-xs">Premium Customer</Badge>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                      <Input defaultValue={userName} className="h-14 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Date of Birth</label>
                      <Input type="date" defaultValue={userDob} className="h-14 font-medium" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                    <Input type="email" defaultValue="user@demo.com" disabled className="h-14 bg-slate-50 text-slate-500 border-dashed" />
                    <p className="text-xs font-semibold text-slate-400 mt-1">To change your email, please contact support.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Default Contact Address</label>
                    <Input defaultValue="123 Main St, Downtown" className="h-14 font-medium" />
                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
                    <Button type="button" size="lg" className="rounded-2xl font-bold tracking-wide shadow-lg shadow-primary-500/20 px-8" onClick={() => addToast({ title: "Settings Saved", type: "success" })}>
                      Save All Changes
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating Modal Overlay */}
      <AnimatePresence>
        {selectedBookingForRating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md"
            >
              <GlassCard interactive={false} className="p-8 relative bg-white border-slate-200 shadow-2xl rounded-3xl">
                <button 
                  onClick={() => setSelectedBookingForRating(null)}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Rate your experience</h3>
                <p className="text-slate-500 font-medium mb-8">
                  How was your {selectedBookingForRating.service} with {selectedBookingForRating.providerName}?
                </p>

                <div className="flex justify-center gap-3 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        size={40} 
                        className={star <= rating ? "fill-amber-400 text-amber-400 drop-shadow-md" : "text-slate-200"} 
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Write a review (optional)</label>
                  <textarea 
                    className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none transition-all placeholder:text-slate-400"
                    placeholder="Tell others about your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary-500/20 text-lg" 
                  onClick={submitReview}
                  isLoading={isSubmittingReview}
                >
                  Submit Review
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}
