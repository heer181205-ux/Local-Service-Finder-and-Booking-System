import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, CheckCircle } from "lucide-react"
import { GlassCard, Button, Badge, useToast, Input, Skeleton } from "../../components/ui"
import api from "../../lib/api"
import { simulateNetworkDelay } from "../../lib/utils"

export function ProviderProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  
  const [provider, setProvider] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setIsLoading(true)
        const response = await api.getProviderById(id)
        setProvider(response.data)
      } catch (error) {
        console.error("Provider not found:", error)
        setProvider(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProvider()
  }, [id])

  const [selectedService, setSelectedService] = useState(null)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [address, setAddress] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12 relative z-10">
        <Button variant="ghost" className="mb-4 pl-0 text-slate-500 hover:text-slate-900 font-bold" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} className="mr-1" /> Back to Search
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GlassCard className="p-0 overflow-hidden bg-white border-slate-200">
              <Skeleton className="h-40 w-full rounded-none bg-slate-100" />
              <div className="pt-20 pb-10 px-10">
                <Skeleton className="h-10 w-1/2 mb-5 bg-slate-100" />
                <Skeleton className="h-5 w-3/4 mb-3 bg-slate-100" />
                <Skeleton className="h-5 w-5/6 bg-slate-100" />
              </div>
            </GlassCard>
          </div>
          <div className="lg:col-span-1">
            <GlassCard className="p-8 bg-white border-slate-200">
              <Skeleton className="h-8 w-3/4 mx-auto mb-8 bg-slate-100" />
              <div className="space-y-5">
                <Skeleton className="h-14 w-full rounded-xl bg-slate-100" />
                <Skeleton className="h-14 w-full rounded-xl bg-slate-100" />
                <Skeleton className="h-14 w-full rounded-xl bg-slate-100" />
                <Skeleton className="h-16 w-full mt-6 rounded-2xl bg-slate-100" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="py-24 text-center">
        <GlassCard interactive={false} className="max-w-md mx-auto p-12 border-slate-200 bg-white shadow-xl rounded-3xl">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100 relative">
             <div className="absolute inset-0 rounded-full border-[3px] border-primary-100 animate-ping opacity-50"></div>
             <Star className="text-slate-300" size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Provider Not Found</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto text-lg leading-relaxed">The provider profile you are looking for may have been removed or does not exist.</p>
          <Button onClick={() => navigate(-1)} className="w-full font-bold shadow-lg shadow-primary-500/20" size="lg">
            <ChevronLeft size={20} className="mr-2" /> Browse Other Providers
          </Button>
        </GlassCard>
      </div>
    )
  }

  const handleBook = async () => {
    if (!selectedService || !date || !time || !address) {
      addToast({ title: "Missing details", description: "Please select a service, date, time, and provide your address.", type: "warning" })
      return
    }

    setIsBooking(true)
    await simulateNetworkDelay(1500)
    setIsBooking(false)
    setIsSuccess(true)
    
    // In a real app we would push to MOCK_BOOKINGS array here
    addToast({ title: "Booking Confirmed!", description: `Your appointment with ${provider.name} is set for ${date} at ${time}.`, type: "success" })
    
    setTimeout(() => {
      navigate("/dashboard")
    }, 2000)
  }

  return (
    <div className="space-y-8 pb-12 relative z-10">
      <Button variant="ghost" className="mb-2 pl-0 text-slate-500 hover:text-slate-900 font-bold transition-all hover:pl-2" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} className="mr-1" /> Back to Search
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Profile Info & Services */}
        <div className="lg:col-span-2 space-y-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
            <GlassCard className="overflow-hidden p-0 bg-white border-slate-200 shadow-xl rounded-[2rem]">
              <div className="h-40 bg-gradient-to-r from-primary-600 to-primary-400 w-full relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute -bottom-14 left-10 w-28 h-28 rounded-3xl bg-white border-4 border-white flex items-center justify-center text-5xl font-black shadow-lg text-primary-600 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 drop-shadow-sm">{provider.avatar}</span>
                </div>
              </div>
              <div className="pt-20 pb-10 px-10">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{provider.name}</h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge className="bg-primary-50 text-primary-700 border-primary-100 font-bold px-3 py-1 shadow-sm">{provider.category}</Badge>
                      <span className="flex items-center text-slate-600 text-sm font-semibold">
                        <MapPin size={16} className="mr-1.5 text-slate-400" /> {provider.area}
                      </span>
                      <span className="flex items-center text-slate-600 text-sm font-semibold">
                        <Star size={16} className="mr-1.5 text-amber-400" /> {provider.rating} ({provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 shadow-sm w-full sm:w-auto">
                    <div className="text-3xl font-black text-slate-900">₹{provider.hourlyRate}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">per hour</div>
                  </div>
                </div>
                
                <p className="mt-8 text-slate-600 leading-relaxed font-medium text-lg">
                  {provider.about}
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 24 }}>
            <h2 className="text-2xl font-extrabold mb-6 text-slate-900 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shadow-inner">
                <Star size={20} />
              </span>
              Offered Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {provider.services.map((service, i) => (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={service.id}>
                  <GlassCard 
                    interactive={true}
                    className={`flex flex-col justify-center p-6 h-full cursor-pointer transition-all duration-300 border-2 rounded-2xl ${
                      selectedService?.id === service.id 
                        ? "border-primary-500 bg-primary-50 shadow-md shadow-primary-500/10" 
                        : "border-slate-100 bg-white hover:border-primary-200 hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <span className={`font-extrabold text-lg mb-2 ${selectedService?.id === service.id ? 'text-primary-900' : 'text-slate-900'}`}>
                      {service.name}
                    </span>
                    <span className={`font-black tracking-tight ${selectedService?.id === service.id ? 'text-primary-600' : 'text-slate-500'}`}>
                      {service.price}
                    </span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 24 }}>
            <h2 className="text-2xl font-extrabold mb-6 text-slate-900 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                <Star size={20} />
              </span>
              Recent Reviews
            </h2>
            <div className="space-y-5">
              {provider.recentReviews.length > 0 ? provider.recentReviews.map((review, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  key={review.id}
                >
                  <GlassCard interactive={false} className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-300">
                          {review.user.charAt(0)}
                        </div>
                        <span className="font-extrabold text-slate-900 text-lg">{review.user}</span>
                      </div>
                      <div className="flex text-amber-400 drop-shadow-sm">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < review.rating ? "fill-amber-400" : "text-slate-200"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{review.text}</p>
                  </GlassCard>
                </motion.div>
              )) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 italic font-medium">No reviews yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }}
            className="sticky top-28"
          >
            <GlassCard interactive={false} className="p-8 border-t-[6px] border-t-primary-500 bg-white shadow-2xl rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 opacity-50"></div>
              
              <h2 className="text-2xl font-extrabold mb-8 text-slate-900 text-center tracking-tight">Book Appointment</h2>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={80} className="text-emerald-500 mx-auto mb-6 drop-shadow-md" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Booking Confirmed!</h3>
                  <p className="text-base text-slate-500 font-medium animate-pulse">Redirecting to your dashboard...</p>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {/* Selected Service Preview */}
                  {selectedService ? (
                    <div className="bg-primary-50 rounded-2xl p-4 text-sm flex justify-between items-center border-2 border-primary-200 shadow-inner">
                      <span className="text-primary-900 font-extrabold truncate max-w-[150px]">{selectedService.name}</span>
                      <span className="font-black text-primary-600 bg-white px-3 py-1 rounded-lg shadow-sm border border-primary-100">{selectedService.price}</span>
                    </div>
                  ) : (
                    <div className="bg-amber-50 rounded-2xl p-4 text-sm text-center text-amber-700 font-bold border-2 border-amber-200 border-dashed">
                      Please select a service from the list
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center">
                        <CalendarIcon size={14} className="mr-2 text-slate-400" /> Choose Date
                      </label>
                      <Input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-14 bg-slate-50 border-slate-200 font-semibold text-slate-900 shadow-inner"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center">
                        <Clock size={14} className="mr-2 text-slate-400" /> Select Time
                      </label>
                      <select 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-900 shadow-inner appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer transition-all hover:bg-slate-100"
                      >
                        <option value="" className="text-slate-400">Select a time slot</option>
                        {["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM", "04:30 PM"].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center">
                        <MapPin size={14} className="mr-2 text-slate-400" /> Service Location
                      </label>
                      <Input 
                        placeholder="Enter full address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full h-14 bg-slate-50 border-slate-200 font-medium text-slate-900 placeholder:text-slate-400 shadow-inner"
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full h-16 text-lg font-black shadow-lg shadow-primary-500/30 rounded-2xl uppercase tracking-wider" 
                    onClick={handleBook}
                    isLoading={isBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
