import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Grid, Star, Filter, ChevronRight, Wrench, LogIn, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import { GlassCard, Button, Input, Badge, Skeleton, useToast } from "../components/ui"
import { DEPARTMENTS, MOCK_PROVIDERS, AREAS } from "../data/mockData"

export function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const { addToast } = useToast()

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      addToast({ title: "Search Required", description: "Please enter a service to search for.", type: "warning" })
      return
    }

    setIsSearching(true)
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Filter providers based on search
    let filtered = MOCK_PROVIDERS.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           provider.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           provider.services.some(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = !selectedCategory || provider.category === selectedCategory
      const matchesArea = !selectedArea || provider.area.includes(selectedArea.split(',')[0])
      
      return matchesSearch && matchesCategory && matchesArea
    })
    
    setSearchResults(filtered)
    setIsSearching(false)
    
    addToast({ 
      title: "Search Complete", 
      description: `Found ${filtered.length} service providers`, 
      type: "success" 
    })
  }

  // Featured providers (show top rated)
  const featuredProviders = MOCK_PROVIDERS
    .filter(provider => provider.isOnline)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <>
      {/* Dashboard Background */}
      <div className="dashboard-bg"></div>
      <div className="dashboard-overlay"></div>
      
      <div className="dashboard-container min-h-screen">
        {/* Top Navigation with Auth Buttons */}
        <header className="relative z-10 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">LocalServe</h1>
                <span className="ml-2 text-sm text-slate-500">Find trusted services</span>
              </div>
              
              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link to="/auth/login">
                  <Button variant="outline" className="flex items-center gap-2 border-primary-500 text-primary-600 hover:bg-primary-50">
                    <LogIn size={16} />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white">
                    <UserPlus size={16} />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-extrabold text-primary-600 mb-4 tracking-tight">
              Find Trusted Local Services
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Search for services like 'plumbing', 'cleaning', 'electrical'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="text-lg h-14 pr-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500/20"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                </div>
                <Button 
                  onClick={handleSearch}
                  isLoading={isSearching}
                  className="h-14 px-8 text-lg font-semibold bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="glass-button"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
              
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-3 flex-wrap"
                >
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg bg-white/90 backdrop-blur-sm"
                  >
                    <option value="">All Categories</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  
                  {/* Area Filter */}
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg bg-white/90 backdrop-blur-sm"
                  >
                    <option value="">All Areas</option>
                    {AREAS.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Search Results</h2>
                  <Badge variant="outline" className="text-sm">
                    {searchResults.length} providers found
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard interactive={false} className="p-6 hover:border-primary-200 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                              {provider.name}
                            </h3>
                            <p className="text-sm text-slate-500">{provider.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-amber-500 mb-1">
                              <Star size={14} fill="currentColor" />
                              <span className="text-sm font-semibold">{provider.rating}</span>
                            </div>
                            <p className="text-xs text-slate-500">{provider.reviews} reviews</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{provider.about}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{provider.area}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wrench size={14} />
                            <span>₹{provider.hourlyRate}/hr</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {provider.services.slice(0, 3).map((service, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full border border-white"
                              >
                                {service.name.split(' ').slice(0, 2).join(' ')}
                              </span>
                            ))}
                          </div>
                          {provider.isOnline && (
                            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                              Available
                            </Badge>
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Featured Services</h2>
              <Link 
                to="/auth/register"
                className="flex items-center text-primary-600 hover:text-primary-500 font-semibold transition-colors"
              >
                View all
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard interactive={false} className="p-6 hover:border-primary-200 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-slate-500">{provider.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500 mb-1">
                          <Star size={14} fill="currentColor" />
                          <span className="text-sm font-semibold">{provider.rating}</span>
                        </div>
                        <p className="text-xs text-slate-500">{provider.reviews} reviews</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{provider.about}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{provider.area}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wrench size={14} />
                        <span>₹{provider.hourlyRate}/hr</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {provider.services.slice(0, 3).map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full border border-white"
                          >
                            {service.name.split(' ').slice(0, 2).join(' ')}
                          </span>
                        ))}
                      </div>
                      {provider.isOnline && (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                          Available
                        </Badge>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {DEPARTMENTS.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSearchQuery(category)
                    handleSearch()
                  }}
                  className="cursor-pointer"
                >
                  <GlassCard interactive={false} className="p-6 text-center hover:border-primary-200 transition-all group">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                      <Wrench size={20} className="text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {category}
                    </h3>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center py-12"
          >
            <GlassCard className="p-8 max-w-2xl mx-auto glass-panel">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Join thousands of customers finding trusted service providers every day
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/auth/register">
                  <Button size="lg" className="px-8 bg-primary-500 hover:bg-primary-600 text-white">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button variant="outline" size="lg" className="px-8 border-primary-500 text-primary-600 hover:bg-primary-50">
                    Sign In
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  )
}
