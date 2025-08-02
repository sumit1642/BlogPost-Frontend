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
			setPost(mockPost);
			setComments(mockComments);
			setLoading(false);
		}, 1000);

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
	},[])