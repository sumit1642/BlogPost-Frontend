// src/components/posts/PostCard.jsx
import React from "react"
import {
	Card,
	CardContent,
	Typography,
	Box,
	Chip,
	Avatar,
	IconButton,
	Divider,
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
	Visibility,
} from "@mui/icons-material"

export const PostCard = ({
	post,
	onLike,
	onEdit,
	onDelete,
	onView,
	showActions = false,
	currentUserId = null,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	const isOwner = currentUserId && post.author?.id === currentUserId

	return (
		<Card
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
					<Box
						display="flex"
						alignItems="center"
						gap={1}>
						<Typography
							variant="caption"
							color="text.secondary">
							{formatDate(post.createdAt)}
						</Typography>
						{showActions && (
							<>
								<IconButton
									size="small"
									onClick={handleMenuOpen}>
									<MoreVert />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleMenuClose}>
									<MenuItem
										onClick={() => {
											onView?.(post.id)
											handleMenuClose()
										}}>
										<Visibility
											fontSize="small"
											sx={{ mr: 1 }}
										/>
										View
									</MenuItem>
									{isOwner && (
										<>
											<MenuItem
												onClick={() => {
													onEdit?.(post.id)
													handleMenuClose()
												}}>
												<Edit
													fontSize="small"
													sx={{ mr: 1 }}
												/>
												Edit
											</MenuItem>
											<MenuItem
												onClick={() => {
													onDelete?.(post.id)
													handleMenuClose()
												}}>
												<Delete
													fontSize="small"
													sx={{ mr: 1 }}
												/>
												Delete
											</MenuItem>
										</>
									)}
								</Menu>
							</>
						)}
					</Box>
				</Box>

				{!post.published && (
					<Chip
						label="Draft"
						size="small"
						sx={{
							backgroundColor: "#fff3e0",
							color: "#f57c00",
							mb: 2,
						}}
					/>
				)}

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
								onClick={() => onLike?.(post.id)}
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
