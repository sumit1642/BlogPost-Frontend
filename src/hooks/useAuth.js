// src/hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../stores/authStore"
import { apiClient } from "../api/client"
import { useNavigate } from "react-router-dom"

export function useAuth() {
	const {
		user,
		isAuthenticated,
		setUser,
		logout: logoutStore,
		checkAuth,
		isLoading,
		setLoading,
	} = useAuthStore()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const loginMutation = useMutation({
		mutationFn: apiClient.login.bind(apiClient),
		onMutate: () => setLoading(true),
		onSuccess: (data) => {
			setUser(data.data.user)
			queryClient.invalidateQueries()
			navigate("/")
		},
		onError: () => setLoading(false),
		onSettled: () => setLoading(false),
	})

	const registerMutation = useMutation({
		mutationFn: apiClient.register.bind(apiClient),
		onMutate: () => setLoading(true),
		onSuccess: () => {
			navigate("/login")
		},
		onError: () => setLoading(false),
		onSettled: () => setLoading(false),
	})

	const logoutMutation = useMutation({
		mutationFn: apiClient.logout.bind(apiClient),
		onSuccess: () => {
			logoutStore()
			queryClient.clear()
			navigate("/")
		},
	})

	const refreshMutation = useMutation({
		mutationFn: apiClient.refreshToken.bind(apiClient),
		onSuccess: (data) => {
			setUser(data.data.user)
			queryClient.invalidateQueries()
		},
		onError: () => {
			logoutStore()
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
		isLoading,
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout: logoutMutation.mutate,
		refreshToken: refreshMutation.mutate,
		isLoginLoading: loginMutation.isPending,
		isRegisterLoading: registerMutation.isPending,
		isRefreshing: refreshMutation.isPending,
		loginError: loginMutation.error?.message,
		registerError: registerMutation.error?.message,
		authData,
	}
}
