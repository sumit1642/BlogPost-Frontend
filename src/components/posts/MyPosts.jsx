/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// src/components/posts/MyPosts.jsx
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
	Container,
	Typography,
	Box,
	Button,
	CircularProgress,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Fab,
} from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import { PostCard } from "./PostCard"

export const MyPosts = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const [deleteDialog, setDeleteDialog] = useState({ open: false, postId: null })
	const navigate = useNavigate()

	// Mock user data
	const currentUserId = 1

	// Mock posts data
	const mockPosts = [
		{
			id: 1,
			title: "Getting Started with React",
			content:
				"React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals of React and how to get started with your first component.",
			published: true,
			createdAt: "2024-01-15T10:30:00.000Z",
			updatedAt: "2024-01-15T10:30:00.000Z",
			author: {
				id: 1,
				name: "Alice Johnson",
				email: "alice@example.com",
			},
			commentsCount: 8,
			likesCount: 23,
			isLikedByUser: true,
			tags: [
				{ id: 1, name: "react" },
				{ id: 2, name: "javascript" },
			],
		},
		{
			id: 2,
			title: "My Draft Post",
			content:
				"This is a draft post that I'm still working on. It contains some initial thoughts and ideas.",
			published: false,
			createdAt: "2024-01-16T14:20:00.000Z",
			updatedAt: "2024-01-16T14:20:00.000Z",
			author: {
				id: 1,
				name: "Alice Johnson",
				email: "alice@example.com",
			},
			commentsCount: 0,
			likesCount: 0,
			isLikedByUser: false,
			tags: [],
		},
	]

	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			setPosts(mockPosts)
			setLoading(false)
		}, 1000)

		// Future API call will be:
		// const fetchMyPosts = async () => {
		//   try {
		//     const response = await fetch(`${BASE_URL}/api/posts/my/posts`, {
		//       credentials: "include",
		//     })
		//     const data = await response.json()
		//     if (data.status === "success") {
		//       setPosts(data.data.posts)
		//     } else {
		//       setError(data.message)
		//     }
		//   } catch (error) {
		//     setError("Failed to fetch posts")
		//   } finally {
		//     setLoading(false)
		//   }
		// }
		// fetchMyPosts()
	}, [])

	const handleLike = (postId) => {
		// Will add API call later
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post.id === postId
					? {
							...post,
							isLikedByUser: !post.isLikedByUser,
							likesCount: post.isLikedByUser
								? post.likesCount - 1
								: post.likesCount + 1,
					  }
					: post,
			),
		)
	}

	const handleEdit = (postId) => {
		navigate(`/edit-post/${postId}`)
	}

	const handleDelete = (postId) => {
		setDeleteDialog({ open: true, postId })
	}

	const confirmDelete = async () => {
		const postId = deleteDialog.postId
		setDeleteDialog({ open: false, postId: null })

		// Simulate API call
		setTimeout(() => {
			setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
		}, 500)

		// Future API call will be:
		// try {
		//   const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
		//     method: "DELETE",
		//     credentials: "include",
		//   })
		//   const data = await response.json()
		//   if (data.status === "success") {
		//     setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
		//   } else {
		//     setError(data.message)
		//   }
		// } catch (error) {
		//   setError("Failed to delete post")
		// }
	}

	const handleView = (postId) => {
		navigate(`/post/${postId}`)
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

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4, position: "relative" }}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}>
				<Typography
					variant="h3"
					component="h1"
					sx={{ fontWeight: 600, color: "#333" }}>
					My Posts
				</Typography>
				<Button
					variant="contained"
					startIcon={<Add />}
					onClick={() => navigate("/create-post")}
					sx={{
						backgroundColor: "#1976d2",
						"&:hover": { backgroundColor: "#1565c0" },
					}}>
					New Post
				</Button>
			</Box>

			{error && (
				<Alert
					severity="error"
					sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{posts.length === 0 ? (
				<Box
					textAlign="center"
					py={8}>
					<Typography
						variant="h6"
						color="text.secondary"
						gutterBottom>
						You haven't created any posts yet
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ mb: 3 }}>
						Start sharing your thoughts with the world!
					</Typography>
					<Button
						variant="contained"
						startIcon={<Add />}
						onClick={() => navigate("/create-post")}
						sx={{
							backgroundColor: "#1976d2",
							"&:hover": { backgroundColor: "#1565c0" },
						}}>
						Create Your First Post
					</Button>
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					{posts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							onLike={handleLike}
							onEdit={handleEdit}
							onDelete={handleDelete}
							onView={handleView}
							showActions={true}
							currentUserId={currentUserId}
						/>
					))}
				</Box>
			)}

			{/* Floating Action Button for mobile */}
			<Fab
				color="primary"
				aria-label="add"
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					display: { xs: "flex", sm: "none" },
				}}
				onClick={() => navigate("/create-post")}>
				<Add />
			</Fab>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={deleteDialog.open}
				onClose={() => setDeleteDialog({ open: false, postId: null })}>
				<DialogTitle>Delete Post</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this post? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setDeleteDialog({ open: false, postId: null })}
						color="primary">
						Cancel
					</Button>
					<Button
						onClick={confirmDelete}
						color="error"
						variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
