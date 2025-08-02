/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// src/components/posts/PostDetail.jsx
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
	Container,
	Typography,
	Box,
	Chip,
	Avatar,
	IconButton,
	Divider,
	Paper,
	TextField,
	Button,
	CircularProgress,
	Alert,
	Menu,
	MenuItem,
} from "@mui/material"
import {
	FavoriteOutlined,
	ChatBubbleOutline,
	Favorite,
	MoreVert,
	Edit,
	Delete,
	Send,
} from "@mui/icons-material"

export const PostDetail = () => {
	const [post, setPost] = useState(null)
	const [comments, setComments] = useState([])
	const [newComment, setNewComment] = useState("")
	const [loading, setLoading] = useState(true)
	const [commentLoading, setCommentLoading] = useState(false)
	const [error, setError] = useState("")
	const [anchorEl, setAnchorEl] = useState(null)
	const { postId } = useParams()
	const navigate = useNavigate()

	// Mock current user
	const currentUserId = 1
	const currentUser = { id: 1, name: "Current User" }

	// Mock post data
	const mockPost = {
		id: 1,
		title: "Getting Started with React",
		content:
			"React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals of React and how to get started with your first component. React components are the building blocks of any React application, and understanding how they work is essential for becoming proficient in React development.",
		published: true,
		createdAt: "2024-01-15T10:30:00.000Z",
		updatedAt: "2024-01-15T10:30:00.000Z",
		author: {
			id: 1,
			name: "Alice Johnson",
			email: "alice@example.com",
		},
		commentsCount: 3,
		likesCount: 23,
		isLikedByUser: true,
		tags: [
			{ id: 1, name: "react" },
			{ id: 2, name: "javascript" },
			{ id: 3, name: "tutorial" },
		],
	}

	// Mock comments data
	const mockComments = [
		{
			id: 1,
			content: "Great introduction to React! This really helped me understand the basics.",
			createdAt: "2024-01-15T12:00:00.000Z",
			author: {
				id: 2,
				name: "Bob Smith",
			},
		},
		{
			id: 2,
			content: "Thanks for sharing this. Looking forward to more React tutorials!",
			createdAt: "2024-01-15T14:30:00.000Z",
			author: {
				id: 3,
				name: "Carol Davis",
			},
		},
		{
			id: 3,
			content: "Very helpful tutorial. The examples are clear and easy to follow.",
			createdAt: "2024-01-16T09:15:00.000Z",
			author: {
				id: 4,
				name: "David Wilson",
			},
		},
	]

	useEffect(() => {
		// Simulate API calls
		setTimeout(() => {
			setPost(mockPost)
			setComments(mockComments)
			setLoading(false)
		}, 1000)

		// Future API calls will be:
		// const fetchPost = async () => {
		//   try {
		//     const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
		//       credentials: "include",
		//     })
		//     const data = await response.json()
		//     if (data.status === "success") {
		//       setPost(data.data.post)
		//       setComments(data.data.post.comments || [])
		//     } else {
		//       setError(data.message)
		//     }
		//   } catch (error) {
		//     setError("Failed to fetch post")
		//   } finally {
		//     setLoading(false)
		//   }
		// }
		// fetchPost()
	}, [postId])

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	const handleLike = () => {
		// Will add API call later
		setPost((prevPost) => ({
			...prevPost,
			isLikedByUser: !prevPost.isLikedByUser,
			likesCount: prevPost.isLikedByUser ? prevPost.likesCount - 1 : prevPost.likesCount + 1,
		}))
	}

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleEdit = () => {
		navigate(`/edit-post/${postId}`)
		handleMenuClose()
	}

	const handleDelete = () => {
		// Will add delete confirmation dialog later
		console.log("Delete post:", postId)
		handleMenuClose()
		navigate("/my-posts")
	}

	const handleCommentSubmit = (e) => {
		e.preventDefault()
		if (!newComment.trim()) return

		setCommentLoading(true)

		// Simulate API call
		setTimeout(() => {
			const newCommentObj = {
				id: comments.length + 1,
				content: newComment.trim(),
				createdAt: new Date().toISOString(),
				author: currentUser,
			}

			setComments((prevComments) => [newCommentObj, ...prevComments])
			setPost((prevPost) => ({
				...prevPost,
				commentsCount: prevPost.commentsCount + 1,
			}))
			setNewComment("")
			setCommentLoading(false)
		}, 1000)

		// Future API call will be:
		// try {
		//   const response = await fetch(`${BASE_URL}/api/interactions/posts/${postId}/comments`, {
		//     method: "POST",
		//     headers: { "Content-Type": "application/json" },
		//     credentials: "include",
		//     body: JSON.stringify({ content: newComment.trim() }),
		//   })
		//   const data = await response.json()
		//   if (data.status === "success") {
		//     setComments(prevComments => [data.data.comment, ...prevComments])
		//     setPost(prevPost => ({ ...prevPost, commentsCount: prevPost.commentsCount + 1 }))
		//     setNewComment("")
		//   } else {
		//     setError(data.message)
		//   }
		// } catch (error) {
		//   setError("Failed to add comment")
		// } finally {
		//   setCommentLoading(false)
		// }
	}

	if (loading) {
		return (
			<Container
				maxWidth="md"
				sx={{ py: 4 }}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="200px">
					<CircularProgress />
				</Box>
			</Container>
		)
	}

	if (error && !post) {
		return (
			<Container
				maxWidth="md"
				sx={{ py: 4 }}>
				<Alert severity="error">{error}</Alert>
			</Container>
		)
	}

	if (!post) {
		return (
			<Container
				maxWidth="md"
				sx={{ py: 4 }}>
				<Alert severity="error">Post not found</Alert>
			</Container>
		)
	}

	const isOwner = currentUserId && post.author?.id === currentUserId

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4 }}>
			<Paper
				elevation={3}
				sx={{ p: 4, mb: 4 }}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="flex-start"
					mb={3}>
					<Typography
						variant="h3"
						component="h1"
						sx={{ fontWeight: 600, color: "#333" }}>
						{post.title}
					</Typography>
					{isOwner && (
						<>
							<IconButton onClick={handleMenuOpen}>
								<MoreVert />
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}>
								<MenuItem onClick={handleEdit}>
									<Edit
										fontSize="small"
										sx={{ mr: 1 }}
									/>
									Edit
								</MenuItem>
								<MenuItem onClick={handleDelete}>
									<Delete
										fontSize="small"
										sx={{ mr: 1 }}
									/>
									Delete
								</MenuItem>
							</Menu>
						</>
					)}
				</Box>

				<Box
					display="flex"
					alignItems="center"
					gap={2}
					mb={3}>
					<Avatar
						sx={{
							bgcolor: "#1976d2",
							width: 40,
							height: 40,
						}}>
						{post.author?.name?.charAt(0) || "A"}
					</Avatar>
					<Box>
						<Typography
							variant="body1"
							sx={{ fontWeight: 500 }}>
							{post.author?.name || "Anonymous"}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary">
							{formatDate(post.createdAt)}
						</Typography>
					</Box>
				</Box>

				{post.tags && post.tags.length > 0 && (
					<Box
						display="flex"
						flexWrap="wrap"
						gap={1}
						mb={3}>
						{post.tags.map((tag) => (
							<Chip
								key={tag.id}
								label={tag.name}
								size="small"
								sx={{
									backgroundColor: "#e3f2fd",
									color: "#1976d2",
									fontSize: "0.75rem",
								}}
							/>
						))}
					</Box>
				)}

				<Typography
					variant="body1"
					paragraph
					sx={{ mb: 4, lineHeight: 1.7 }}>
					{post.content}
				</Typography>

				<Divider sx={{ my: 3 }} />

				<Box
					display="flex"
					alignItems="center"
					gap={3}
					mb={4}>
					<Box
						display="flex"
						alignItems="center">
						<IconButton
							onClick={handleLike}
							sx={{
								color: post.isLikedByUser ? "#f44336" : "#666",
							}}>
							{post.isLikedByUser ? <Favorite /> : <FavoriteOutlined />}
						</IconButton>
						<Typography
							variant="body2"
							color="text.secondary">
							{post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
						</Typography>
					</Box>

					<Box
						display="flex"
						alignItems="center">
						<IconButton sx={{ color: "#666" }}>
							<ChatBubbleOutline />
						</IconButton>
						<Typography
							variant="body2"
							color="text.secondary">
							{post.commentsCount} {post.commentsCount === 1 ? "comment" : "comments"}
						</Typography>
					</Box>
				</Box>
			</Paper>

			{/* Comments Section */}
			<Paper
				elevation={2}
				sx={{ p: 4 }}>
				<Typography
					variant="h5"
					sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
					Comments ({comments.length})
				</Typography>

				{/* Add Comment Form */}
				<Box
					component="form"
					onSubmit={handleCommentSubmit}
					sx={{ mb: 4 }}>
					<TextField
						fullWidth
						multiline
						rows={3}
						placeholder="Write a comment..."
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<Box
						display="flex"
						justifyContent="flex-end">
						<Button
							type="submit"
							variant="contained"
							startIcon={<Send />}
							disabled={!newComment.trim() || commentLoading}
							sx={{
								backgroundColor: "#1976d2",
								"&:hover": { backgroundColor: "#1565c0" },
							}}>
							{commentLoading ? (
								<CircularProgress
									size={20}
									color="inherit"
								/>
							) : (
								"Post Comment"
							)}
						</Button>
					</Box>
				</Box>

				<Divider sx={{ mb: 4 }} />

				{/* Comments List */}
				{comments.length === 0 ? (
					<Box
						textAlign="center"
						py={4}>
						<Typography
							variant="body1"
							color="text.secondary">
							No comments yet. Be the first to comment!
						</Typography>
					</Box>
				) : (
					<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
						{comments.map((comment) => (
							<Box
								key={comment.id}
								sx={{
									p: 3,
									border: "1px solid #e0e0e0",
									borderRadius: 2,
									backgroundColor: "#fafafa",
								}}>
								<Box
									display="flex"
									alignItems="center"
									gap={2}
									mb={2}>
									<Avatar
										sx={{
											bgcolor: "#1976d2",
											width: 32,
											height: 32,
											fontSize: "0.9rem",
										}}>
										{comment.author?.name?.charAt(0) || "A"}
									</Avatar>
									<Box>
										<Typography
											variant="body2"
											sx={{ fontWeight: 500 }}>
											{comment.author?.name || "Anonymous"}
										</Typography>
										<Typography
											variant="caption"
											color="text.secondary">
											{formatDate(comment.createdAt)}
										</Typography>
									</Box>
								</Box>
								<Typography variant="body2">{comment.content}</Typography>
							</Box>
						))}
					</Box>
				)}
			</Paper>
		</Container>
	)
}
