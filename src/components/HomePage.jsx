/* eslint-disable react-hooks/exhaustive-deps */
// src/components/HomePage.jsx
import React, { useState, useEffect } from "react"
import {
	Container,
	Typography,
	Card,
	CardContent,
	Box,
	Chip,
	Avatar,
	IconButton,
	Divider,
	CircularProgress,
} from "@mui/material"
import { FavoriteOutlined, ChatBubbleOutline, Favorite } from "@mui/icons-material"

export const HomePage = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	// Mock data for UI demonstration - will be replaced with API call
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
			id: 3,
			title: "Modern CSS Techniques",
			content:
				"CSS has evolved significantly over the years. Today we'll explore modern CSS features like Grid, Flexbox, and custom properties that make styling more efficient.",
			published: true,
			createdAt: "2024-01-13T09:15:00.000Z",
			updatedAt: "2024-01-13T09:15:00.000Z",
			author: {
				id: 3,
				name: "Carol Davis",
				email: "carol@example.com",
			},
			commentsCount: 5,
			likesCount: 18,
			isLikedByUser: false,
			tags: [
				{ id: 4, name: "css" },
				{ id: 5, name: "web-design" },
			],
		},
	]

	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			setPosts(mockPosts)
			setLoading(false)
		}, 1000)
	}, [])

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

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

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4 }}>
			<Typography
				variant="h3"
				component="h1"
				gutterBottom
				align="center"
				sx={{ mb: 4, fontWeight: 600, color: "#333" }}>
				Latest Posts
			</Typography>

			{posts.length === 0 ? (
				<Box
					textAlign="center"
					py={4}>
					<Typography
						variant="h6"
						color="text.secondary">
						No posts available yet.
					</Typography>
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					{posts.map((post) => (
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
									<Typography
										variant="h5"
										component="h2"
										sx={{ fontWeight: 600, color: "#333" }}>
										{post.title}
									</Typography>
									<Typography
										variant="caption"
										color="text.secondary">
										{formatDate(post.createdAt)}
									</Typography>
								</Box>

								<Typography
									variant="body1"
									color="text.secondary"
									paragraph
									sx={{ mb: 3 }}>
									{post.content}
								</Typography>

								<Box
									display="flex"
									alignItems="center"
									gap={1}
									mb={2}>
									<Avatar
										sx={{
											bgcolor: "#1976d2",
											width: 32,
											height: 32,
											fontSize: "0.9rem",
										}}>
										{post.author?.name?.charAt(0) || "A"}
									</Avatar>
									<Typography
										variant="body2"
										color="text.secondary">
										By {post.author?.name || "Anonymous"}
									</Typography>
								</Box>

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
										<Box
											display="flex"
											alignItems="center">
											<IconButton
												size="small"
												onClick={() => handleLike(post.id)}
												sx={{
													color: post.isLikedByUser ? "#f44336" : "#666",
												}}>
												{post.isLikedByUser ? (
													<Favorite fontSize="small" />
												) : (
													<FavoriteOutlined fontSize="small" />
												)}
											</IconButton>
											<Typography
												variant="body2"
												color="text.secondary">
												{post.likesCount}
											</Typography>
										</Box>

										<Box
											display="flex"
											alignItems="center">
											<IconButton
												size="small"
												sx={{ color: "#666" }}>
												<ChatBubbleOutline fontSize="small" />
											</IconButton>
											<Typography
												variant="body2"
												color="text.secondary">
												{post.commentsCount}
											</Typography>
										</Box>
									</Box>

									{post.isLikedByUser && (
										<Typography
											variant="caption"
											color="primary">
											You liked this post
										</Typography>
									)}
								</Box>
							</CardContent>
						</Card>
					))}
				</Box>
			)}
		</Container>
	)
}
