// src/components/MyPostsPage.jsx

import React, { useState } from "react"
import {
	Container,
	Typography,
	Box,
	Button,
	CircularProgress,
	Alert,
	Fab,
	IconButton,
	Menu,
	MenuItem,
	Card,
	CardContent,
	Chip,
	Divider,
} from "@mui/material"
import { Add, MoreVert, Edit, Delete, Visibility } from "@mui/icons-material"
import { usePosts } from "../hooks/usePosts"
import { useAuth } from "../hooks/useAuth"
import { CreatePostDialog } from "./CreatePostDialog"
import { EditPostDialog } from "./EditPostDialog"
import { useNavigate } from "react-router-dom"

export function MyPostsPage() {
	const { user } = useAuth()
	const { posts, isLoading, error, deletePost, isDeleting } = usePosts(false)
	const [createDialogOpen, setCreateDialogOpen] = useState(false)
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [selectedPost, setSelectedPost] = useState(null)
	const [anchorEl, setAnchorEl] = useState(null)
	const [deleteError, setDeleteError] = useState("")
	const navigate = useNavigate()

	const handleMenuOpen = (event, post) => {
		event.stopPropagation()
		setAnchorEl(event.currentTarget)
		setSelectedPost(post)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		setSelectedPost(null)
	}

	const handleEdit = () => {
		if (selectedPost) {
			setEditDialogOpen(true)
		}
		handleMenuClose()
	}

	const handleDelete = async () => {
		if (!selectedPost) return

		const confirmDelete = window.confirm(
			`Are you sure you want to delete "${selectedPost.title}"? This action cannot be undone.`,
		)

		if (confirmDelete) {
			try {
				setDeleteError("")
				await deletePost(selectedPost.id)
				// Success handled by react-query invalidation
			} catch (error) {
				setDeleteError(error.message || "Failed to delete post")
				console.error("Failed to delete post:", error)
			}
		}
		handleMenuClose()
	}

	const handleView = () => {
		if (selectedPost) {
			navigate(`/post/${selectedPost.id}`)
		}
		handleMenuClose()
	}

	const handleCardClick = (post) => {
		navigate(`/post/${post.id}`)
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	// Filter posts to show only user's posts
	const userPosts = posts.filter((post) => post.author?.id === user?.id)

	if (isLoading) {
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

	if (error) {
		return (
			<Container
				maxWidth="md"
				sx={{ py: 4 }}>
				<Alert severity="error">{error}</Alert>
			</Container>
		)
	}

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4 }}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}>
				<Typography
					variant="h3"
					component="h1"
					sx={{ fontWeight: 600 }}>
					My Posts ({userPosts.length})
				</Typography>
				<Button
					variant="contained"
					startIcon={<Add />}
					onClick={() => setCreateDialogOpen(true)}>
					New Post
				</Button>
			</Box>

			{deleteError && (
				<Alert
					severity="error"
					sx={{ mb: 2 }}
					onClose={() => setDeleteError("")}>
					{deleteError}
				</Alert>
			)}

			{userPosts.length === 0 ? (
				<Box
					textAlign="center"
					py={4}>
					<Typography
						variant="h6"
						color="text.secondary"
						gutterBottom>
						You haven't created any posts yet.
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						component="p"
						sx={{ mb: 2 }}>
						Start sharing your thoughts with the community!
					</Typography>
					<Button
						variant="contained"
						startIcon={<Add />}
						onClick={() => setCreateDialogOpen(true)}>
						Create Your First Post
					</Button>
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					{userPosts.map((post) => (
						<Card
							key={post.id}
							sx={{
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
								"&:hover": {
									boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
									transform: "translateY(-2px)",
								},
								transition: "all 0.3s ease",
								cursor: "pointer",
							}}
							onClick={() => handleCardClick(post)}>
							<CardContent sx={{ p: 3 }}>
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="flex-start"
									mb={2}>
									<Box sx={{ flex: 1 }}>
										<Box
											display="flex"
											alignItems="center"
											gap={2}
											mb={1}>
											<Typography
												variant="h5"
												component="h2"
												sx={{ fontWeight: 600, color: "#333" }}>
												{post.title}
											</Typography>
											<Chip
												label={post.published ? "Published" : "Draft"}
												size="small"
												color={post.published ? "success" : "default"}
												variant={post.published ? "filled" : "outlined"}
											/>
										</Box>
										<Typography
											variant="caption"
											color="text.secondary">
											Created: {formatDate(post.createdAt)}
											{post.updatedAt !== post.createdAt && (
												<> • Updated: {formatDate(post.updatedAt)}</>
											)}
										</Typography>
									</Box>

									<IconButton
										onClick={(e) => handleMenuOpen(e, post)}
										disabled={isDeleting}
										size="small"
										sx={{
											"&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
										}}>
										<MoreVert />
									</IconButton>
								</Box>

								<Typography
									variant="body1"
									color="text.secondary"
									component="p"
									sx={{
										mb: 3,
										display: "-webkit-box",
										WebkitLineClamp: 3,
										WebkitBoxOrient: "vertical",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}>
									{post.content}
								</Typography>

								{post.tags && post.tags.length > 0 && (
									<Box
										display="flex"
										flexWrap="wrap"
										gap={1}
										mb={2}>
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

								<Divider sx={{ my: 2 }} />

								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center">
									<Box
										display="flex"
										alignItems="center"
										gap={3}>
										<Typography
											variant="body2"
											color="text.secondary">
											👍 {post.likesCount}{" "}
											{post.likesCount === 1 ? "like" : "likes"}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary">
											💬 {post.commentsCount}{" "}
											{post.commentsCount === 1 ? "comment" : "comments"}
										</Typography>
									</Box>
									<Typography
										variant="caption"
										color="text.secondary">
										Click to view details
									</Typography>
								</Box>
							</CardContent>
						</Card>
					))}
				</Box>
			)}

			{/* Floating Action Button */}
			<Fab
				color="primary"
				aria-label="add post"
				sx={{
					position: "fixed",
					bottom: 24,
					right: 24,
					"&:hover": {
						transform: "scale(1.1)",
					},
					transition: "transform 0.2s ease",
				}}
				onClick={() => setCreateDialogOpen(true)}>
				<Add />
			</Fab>

			{/* Context Menu */}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				PaperProps={{
					sx: {
						minWidth: 150,
						boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
					},
				}}>
				<MenuItem
					onClick={handleView}
					sx={{ "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.04)" } }}>
					<Visibility sx={{ mr: 2, fontSize: 20 }} />
					View Post
				</MenuItem>
				<MenuItem
					onClick={handleEdit}
					sx={{ "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.04)" } }}>
					<Edit sx={{ mr: 2, fontSize: 20 }} />
					Edit Post
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={handleDelete}
					sx={{
						color: "error.main",
						"&:hover": { backgroundColor: "rgba(211, 47, 47, 0.04)" },
					}}>
					<Delete sx={{ mr: 2, fontSize: 20 }} />
					Delete Post
				</MenuItem>
			</Menu>

			{/* Dialogs */}
			<CreatePostDialog
				open={createDialogOpen}
				onClose={() => setCreateDialogOpen(false)}
			/>

			<EditPostDialog
				open={editDialogOpen}
				onClose={() => {
					setEditDialogOpen(false)
					setSelectedPost(null)
				}}
				post={selectedPost}
			/>
		</Container>
	)
}
