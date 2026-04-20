import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Grid, Star, Filter, ChevronRight, Wrench } from "lucide-react"
import { Link } from "react-router-dom"
import { GlassCard, Button, Input, Badge, Skeleton, useToast } from "../../components/ui"
import { DEPARTMENTS } from "../../data/mockData"
import api from "../../lib/api"

const SIMULATED_SEARCH_RESULTS = [
  {
    id: "sim-1",
    name: "Elite Cleaners",
    category: "Cleaning",
    hourlyRate: 350,
    area: "Downtown",
    pincode: "10001",
    about: "Professional deep cleaning services for homes and offices.",
    rating: 4.8,
    reviews: 124,
    isOnline: true,
    avatar: "E",
    services: [{ id: "c1", name: "Deep Cleaning" }]
  },
  {
    id: "sim-2",
    name: "QuickFix Plumbing",
    category: "Plumbing",
    hourlyRate: 650,
    area: "Mumbai",
    pincode: "400001",
    about: "Emergency plumbing and maintenance at affordable rates.",
    rating: 4.9,
    reviews: 89,
    isOnline: true,
    avatar: "Q",
    services: [{ id: "p1", name: "Pipe Leak Repair" }]
  },
  {
    id: "sim-3",
    name: "Spark Electricians",
    category: "Electrical",
    hourlyRate: 500,
    area: "Bandra",
    pincode: "400050",
    about: "Certified electricians for all your wiring needs.",
    rating: 4.7,
    reviews: 56,
    isOnline: false,
    avatar: "S",
    services: [{ id: "e1", name: "Wiring Installation" }]
  }
]

