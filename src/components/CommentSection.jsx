import React, { useState } from "react"
import {
	Box,
	Typography,
	TextField,
	Button,
	Card,
	CardContent,
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Divider,
	Alert,
} from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { useComments } from "../hooks/useComments"
import { useAuth } from "../hooks/useAuth"

export function CommentSection({ postId }) {
	const { user, isAuthenticated } = useAuth()
	const { comments, addComment, updateComment, deleteComment, isAdding } = useComments(postId)
	const [newComment, setNewComment] = useState("")
	const [editingComment, setEditingComment] = useState(null)
	const [editContent, setEditContent] = useState("")
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedComment, setSelectedComment] = useState(null)

	const handleSubmitComment = async (e) => {
		e.preventDefault()
		if (!newComment.trim()) return

		try {
			await addComment(newComment.trim())
			setNewComment("")
		} catch (error) {
			console.error("Failed to add comment:", error)
		}
	}

	const handleEditComment = async () => {
		if (!editContent.trim()) return

		try {
			await updateComment({ commentId: editingComment, content: editContent.trim() })
			setEditingComment(null)
			setEditContent("")
		} catch (error) {
			console.error("Failed to update comment:", error)
		}
	}

	const handleDeleteComment = async (commentId) => {
		try {
			await deleteComment(commentId)
			setAnchorEl(null)
			setSelectedComment(null)
		} catch (error) {
			console.error("Failed to delete comment:", error)
		}
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	return (
		<Box>
			<Typography
				variant="h6"
				gutterBottom>
				Comments ({comments.length})
			</Typography>

			{isAuthenticated && (
				<Box
					component="form"
					onSubmit={handleSubmitComment}
					sx={{ mb: 3 }}>
					<TextField
						fullWidth
						multiline
						rows={3}
						placeholder="Write a comment..."
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<Button
						type="submit"
						variant="contained"
						disabled={!newComment.trim() || isAdding}>
						{isAdding ? "Adding..." : "Add Comment"}
					</Button>
				</Box>
			)}

			{!isAuthenticated && (
				<Alert
					severity="info"
					sx={{ mb: 3 }}>
					Please log in to add comments.
				</Alert>
			)}

			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				{comments.map((comment) => (
					<Card
						key={comment.id}
						variant="outlined">
						<CardContent>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="flex-start">
								<Box
									display="flex"
									alignItems="center"
									gap={1}
									mb={1}>
									<Avatar sx={{ width: 24, height: 24, fontSize: "0.8rem" }}>
										{comment.author?.name?.charAt(0) || "A"}
									</Avatar>
									<Typography
										variant="body2"
										fontWeight={500}>
										{comment.author?.name || "Anonymous"}
									</Typography>
									<Typography
										variant="caption"
										color="text.secondary">
										{formatDate(comment.createdAt)}
									</Typography>
								</Box>

								{isAuthenticated && user?.id === comment.author?.id && (
									<IconButton
										size="small"
										onClick={(e) => {
											setAnchorEl(e.currentTarget)
											setSelectedComment(comment)
										}}>
										<MoreVert fontSize="small" />
									</IconButton>
								)}
							</Box>

							{editingComment === comment.id ? (
								<Box>
									<TextField
										fullWidth
										multiline
										rows={2}
										value={editContent}
										onChange={(e) => setEditContent(e.target.value)}
										sx={{ mb: 1 }}
									/>
									<Box
										display="flex"
										gap={1}>
										<Button
											size="small"
											onClick={handleEditComment}>
											Save
										</Button>
										<Button
											size="small"
											onClick={() => {
												setEditingComment(null)
												setEditContent("")
											}}>
											Cancel
										</Button>
									</Box>
								</Box>
							) : (
								<Typography variant="body2">{comment.content}</Typography>
							)}
						</CardContent>
					</Card>
				))}
			</Box>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => {
					setAnchorEl(null)
					setSelectedComment(null)
				}}>
				<MenuItem
					onClick={() => {
						setEditingComment(selectedComment.id)
						setEditContent(selectedComment.content)
						setAnchorEl(null)
					}}>
					Edit
				</MenuItem>
				<MenuItem
					onClick={() => handleDeleteComment(selectedComment.id)}
					sx={{ color: "error.main" }}>
					Delete
				</MenuItem>
			</Menu>
		</Box>
	)
}
