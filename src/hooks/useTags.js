// src/hooks/useTags.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usePostStore } from "../stores/postStore"
import { useAuth } from "./useAuth"
import { apiClient } from "../api/client"

export function useTags() {
	const { tags, setTags, userLikedTags, setUserLikedTags } = usePostStore()
	const { isAuthenticated, user } = useAuth()
	const queryClient = useQueryClient()

	const {
		data: tagsData,
		isLoading: isLoadingTags,
		error: tagsError,
	} = useQuery({
		queryKey: ["tags"],
		queryFn: apiClient.getTags.bind(apiClient),
		onSuccess: (data) => {
			setTags(data.data.tags)
		},
	})

	const {
		data: likedTagsData,
		isLoading: isLoadingLikedTags,
		error: likedTagsError,
	} = useQuery({
		queryKey: ["userLikedTags"],
		queryFn: apiClient.getUserLikedTags.bind(apiClient),
		enabled: isAuthenticated && !!user,
		onSuccess: (data) => {
			setUserLikedTags(data.data.tags)
		},
	})

	const addTagMutation = useMutation({
		mutationFn: ({ postId, tagName }) => apiClient.addTagToPost(postId, tagName),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["post"])
			queryClient.invalidateQueries(["tags"])
			queryClient.invalidateQueries(["userLikedTags"])
		},
	})

	const removeTagMutation = useMutation({
		mutationFn: ({ postId, tagId }) => apiClient.removeTagFromPost(postId, tagId),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["post"])
			queryClient.invalidateQueries(["tags"])
			queryClient.invalidateQueries(["userLikedTags"])
		},
	})

	return {
		tags: tagsData?.data?.tags || tags,
		userLikedTags: likedTagsData?.data?.tags || userLikedTags,
		isLoadingTags,
		isLoadingLikedTags,
		tagsError: tagsError?.message,
		likedTagsError: likedTagsError?.message,
		addTag: addTagMutation.mutate,
		removeTag: removeTagMutation.mutate,
		isAddingTag: addTagMutation.isPending,
		isRemovingTag: removeTagMutation.isPending,
		addTagError: addTagMutation.error?.message,
		removeTagError: removeTagMutation.error?.message,
	}
}
