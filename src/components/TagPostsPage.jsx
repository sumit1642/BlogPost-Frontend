import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Typography, Box, Button, CircularProgress, Alert } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api/client"
import { PostCard } from "./PostCard"

export function TagPostsPage() {
	const { tagId } = useParams()
	const navigate = useNavigate()

	const { data, isLoading, error } = useQuery({
		queryKey: ["tagPosts", tagId],
		queryFn: () => apiClient.getPostsByTag(parseInt(tagId)),
		enabled: !!tagId,
	})

	const posts = data?.data?.posts || []

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
					{error.message}
				</Alert>
				<Button onClick={() => navigate("/tags")}>Back to Tags</Button>
			</Container>
		)
	}

	const tagName = posts[0]?.tags?.find((tag) => tag.id === parseInt(tagId))?.name || "Tag"

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4 }}>
			<Button
				startIcon={<ArrowBack />}
				onClick={() => navigate("/tags")}
				sx={{ mb: 3 }}>
				Back to Tags
			</Button>

			<Typography
				variant="h3"
				component="h1"
				gutterBottom
				sx={{ fontWeight: 600 }}>
				Posts tagged with #{tagName}
			</Typography>

			{posts.length === 0 ? (
				<Box
					textAlign="center"
					py={4}>
					<Typography
						variant="h6"
						color="text.secondary">
						No posts found for this tag.
					</Typography>
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					{posts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							onClick={() => navigate(`/post/${post.id}`)}
						/>
					))}
				</Box>
			)}
		</Container>
	)
}
