// Update src/components/MyPostsPage.jsx to include edit functionality

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
	Avatar,
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
		setEditDialogOpen(true)
		handleMenuClose()
	}

	const handleDelete = async () => {
		if (!selectedPost) return

		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				await deletePost(selectedPost.id)
			} catch (error) {
				console.error("Failed to delete post:", error)
			}
		}
		handleMenuClose()
	}

	const handleView = () => {
		navigate(`/post/${selectedPost.id}`)
		handleMenuClose()
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
					My Posts
				</Typography>
				<Button
					variant="contained"
					startIcon={<Add />}
					onClick={() => setCreateDialogOpen(true)}>
					New Post
				</Button>
			</Box>

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
					<Button
						variant="contained"
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
							}}>
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
											/>
										</Box>
										<Typography
											variant="caption"
											color="text.secondary">
											{formatDate(post.createdAt)}
										</Typography>
									</Box>

									<IconButton
										onClick={(e) => handleMenuOpen(e, post)}
										disabled={isDeleting}>
										<MoreVert />
									</IconButton>
								</Box>

								<Typography
									variant="body1"
									color="text.secondary"
									paragraph
									sx={{ mb: 3 }}>
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
										gap={2}>
										<Typography
											variant="body2"
											color="text.secondary">
											{post.likesCount}{" "}
											{post.likesCount === 1 ? "like" : "likes"}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary">
											{post.commentsCount}{" "}
											{post.commentsCount === 1 ? "comment" : "comments"}
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					))}
				</Box>
			)}

			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
				onClick={() => setCreateDialogOpen(true)}>
				<Add />
			</Fab>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}>
				<MenuItem onClick={handleView}>
					<Visibility sx={{ mr: 1 }} />
					View
				</MenuItem>
				<MenuItem onClick={handleEdit}>
					<Edit sx={{ mr: 1 }} />
					Edit
				</MenuItem>
				<MenuItem
					onClick={handleDelete}
					sx={{ color: "error.main" }}>
					<Delete sx={{ mr: 1 }} />
					Delete
				</MenuItem>
			</Menu>

			<CreatePostDialog
				open={createDialogOpen}
				onClose={() => setCreateDialogOpen(false)}
			/>

			<EditPostDialog
				open={editDialogOpen}
				onClose={() => setEditDialogOpen(false)}
				post={selectedPost}
			/>
		</Container>
	)
}
