// src/stores/authStore.js - Zustand auth store
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			setUser: (user) =>
				set({
					user,
					isAuthenticated: !!user,
					error: null,
				}),

			setLoading: (isLoading) => set({ isLoading }),

			setError: (error) => set({ error }),

			clearError: () => set({ error: null }),

			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					error: null,
					isLoading: false,
				}),

			updateUser: (userData) => {
				const { user } = get()
				if (user) {
					set({ user: { ...user, ...userData } })
				}
			},

			checkAuth: async () => {
				set({ isLoading: true, error: null })

				try {
					const response = await fetch("http://localhost:3000/api/auth/refresh", {
						method: "POST",
						credentials: "include",
					})

					if (response.ok) {
						const data = await response.json()
						if (data.status === "success") {
							set({
								user: data.data.user,
								isAuthenticated: true,
								isLoading: false,
								error: null,
							})
							return data.data.user
						}
					}

					// If refresh fails, clear auth state
					set({
						user: null,
						isAuthenticated: false,
						isLoading: false,
						error: null,
					})
					return null
				} catch (error) {
					set({
						user: null,
						isAuthenticated: false,
						isLoading: false,
						error: error.message,
					})
					return null
				}
			},

			// Initialize auth state on app load
			initializeAuth: async () => {
				const { checkAuth } = get()
				return await checkAuth()
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
)