export function CustomerHome() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [pincode, setPincode] = useState("")
  const [isFetchingLocation, setIsFetchingLocation] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const { addToast } = useToast()

  const [providers, setProviders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true)
        const response = await api.getProviders()
        setProviders(response.data)
      } catch (error) {
        console.error("Failed to fetch providers:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProviders()
  }, [])

  const handleLocationBlur = async () => {
    if (!locationQuery || pincode) return
    setIsFetchingLocation(true)
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(locationQuery)}&limit=1`)
      const data = await res.json()
      if (data && data.length > 0 && data[0].address && data[0].address.postcode) {
        setPincode(data[0].address.postcode)
        addToast({ title: "Pincode Auto-filled", description: `Found pincode ${data[0].address.postcode} for ${locationQuery}`, type: "success" })
      }
    } catch (err) {
      console.error("Geocoding failed", err)
    } finally {
      setIsFetchingLocation(false)
    }
  }

  const handleSearch = () => {
    setIsLoading(true)
    // Simulate network delay for searching
    setTimeout(() => {
      let results = [...SIMULATED_SEARCH_RESULTS]
      
      if (locationQuery) {
        results = results.filter(p => p.area.toLowerCase().includes(locationQuery.toLowerCase()))
      }
      if (pincode) {
        results = results.filter(p => p.pincode.startsWith(pincode))
      }
      if (searchTerm) {
        results = results.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      setProviders(results)
      setIsLoading(false)

      if (results.length > 0) {
        addToast({ title: "Providers Found", description: `Found ${results.length} professionals nearby.`, type: "success" })
      } else {
        addToast({ title: "No Results", description: "No providers matched your location and service.", type: "info" })
      }
    }, 800)
  }

  const filteredProviders = providers.filter((provider) => {
    return selectedCategory ? provider.category === selectedCategory : true
  })

  return (
    <div className="space-y-12 pb-12 relative">


      {/* Hero Section */}
      <section className="relative pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <Badge variant="outline" className="mb-4 bg-white shadow-sm border-slate-200 text-slate-700">
            <span className="flex items-center gap-1">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Over 200+ providers online now
            </span>
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight drop-shadow-sm">
            Find the perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">Local Service</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Book trusted professionals for your home repairs, cleaning, and more. Easy, fast, and reliable.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 max-w-4xl mx-auto relative z-20"
        >
          <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-[0_20px_50px_rgba(59,130,246,0.08)] border border-slate-200">
            <div className="flex flex-col md:flex-row gap-3">
              <Input 
                placeholder="Service (e.g. Cleaning)" 
                icon={Search} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 w-full md:w-[35%] !bg-slate-50 !border-slate-100"
              />
              <Input 
                placeholder="Area / City" 
                icon={MapPin} 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onBlur={handleLocationBlur}
                className="h-14 w-full md:w-[25%] !bg-slate-50 !border-slate-100"
              />
              <div className="relative w-full md:w-[20%]">
                <Input 
                  placeholder="Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="h-14 !bg-slate-50 !border-slate-100"
                />
                {isFetchingLocation && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
              <Button size="lg" className="h-14 w-full md:flex-1 min-w-[120px] rounded-2xl shadow-lg shadow-primary-500/20" onClick={handleSearch} isLoading={isLoading}>
                {!isLoading && <>Search <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>}
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Grid className="text-primary-500" /> Browse Categories
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("")}
            className={`px-6 py-2.5 rounded-2xl font-semibold transition-all shadow-sm ${
              selectedCategory === "" 
                ? "bg-primary-600 border-transparent text-white shadow-lg shadow-primary-500/30" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 border"
            }`}
          >
            All
          </motion.button>
          {DEPARTMENTS.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl font-semibold transition-all shadow-sm flex items-center gap-2 ${
                selectedCategory === cat 
                  ? "bg-primary-600 border-transparent text-white shadow-lg shadow-primary-500/30" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 border"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Service Providers List */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Wrench className="text-indigo-500" /> Recommended Providers
          </h2>
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl bg-white">
            <Filter size={16} className="mr-2" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={`skeleton-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <GlassCard className="h-full flex flex-col pointer-events-none p-6 bg-white">
                    <div className="flex gap-4 items-start mb-4">
                      <Skeleton className="w-16 h-16 rounded-2xl bg-slate-100" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-5 w-3/4 bg-slate-100" />
                        <div className="flex gap-2">
                          <Skeleton className="h-4 w-16 bg-slate-100" />
                          <Skeleton className="h-4 w-20 bg-slate-100" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full mb-4 bg-slate-100" />
                    <div className="flex justify-between mt-auto border-t border-slate-100 pt-4">
                      <Skeleton className="h-5 w-16 bg-slate-100" />
                      <Skeleton className="h-5 w-20 bg-slate-100" />
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((provider, i) => (
                <motion.div
                  key={provider.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link to={`/provider-profile/${provider.id}`}>
                    <GlassCard className="h-full flex flex-col group p-6 bg-white hover:border-primary-200">
                      <div className="flex gap-4 items-start mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center text-2xl font-extrabold text-primary-700 border border-indigo-100 group-hover:scale-110 transition-transform shadow-inner relative">
                          {provider.avatar}
                          {provider.isOnline && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors">
                            {provider.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 font-semibold">{provider.category}</Badge>
                            <span className="text-sm text-slate-500 flex items-center font-medium">
                              <MapPin size={14} className="mr-1 text-slate-400" /> {provider.area}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-2 mb-6 flex-1 leading-relaxed">
                        {provider.about}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                          <Star size={16} className="text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-amber-700">{provider.rating}</span>
                          <span className="text-xs font-semibold text-amber-600/70">({provider.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-900 text-xl font-black">₹{provider.hourlyRate}</span>
                          <span className="text-slate-500 font-medium">/hr</span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm"
              >
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                  className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100 relative"
                >
                  <Wrench className="text-primary-400" size={40} />
                </motion.div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">No Services Available</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                  {providers.length === 0 
                    ? "We're currently expanding our network. New service providers will be joining our platform soon!"
                    : "We couldn't find any professionals matching your exact filters. Try adjusting your search."}
                </p>
                {providers.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white rounded-xl font-bold"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("")
                      setLocationQuery("")
                      setPincode("")
                      setProviders([])
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
