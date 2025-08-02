import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usePostStore } from "../stores/postStore"
import { apiClient } from "../api/client"

export function usePosts(published = true) {
	const { posts, setPosts } = usePostStore()
	const queryClient = useQueryClient()

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["posts", published],
		queryFn: () => apiClient.getPosts(published),
		onSuccess: (data) => {
			setPosts(data.data.posts)
		},
	})

	const createPostMutation = useMutation({
		mutationFn: apiClient.createPost.bind(apiClient),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
		},
	})

	const updatePostMutation = useMutation({
		mutationFn: ({ postId, postData }) => apiClient.updatePost(postId, postData),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
		},
	})

	const deletePostMutation = useMutation({
		mutationFn: apiClient.deletePost.bind(apiClient),
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
		},
	})

	return {
		posts: data?.data?.posts || [],
		isLoading,
		error: error?.message,
		refetch,
		createPost: createPostMutation.mutate,
		updatePost: updatePostMutation.mutate,
		deletePost: deletePostMutation.mutate,
		isCreating: createPostMutation.isPending,
		isUpdating: updatePostMutation.isPending,
		isDeleting: deletePostMutation.isPending,
	}
}
