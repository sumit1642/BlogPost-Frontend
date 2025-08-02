/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../stores/authStore"
import { apiClient } from "../api/client"
import { useNavigate } from "react-router-dom"

export function useAuth() {
	const { user, isAuthenticated, setUser, logout: logoutStore, checkAuth } = useAuthStore()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const loginMutation = useMutation({
		mutationFn: apiClient.login.bind(apiClient),
		onSuccess: (data) => {
			setUser(data.data.user)
			queryClient.invalidateQueries()
			navigate("/")
		},
	})

	const registerMutation = useMutation({
		mutationFn: apiClient.register.bind(apiClient),
		onSuccess: () => {
			navigate("/login")
		},
	})

	const logoutMutation = useMutation({
		mutationFn: apiClient.logout.bind(apiClient),
		onSuccess: () => {
			logoutStore()
			queryClient.clear()
			navigate("/")
		},
	})

	const { data: authData, isLoading: isCheckingAuth } = useQuery({
		queryKey: ["auth"],
		queryFn: checkAuth,
		retry: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})

	return {
		user,
		isAuthenticated,
		isCheckingAuth,
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout: logoutMutation.mutate,
		isLoginLoading: loginMutation.isPending,
		isRegisterLoading: registerMutation.isPending,
		loginError: loginMutation.error?.message,
		registerError: registerMutation.error?.message,
	}
}
