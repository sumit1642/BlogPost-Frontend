// src/hooks/usePost.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usePostStore } from "../stores/postStore"
import { apiClient } from "../api/client"

export function usePost(postId) {
	const { currentPost, setCurrentPost, updatePostLike } = usePostStore()
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery({
		queryKey: ["post", postId],
		queryFn: () => apiClient.getPost(postId),
		enabled: !!postId,
		onSuccess: (data) => {
			setCurrentPost(data.data.post)
		},
	})

	const toggleLikeMutation = useMutation({
		mutationFn: () => apiClient.toggleLike(postId),
		onSuccess: (data) => {
			updatePostLike(postId, data.data.isLiked, data.data.likeCount)
			queryClient.invalidateQueries(["post", postId])
			queryClient.invalidateQueries(["posts"])
		},
	})

	return {
		post: data?.data?.post || currentPost,
		isLoading,
		error: error?.message,
		toggleLike: toggleLikeMutation.mutate,
		isToggling: toggleLikeMutation.isPending,
		toggleError: toggleLikeMutation.error?.message,
	}
}
