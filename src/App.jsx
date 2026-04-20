import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { RoleProvider, useRole } from "./contexts/RoleContext"
import { ToastProvider } from "./components/ui"
import { Layout } from "./components/layout/Layout"

// Auth
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"

// Home
import { Home } from "./pages/Home"

// Customer
import { CustomerHome } from "./pages/customer/CustomerHome"
import { ProviderProfile } from "./pages/customer/ProviderProfile"
import { CustomerDashboard } from "./pages/customer/CustomerDashboard"

// Provider
import { ProviderDashboard } from "./pages/provider/ProviderDashboard"
import { BookingManager } from "./pages/provider/BookingManager"
import { LiveTracking } from "./pages/provider/LiveTracking"

function PrivateRoute({ children, allowedRole }) {
  const { role } = useRole()
  
  if (!role) {
    return <Navigate to="/auth/login" replace />
  }
  
  if (allowedRole && role !== allowedRole) {
    if (role === "provider") return <Navigate to="/provider/dashboard" replace />
    return <Navigate to="/" replace />
  }
  return children
}

function AppContent() {
  const { role } = useRole()
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname.startsWith('/auth') ? '/auth' : location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        <Route element={<Layout />}>
          {/* Customer Routes */}
          <Route path="/home" element={<PrivateRoute allowedRole="customer"><CustomerHome /></PrivateRoute>} />
          <Route path="/provider-profile/:id" element={<PrivateRoute allowedRole="customer"><ProviderProfile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute allowedRole="customer"><CustomerDashboard /></PrivateRoute>} />

          {/* Provider Routes */}
          <Route path="/provider/dashboard" element={<PrivateRoute allowedRole="provider"><ProviderDashboard /></PrivateRoute>} />
          <Route path="/provider/bookings" element={<PrivateRoute allowedRole="provider"><BookingManager /></PrivateRoute>} />
          <Route path="/provider/tracking" element={<PrivateRoute allowedRole="provider"><LiveTracking /></PrivateRoute>} />
        </Route>
        
        <Route path="*" element={<Navigate to={!role ? "/" : role === "provider" ? "/provider/dashboard" : "/home"} replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </RoleProvider>
    </BrowserRouter>
  )
}

export default App
