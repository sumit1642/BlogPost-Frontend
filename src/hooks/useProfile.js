import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api/client"

export function useProfile() {
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery({
		queryKey: ["profile"],
		queryFn: apiClient.getProfile.bind(apiClient),
	})

	const updateProfileMutation = useMutation({
		mutationFn: apiClient.updateProfile.bind(apiClient),
		onSuccess: () => {
			queryClient.invalidateQueries(["profile"])
		},
	})

	return {
		profile: data?.data?.profile,
		isLoading,
		error: error?.message,
		updateProfile: updateProfileMutation.mutate,
		isUpdating: updateProfileMutation.isPending,
		updateError: updateProfileMutation.error?.message,
	}
}
