import { simulateNetworkDelay } from "./utils"
import { MOCK_PROVIDERS, MOCK_BOOKINGS, PROVIDER_INBOX } from "../data/mockData"

// API Service for backend communication
const api = {
  // Authentication
  register: async (userData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  getProviders: async () => {
    await simulateNetworkDelay(800)
    return { data: MOCK_PROVIDERS || [] }
  },

  getProviderById: async (id) => {
    await simulateNetworkDelay(600)
    const provider = MOCK_PROVIDERS.find(p => p.id === id)
    if (!provider) {
      throw new Error("Provider not found")
    }
    return { data: provider }
  },

  getCustomerBookings: async () => {
    await simulateNetworkDelay(1000)
    return { data: MOCK_BOOKINGS || [] }
  },

  getProviderInbox: async () => {
    await simulateNetworkDelay(700)
    return { data: PROVIDER_INBOX || [] }
  },

  getProviderJobs: async () => {
    await simulateNetworkDelay(900)
    return { data: [] }
  },
  
  getProviderStats: async () => {
    await simulateNetworkDelay(500)
    return { 
      data: {
        totalEarnings: 8200,
        completedJobs: 12,
        rating: 4.8,
        activeServices: ["Plumbing", "Maintenance"]
      }
    }
  }
}

export default api
