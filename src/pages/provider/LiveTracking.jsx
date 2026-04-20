import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Map, MapPin, Navigation, Signal, ShieldCheck } from "lucide-react"
import { GlassCard, Button, Badge, useToast } from "../../components/ui"
import { simulateNetworkDelay } from "../../lib/utils"

export function LiveTracking() {
  const [isSharing, setIsSharing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const toggleLocationSharing = async () => {
    setIsLoading(true)
    await simulateNetworkDelay(1200)
    setIsLoading(false)
    setIsSharing(!isSharing)

    addToast({
      title: !isSharing ? "Location Shared" : "Sharing Paused",
      description: !isSharing ? "Customer can now see your live progress." : "Your location is no longer visible to the customer.",
      type: !isSharing ? "success" : "info"
    })
  }

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto relative z-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3 drop-shadow-sm">
          <Navigation className="text-primary-600" size={36} /> Live Location Sharing
        </h1>
        <p className="text-slate-500 font-medium mt-3 text-lg">Broadcast your route to waiting customers to improve their experience.</p>
      </div>

      <GlassCard interactive={false} className="p-0 overflow-hidden relative border-slate-200 bg-white shadow-2xl rounded-3xl">
        <div className="absolute top-5 left-5 z-20">
          <Badge variant={isSharing ? "success" : "outline"} className={isSharing ? "bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse shadow-lg shadow-emerald-500/20 font-bold px-3 py-1.5" : "bg-white/90 text-slate-600 border-slate-200 shadow-md backdrop-blur-md px-3 py-1.5 font-bold"}>
            <Signal size={14} className="mr-2" />
            {isSharing ? "Broadcasting Live" : "Not Sharing GPS"}
          </Badge>
        </div>

        {/* Mock Map View */}
        <div className="w-full h-[500px] bg-slate-100 flex items-center justify-center relative border-b-2 border-slate-200 overflow-hidden">
          {/* Subtle map texture */}
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
              backgroundSize: '100px'
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {!isSharing ? (
             <div className="text-center z-10 p-10 bg-white/80 backdrop-blur-xl rounded-3xl max-w-sm mx-4 border-2 border-slate-200 shadow-xl">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100">
                  <Map size={48} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">GPS Inactive</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">Start your journey to allow the customer to track your arrival time.</p>
                <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary-500/30" size="lg" onClick={toggleLocationSharing} isLoading={isLoading}>
                  Start Live Tracking
                </Button>
             </div>
          ) : (
            <>
              {/* Provider Pin moving */}
              <motion.div 
                className="absolute z-10 flex flex-col items-center"
                animate={{ 
                  x: [-100, 50, 200],
                  y: [100, -20, -50]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 20, 
                  ease: "linear",
                  repeatType: "reverse"
                }}
              >
                <div className="bg-primary-600 text-white text-sm font-black px-4 py-2 rounded-xl shadow-lg mb-3 relative drop-shadow-md">
                  You
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-primary-600 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                </div>
                <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <Navigation size={24} className="text-white fill-white" />
                </div>
              </motion.div>

              {/* Destination Pin */}
              <div className="absolute top-[20%] right-[20%] flex flex-col items-center">
                <div className="bg-slate-800 text-white text-sm font-black px-4 py-2 rounded-xl shadow-lg mb-3 relative drop-shadow-md border border-slate-700">
                  Customer
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-slate-800 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                  <MapPin size={22} className="text-white" />
                </div>
              </div>

              {/* Mock Route Highlight */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 4px 6px rgba(59,130,246,0.3))' }}>
                <path d="M 30% 70% Q 55% 45% 80% 20%" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" className="opacity-60" />
                {/* Route dashed line inside */}
                <path d="M 30% 70% Q 55% 45% 80% 20%" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 10" className="opacity-80" />
              </svg>
            </>
          )}
        </div>

        {/* Dashboard Bottom Bar */}
        <div className="p-8 bg-slate-50 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center border-2 border-primary-200 shadow-sm">
                <ShieldCheck size={28} className="text-primary-600" />
              </div>
              <div>
                <h4 className="text-slate-900 font-extrabold text-lg">Privacy Protected</h4>
                <p className="text-sm font-medium text-slate-500 mt-1">Tracking ends automatically on arrival</p>
              </div>
            </div>
            
            {isSharing && (
              <Button variant="danger" className="h-12 px-6 font-bold shadow-lg shadow-red-500/20" onClick={toggleLocationSharing} isLoading={isLoading}>
                Stop Sharing
              </Button>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
