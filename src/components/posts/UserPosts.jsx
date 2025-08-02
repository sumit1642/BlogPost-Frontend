/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// src/components/posts/UserPosts.jsx
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Typography, Box, CircularProgress, Alert, Avatar, Paper } from "@mui/material"
import { PostCard } from "./PostCard"

export const UserPosts = () => {
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const { userId } = useParams()

	// Mock current user for like functionality
	const currentUserId = 1

	// Mock user data
	const mockUser = {
		id: 2,
		name: "Bob Smith",
		email: "bob@example.com",
	}

	// Mock posts data
	const mockPosts = [
		{
			id: 2,
			title: "Understanding Node.js Fundamentals",
			content:
				"Node.js has revolutionized server-side JavaScript development. Let's dive into the core concepts that make Node.js such a powerful runtime environment.",
			published: true,
			createdAt: "2024-01-14T14:20:00.000Z",
			updatedAt: "2024-01-14T14:20:00.000Z",
			author: {
				id: 2,
				name: "Bob Smith",
				email: "bob@example.com",
			},
			commentsCount: 12,
			likesCount: 35,
			isLikedByUser: false,
			tags: [
				{ id: 3, name: "nodejs" },
				{ id: 2, name: "javascript" },
			],
		},
		{
			id: 4,
			title: "Advanced JavaScript Patterns",
			content:
				"Explore advanced JavaScript patterns and techniques that will make your code more maintainable and efficient.",
			published: true,
			createdAt: "2024-01-12T16:45:00.000Z",
			updatedAt: "2024-01-12T16:45:00.000Z",
			author: {
				id: 2,
				name: "Bob Smith",
				email: "bob@example.com",
			},
			commentsCount: 8,
			likesCount: 21,
			isLikedByUser: true,
			tags: [
				{ id: 2, name: "javascript" },
				{ id: 6, name: "patterns" },
			],
		},
	]

	useEffect(() => {
		// Simulate API calls
		setTimeout(() => {
			setUser(mockUser)
			setPosts(mockPosts)
			setLoading(false)
		}, 1000)

		// Future API call will be:
		// const fetchUserPosts = async () => {
		//   try {
		//     const response = await fetch(`${BASE_URL}/api/posts/user/${userId}`, {
		//       credentials: "include",
		//     })
		//     const data = await response.json()
		//     if (data.status === "success") {
		//       setPosts(data.data.posts)
		//       // Assuming user info is included or fetch separately
		//       setUser(data.data.posts[0]?.author || null)
		//     } else {
		//       setError(data.message)
		//     }
		//   } catch (error) {
		//     setError("Failed to fetch user posts")
		//   } finally {
		//     setLoading(false)
		//   }
		// }
		// fetchUserPosts()
	}, [userId])

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
			{/* User Profile Header */}
			{user && (
				<Paper
					elevation={2}
					sx={{ p: 4, mb: 4 }}>
					<Box
						display="flex"
						alignItems="center"
						gap={3}>
						<Avatar
							sx={{
								bgcolor: "#1976d2",
								width: 80,
								height: 80,
								fontSize: "2rem",
							}}>
							{user.name.charAt(0)}
						</Avatar>
						<Box>
							<Typography
								variant="h4"
								sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
								{user.name}
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary">
								{posts.length} {posts.length === 1 ? "post" : "posts"} published
							</Typography>
						</Box>
					</Box>
				</Paper>
			)}

			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
				Posts by {user?.name || "User"}
			</Typography>

			{posts.length === 0 ? (
				<Box
					textAlign="center"
					py={8}>
					<Typography
						variant="h6"
						color="text.secondary"
						gutterBottom>
						No posts found
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary">
						This user hasn't published any posts yet.
					</Typography>
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					{posts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							onLike={handleLike}
							currentUserId={currentUserId}
						/>
					))}
				</Box>
			)}
		</Container>
	)
}
