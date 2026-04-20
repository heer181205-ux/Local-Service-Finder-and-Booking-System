import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, CheckCircle, Star, Power, Settings, TrendingUp, Plus } from "lucide-react"
import { GlassCard, Button, Badge, Input, useToast, Skeleton } from "../../components/ui"
import api from "../../lib/api"

export function ProviderDashboard() {
  const [provider, setProvider] = useState(null)
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        setIsLoading(true)
        const res = await api.getProviderStats()
        setStats(res.data)
        setProvider({
          name: localStorage.getItem("app-user-name") || "Rajesh's Plumbing",
          category: localStorage.getItem("app-provider-category") || "Plumbing",
          hourlyRate: 450,
          area: "South District",
          about: "Professional plumbing services with residential expertise.",
          services: [
            { id: "s1", name: "Full Bathroom Checkup", price: "₹800" },
            { id: "s2", name: "Tap Installation", price: "₹300" }
          ],
          isOnline: true,
          rating: 4.8,
          reviews: 12
        })
      } catch (error) {
        console.error("Failed to load dashboard")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboardInfo()
  }, [])

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
    addToast({
      title: !isOnline ? "You're now online" : "You're now offline",
      description: !isOnline ? "Customers can now discover your profile and book you." : "Your profile is hidden from new searches.",
      type: !isOnline ? "success" : "info"
    })
  }

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingService, setIsAddingService] = useState(false)
  const [newService, setNewService] = useState({ name: "", price: "" })

  const handleSaveProfile = async () => {
    setIsEditingProfile(false)
    addToast({ title: "Profile Updated", description: "Your business details have been saved.", type: "success" })
  }

  const handleAddService = () => {
    if (!newService.name || !newService.price) return
    setProvider(prev => ({
      ...prev,
      services: [...prev.services, { id: Date.now().toString(), name: newService.name, price: newService.price }]
    }))
    setNewService({ name: "", price: "" })
    setIsAddingService(false)
    addToast({ title: "Service Added", description: `${newService.name} added to your offerings.`, type: "success" })
  }

  const [editingServiceId, setEditingServiceId] = useState(null)
  const [editServiceState, setEditServiceState] = useState({ name: "", price: "" })

  const handleEditService = (service) => {
    setEditingServiceId(service.id)
    setEditServiceState({ name: service.name, price: service.price })
  }

  const handleSaveEditService = () => {
    setProvider(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === editingServiceId ? { ...s, name: editServiceState.name, price: editServiceState.price } : s)
    }))
    setEditingServiceId(null)
    addToast({ title: "Service Updated", description: "Changes have been saved.", type: "success" })
  }

  const handleDeleteService = (id) => {
    setProvider(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }))
    addToast({ title: "Service Deleted", description: "The service has been removed.", type: "info" })
  }

  const statCards = [
    { title: "Total Earnings", value: stats ? `₹${stats.totalEarnings}` : "₹0", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { title: "Jobs Completed", value: stats ? stats.completedJobs.toString() : "0", icon: CheckCircle, color: "text-primary-400", bg: "bg-primary-500/20" },
    { title: "Average Rating", value: stats ? stats.rating.toString() : "0", icon: Star, color: "text-amber-400", bg: "bg-amber-500/20" },
  ]

  return (
    <>
      {/* Dashboard Background */}
      <div className="dashboard-bg"></div>
      <div className="dashboard-overlay"></div>
      
      <div className="dashboard-container space-y-8 pb-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Provider Dashboard</h1>
          {isLoading ? (
            <Skeleton className="h-6 w-64 mt-3 bg-slate-200" />
          ) : (
            <p className="text-slate-500 mt-2 text-lg font-medium">Welcome back, {provider?.name}</p>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Button 
            variant="outline" 
            className="bg-white border-primary-200 text-primary-600 hover:bg-primary-50 font-bold px-6 h-12 rounded-xl shadow-sm"
            onClick={() => window.location.href = "/provider/bookings"}
          >
            Manage New Bookings
          </Button>
          <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-3">Status:</span>
          <button 
            onClick={toggleOnlineStatus}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
              isOnline 
                ? "bg-emerald-500 text-white border-transparent hover:bg-emerald-600 shadow-emerald-500/30" 
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900 shadow-slate-200"
            }`}
          >
            <Power size={18} />
            {isOnline ? "Online (Accepting Jobs)" : "Offline (Hidden)"}
          </button>
        </div>
      </div>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading 
          ? Array.from({ length: 3 }).map((_, i) => (
              <GlassCard key={i} interactive={false} className="p-8 bg-white border-slate-200">
                <Skeleton className="h-14 w-14 rounded-2xl mb-5 bg-slate-100" />
                <Skeleton className="h-5 w-1/2 mb-3 bg-slate-100" />
                <Skeleton className="h-10 w-1/3 bg-slate-100" />
              </GlassCard>
            ))
          : statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
            >
              <GlassCard interactive={false} className="p-8 relative overflow-hidden group bg-white border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-6 -right-6 p-6 opacity-5 pointer-events-none group-hover:scale-125 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700 ease-out">
                  <stat.icon size={160} className="text-slate-900" />
                </div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${stat.bg.replace('/20', '/10')} border border-white`}>
                    <stat.icon size={28} className={stat.color.replace('text-', 'text-')} />
                  </div>
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">{stat.title}</h3>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
                    {stat.value !== "0" && stat.value !== "₹0" && (
                      <Badge className="mb-1.5 bg-emerald-100 text-emerald-700 border-none font-bold px-2 py-0.5 text-xs">
                        <TrendingUp size={12} className="mr-1 inline-block" />+12%
                      </Badge>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard interactive={false} className="p-8 bg-white border-slate-200 shadow-lg rounded-3xl">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shadow-inner">
                <Settings size={20} />
              </span>
              Professional Profile
            </h2>
            <Button 
              variant={isEditingProfile ? "primary" : "outline"}
              size="md"
              className="font-bold min-w-[100px]"
              onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
            >
              {isEditingProfile ? "Save Profile" : "Edit Profile"}
            </Button>
          </div>
          
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <Skeleton className="h-16 w-full rounded-xl bg-slate-100" />
                   <Skeleton className="h-16 w-full rounded-xl bg-slate-100" />
                   <Skeleton className="h-16 w-full rounded-xl bg-slate-100" />
                   <Skeleton className="h-16 w-full rounded-xl bg-slate-100" />
                </div>
                <Skeleton className="h-32 w-full rounded-2xl bg-slate-100" />
              </div>
            ) : isEditingProfile ? (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Business Name</label>
                     <Input 
                       value={provider?.name} 
                       onChange={(e) => setProvider({...provider, name: e.target.value})} 
                       className="h-12 font-medium bg-white"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Category</label>
                     <Input 
                       value={provider?.category} 
                       onChange={(e) => setProvider({...provider, category: e.target.value})} 
                       className="h-12 font-medium bg-white"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hourly Rate (₹)</label>
                     <Input 
                       type="number"
                       value={provider?.hourlyRate} 
                       onChange={(e) => setProvider({...provider, hourlyRate: e.target.value})} 
                       className="h-12 font-medium bg-white"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Operating Area</label>
                     <Input 
                       value={provider?.area} 
                       onChange={(e) => setProvider({...provider, area: e.target.value})} 
                       className="h-12 font-medium bg-white"
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">About Your Business</label>
                   <textarea
                     value={provider?.about}
                     onChange={(e) => setProvider({...provider, about: e.target.value})}
                     className="w-full bg-white border border-slate-300 rounded-xl p-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 h-32 resize-none shadow-sm transition-shadow hover:shadow-md"
                   />
                 </div>
               </motion.div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}}  className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Business Name</label>
                    <div className="text-slate-900 font-extrabold bg-slate-50 p-4 rounded-2xl border border-slate-100 text-lg shadow-sm">{provider?.name}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Category</label>
                    <div className="text-slate-900 font-extrabold bg-slate-50 p-4 rounded-2xl border border-slate-100 text-lg shadow-sm">{provider?.category}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Hourly Rate</label>
                    <div className="text-primary-600 font-black bg-slate-50 p-4 rounded-2xl border border-slate-100 text-lg shadow-sm">₹{provider?.hourlyRate}/hr</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Operating Area</label>
                    <div className="text-slate-900 font-extrabold bg-slate-50 p-4 rounded-2xl border border-slate-100 text-lg shadow-sm">{provider?.area}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">About Your Business</label>
                  <div className="text-slate-700 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 min-h-[100px] shadow-sm font-medium">
                    {provider?.about}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>

        <GlassCard interactive={false} className="p-8 bg-white border-slate-200 shadow-lg rounded-3xl">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
               <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                <Settings size={20} />
              </span>
              List of Services
            </h2>
            <Button 
               variant={isAddingService ? "outline" : "primary"}
               size="md"
               className="font-bold shadow-sm hover:shadow-md"
               onClick={() => setIsAddingService(!isAddingService)}
            >
               {isAddingService ? "Cancel" : <><Plus size={18} className="mr-2"/> Add New</>}
            </Button>
          </div>

          <div className="space-y-4">
            {isAddingService && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }} 
                 animate={{ opacity: 1, height: "auto" }} 
                 className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mb-6 gap-4 flex flex-col shadow-inner"
               >
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-primary-700 uppercase tracking-wide ml-1">Service Name</label>
                   <Input 
                     placeholder="e.g. Deep Cleaning" 
                     value={newService.name}
                     onChange={e => setNewService({...newService, name: e.target.value})}
                     className="bg-white border-primary-200"
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-primary-700 uppercase tracking-wide ml-1">Price / Rate</label>
                   <Input 
                     placeholder="e.g. ₹500 or ₹500/hr" 
                     value={newService.price}
                     onChange={e => setNewService({...newService, price: e.target.value})}
                     className="bg-white border-primary-200"
                   />
                 </div>
                 <Button onClick={handleAddService} size="lg" className="w-full mt-2 font-bold text-lg shadow-lg shadow-primary-500/30">Save Service</Button>
               </motion.div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                 <Skeleton className="h-20 w-full rounded-2xl bg-slate-100" />
                 <Skeleton className="h-20 w-full rounded-2xl bg-slate-100" />
                 <Skeleton className="h-20 w-full rounded-2xl bg-slate-100" />
              </div>
            ) : provider?.services?.length > 0 ? (
              provider.services.map((service, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={service.id} 
                  className="bg-white border border-slate-200 rounded-2xl p-5 group hover:border-primary-300 hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  {editingServiceId === service.id ? (
                     <div className="flex flex-col gap-4">
                       <Input 
                         value={editServiceState.name}
                         onChange={e => setEditServiceState({...editServiceState, name: e.target.value})}
                         className="bg-slate-50 font-medium"
                       />
                       <Input 
                         value={editServiceState.price}
                         onChange={e => setEditServiceState({...editServiceState, price: e.target.value})}
                         className="bg-slate-50 font-medium"
                       />
                       <div className="flex gap-3 justify-end mt-2">
                         <Button variant="outline" size="sm" className="font-bold bg-white" onClick={() => setEditingServiceId(null)}>Cancel</Button>
                         <Button size="sm" className="font-bold px-6" onClick={handleSaveEditService}>Save Changes</Button>
                       </div>
                     </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h4 className="text-slate-900 font-extrabold text-lg group-hover:text-primary-600 transition-colors">{service.name}</h4>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Standard service offering</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <span className="text-primary-600 font-black text-lg bg-primary-50 px-3 py-1 rounded-lg">{service.price}</span>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditService(service)} className="text-slate-400 hover:text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold">Edit</button>
                          <button onClick={() => handleDeleteService(service.id)} className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold">Delete</button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="py-12 px-6 text-center bg-slate-50 rounded-3xl border-2 border-slate-200 border-dashed shadow-inner">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                  <Settings size={28} className="text-slate-400" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-2">No services listed</h4>
                <p className="text-base text-slate-500 max-w-xs mx-auto">Add services to your profile so customers can easily discover and book you.</p>
                {!isAddingService && (
                  <Button variant="outline" className="mt-6 bg-white font-bold" onClick={() => setIsAddingService(true)}>Add Your First Service</Button>
                )}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
    </>
  )
}
