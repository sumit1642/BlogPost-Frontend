// src/components/PostDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom"
import {
	Container,
	Typography,
	Box,
	Chip,
	Avatar,
	IconButton,
	Divider,
	CircularProgress,
	Alert,
	Button,
} from "@mui/material"
import { ArrowBack, FavoriteOutlined, Favorite } from "@mui/icons-material"
import { usePost } from "../hooks/usePost"
import { useAuth } from "../hooks/useAuth"
import { CommentSection } from "./CommentSection"

export function PostDetail() {
	const { postId } = useParams()
	const navigate = useNavigate()
	const { isAuthenticated } = useAuth()
	const { post, isLoading, error, toggleLike, isToggling } = usePost(parseInt(postId))

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	const handleLike = async () => {
		if (!isAuthenticated) return

		try {
			await toggleLike()
		} catch (error) {
			console.error("Failed to toggle like:", error)
		}
	}

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
				<Alert
					severity="error"
					sx={{ mb: 2 }}>
					{error}
				</Alert>
				<Button onClick={() => navigate("/")}>Back to Home</Button>
			</Container>
		)
	}

	if (!post) {
		return (
			<Container
				maxWidth="md"
				sx={{ py: 4 }}>
				<Alert
					severity="info"
					sx={{ mb: 2 }}>
					Post not found
				</Alert>
				<Button onClick={() => navigate("/")}>Back to Home</Button>
			</Container>
		)
	}

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4 }}>
			<Button
				startIcon={<ArrowBack />}
				onClick={() => navigate("/")}
				sx={{ mb: 3 }}>
				Back to Posts
			</Button>

			<Box sx={{ mb: 4 }}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="flex-start"
					mb={2}>
					<Typography
						variant="h3"
						component="h1"
						sx={{ fontWeight: 600, color: "#333" }}>
						{post.title}
					</Typography>
				</Box>

				<Box
					display="flex"
					alignItems="center"
					gap={1}
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
							fontWeight={500}>
							{post.author?.name || "Anonymous"}
						</Typography>
						<Typography
							variant="caption"
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
								sx={{
									backgroundColor: "#e3f2fd",
									color: "#1976d2",
								}}
							/>
						))}
					</Box>
				)}

				<Typography
					variant="body1"
					sx={{ mb: 3, lineHeight: 1.8 }}>
					{post.content}
				</Typography>

				<Box
					display="flex"
					alignItems="center"
					gap={2}
					mb={3}>
					<Box
						display="flex"
						alignItems="center">
						<IconButton
							onClick={handleLike}
							disabled={!isAuthenticated || isToggling}
							sx={{
								color: post.isLikedByUser ? "#f44336" : "#666",
							}}>
							{post.isLikedByUser ? <Favorite /> : <FavoriteOutlined />}
						</IconButton>
						<Typography variant="body1">
							{post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 4 }} />

				<CommentSection postId={post.id} />
			</Box>
		</Container>
	)
}
