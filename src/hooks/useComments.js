// src/hooks/useComments.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usePostStore } from "../stores/postStore"
import { apiClient } from "../api/client"

export function useComments(postId) {
	const { comments, setComments, addComment, updateComment, removeComment } = usePostStore()
	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery({
		queryKey: ["comments", postId],
		queryFn: () => apiClient.getComments(postId),
		enabled: !!postId,
		onSuccess: (data) => {
			setComments(data.data.comments)
		},
	})

	const addCommentMutation = useMutation({
		mutationFn: (content) => apiClient.addComment(postId, content),
		onSuccess: (data) => {
			addComment(data.data.comment)
			queryClient.invalidateQueries(["post", postId])
			queryClient.invalidateQueries(["posts"])
		},
	})

	const updateCommentMutation = useMutation({
		mutationFn: ({ commentId, content }) => apiClient.updateComment(commentId, content),
		onSuccess: (data) => {
			updateComment(data.data.comment.id, data.data.comment)
		},
	})

	const deleteCommentMutation = useMutation({
		mutationFn: (commentId) => apiClient.deleteComment(commentId),
		onSuccess: (_, commentId) => {
			removeComment(commentId)
			queryClient.invalidateQueries(["post", postId])
			queryClient.invalidateQueries(["posts"])
		},
	})

	return {
		comments: data?.data?.comments || comments,
		isLoading,
		error: error?.message,
		addComment: addCommentMutation.mutate,
		updateComment: updateCommentMutation.mutate,
		deleteComment: deleteCommentMutation.mutate,
		isAdding: addCommentMutation.isPending,
		isUpdating: updateCommentMutation.isPending,
		isDeleting: deleteCommentMutation.isPending,
		addError: addCommentMutation.error?.message,
		updateError: updateCommentMutation.error?.message,
		deleteError: deleteCommentMutation.error?.message,
	}
}
