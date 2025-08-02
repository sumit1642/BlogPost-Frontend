import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usePostStore } from "../stores/postStore"
import { apiClient } from "../api/client"

export function useTags() {
	const { tags, setTags, userLikedTags, setUserLikedTags } = usePostStore()
	const queryClient = useQueryClient()

	const { data: tagsData, isLoading: isLoadingTags } = useQuery({
		queryKey: ["tags"],
		queryFn: apiClient.getTags.bind(apiClient),
		onSuccess: (data) => {
			setTags(data.data.tags)
		},
	})

	const { data: likedTagsData, isLoading: isLoadingLikedTags } = useQuery({
		queryKey: ["userLikedTags"],
		queryFn: apiClient.getUserLikedTags.bind(apiClient),
		onSuccess: (data) => {
			setUserLikedTags(data.data.tags)
		},
	})

	const addTagMutation = useMutation({
		mutationFn: ({ postId, tagName }) => apiClient.addTagToPost(postId, tagName),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["tags"])
		},
	})

	const removeTagMutation = useMutation({
		mutationFn: ({ postId, tagId }) => apiClient.removeTagFromPost(postId, tagId),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["tags"])
		},
	})

	return {
		tags: tagsData?.data?.tags || [],
		userLikedTags: likedTagsData?.data?.tags || [],
		isLoadingTags,
		isLoadingLikedTags,
		addTag: addTagMutation.mutate,
		removeTag: removeTagMutation.mutate,
		isAddingTag: addTagMutation.isPending,
		isRemovingTag: removeTagMutation.isPending,
	}
}
