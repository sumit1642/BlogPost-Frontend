/* eslint-disable no-unused-vars */
// src/stores/authStore.js - Zustand auth store
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      checkAuth: async () => {
        try {
          const response = await fetch('http://localhost:3000/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.status === 'success') {
              set({ user: data.data.user, isAuthenticated: true })
              return data.data.user
            }
          }
          
          set({ user: null, isAuthenticated: false })
          return null
        } catch (error) {
          set({ user: null, isAuthenticated: false })
          return null
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)
