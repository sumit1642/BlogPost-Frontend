// src/hooks/usePosts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usePostStore } from "../stores/postStore"
import { apiClient } from "../api/client"
import { useAuth } from "./useAuth"

export function usePosts(published = true) {
	const { posts, setPosts } = usePostStore()
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["posts", published],
		queryFn: () => {
			if (published === false && user) {
				// For drafts/unpublished, get user's own posts
				return apiClient.getMyPosts()
			}
			return apiClient.getPosts(published)
		},
		onSuccess: (data) => {
			setPosts(data.data.posts)
		},
	})

	const createPostMutation = useMutation({
		mutationFn: apiClient.createPost.bind(apiClient),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["profile"])
		},
	})

	const updatePostMutation = useMutation({
		mutationFn: ({ postId, postData }) => apiClient.updatePost(postId, postData),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["post"])
			queryClient.invalidateQueries(["tags"])
		},
	})

	const deletePostMutation = useMutation({
		mutationFn: apiClient.deletePost.bind(apiClient),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
			queryClient.invalidateQueries(["tags"])
		},
	})

	// Query for user's specific posts
	const { data: userPostsData, isLoading: isLoadingUserPosts } = useQuery({
		queryKey: ["userPosts", user?.id],
		queryFn: () => apiClient.getUserPosts(user.id),
		enabled: !!user?.id,
	})

	return {
		posts: data?.data?.posts || posts,
		userPosts: userPostsData?.data?.posts || [],
		isLoading,
		isLoadingUserPosts,
		error: error?.message,
		refetch,
		createPost: createPostMutation.mutate,
		updatePost: updatePostMutation.mutate,
		deletePost: deletePostMutation.mutate,
		isCreating: createPostMutation.isPending,
		isUpdating: updatePostMutation.isPending,
		isDeleting: deletePostMutation.isPending,
		createError: createPostMutation.error?.message,
		updateError: updatePostMutation.error?.message,
		deleteError: deletePostMutation.error?.message,
	}
}
