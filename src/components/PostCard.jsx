// src/components/PostCard.jsx
import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Box,
	Chip,
	Avatar,
	IconButton,
	Divider,
} from "@mui/material"
import { FavoriteOutlined, ChatBubbleOutline, Favorite } from "@mui/icons-material"
import { usePost } from "../hooks/usePost"
import { useAuth } from "../hooks/useAuth"

export function PostCard({ post, onClick }) {
	const { isAuthenticated } = useAuth()
	const { toggleLike, isToggling } = usePost(post.id)

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	const handleLike = async (e) => {
		e.stopPropagation()
		if (!isAuthenticated) return

		try {
			await toggleLike()
		} catch (error) {
			console.error("Failed to toggle like:", error)
		}
	}

	return (
		<Card
			sx={{
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				"&:hover": {
					boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
					transform: "translateY(-2px)",
				},
				transition: "all 0.3s ease",
				cursor: onClick ? "pointer" : "default",
			}}
			onClick={onClick}>
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
								onClick={handleLike}
								disabled={!isAuthenticated || isToggling}
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
	)
}
