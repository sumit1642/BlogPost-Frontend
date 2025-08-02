/* eslint-disable react-hooks/exhaustive-deps */
// src/components/posts/EditPost.jsx
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PostForm } from "./PostForm"
import { Container, CircularProgress, Box, Alert } from "@mui/material"

export const EditPost = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [post, setPost] = useState(null)
	const [fetchLoading, setFetchLoading] = useState(true)
	const navigate = useNavigate()
	const { postId } = useParams()

	// Mock post data for demonstration
	const mockPost = {
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
	}

	useEffect(() => {
		// Simulate API call to fetch post
		setTimeout(() => {
			setPost(mockPost)
			setFetchLoading(false)
		}, 1000)

		// Future API call will be:
		// const fetchPost = async () => {
		//   try {
		//     const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
		//       credentials: "include",
		//     })
		//     const data = await response.json()
		//     if (data.status === "success") {
		//       setPost(data.data.post)
		//     } else {
		//       setError(data.message)
		//     }
		//   } catch (error) {
		//     setError("Failed to fetch post")
		//   } finally {
		//     setFetchLoading(false)
		//   }
		// }
		// fetchPost()
	}, [postId])

	const handleSubmit = async (formData) => {
		setLoading(true)
		setError("")

		// Simulate API call
		setTimeout(() => {
			console.log("Updating post:", formData)
			// Mock success
			navigate("/my-posts")
			setLoading(false)
		}, 1000)

		// Future API call will be:
		// try {
		//   const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
		//     method: "PUT",
		//     headers: { "Content-Type": "application/json" },
		//     credentials: "include",
		//     body: JSON.stringify(formData),
		//   })
		//   const data = await response.json()
		//   if (data.status === "success") {
		//     navigate("/my-posts")
		//   } else {
		//     setError(data.message)
		//   }
		// } catch (error) {
		//   setError("Failed to update post. Please try again.")
		// } finally {
		//   setLoading(false)
		// }
	}

	if (fetchLoading) {
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

	return (
		<PostForm
			title="Edit Post"
			submitButtonText="Update Post"
			initialData={post}
			onSubmit={handleSubmit}
			loading={loading}
			error={error}
		/>
	)
}
