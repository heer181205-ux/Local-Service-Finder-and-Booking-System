import { createContext, useContext, useState, useEffect } from "react"

const RoleContext = createContext()

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("app-role") || null
  })

  useEffect(() => {
    localStorage.setItem("app-role", role)
  }, [role])

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext)
