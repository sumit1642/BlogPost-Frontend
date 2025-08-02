import React from "react"
import { useNavigate } from "react-router-dom"
import {
	Container,
	Typography,
	Box,
	Chip,
	CircularProgress,
	Alert,
	Grid,
	Card,
	CardContent,
} from "@mui/material"
import { useTags } from "../hooks/useTags"

export function TagsPage() {
	const { tags, isLoadingTags, userLikedTags } = useTags()
	const navigate = useNavigate()

	if (isLoadingTags) {
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

	const handleTagClick = (tagId) => {
		navigate(`/tags/${tagId}/posts`)
	}

	return (
		<Container
			maxWidth="md"
			sx={{ py: 4 }}>
			<Typography
				variant="h3"
				component="h1"
				gutterBottom
				sx={{ fontWeight: 600 }}>
				Browse Tags
			</Typography>

			{userLikedTags.length > 0 && (
				<Box sx={{ mb: 4 }}>
					<Typography
						variant="h5"
						gutterBottom
						sx={{ fontWeight: 500 }}>
						Your Liked Tags
					</Typography>
					<Box
						display="flex"
						flexWrap="wrap"
						gap={1}>
						{userLikedTags.map((tag) => (
							<Chip
								key={tag.id}
								label={`${tag.name} (${tag.postsCount})`}
								onClick={() => handleTagClick(tag.id)}
								sx={{
									backgroundColor: "#e8f5e8",
									color: "#2e7d32",
									cursor: "pointer",
									"&:hover": { backgroundColor: "#c8e6c9" },
								}}
							/>
						))}
					</Box>
				</Box>
			)}

			<Typography
				variant="h5"
				gutterBottom
				sx={{ fontWeight: 500 }}>
				All Tags
			</Typography>

			<Grid
				container
				spacing={2}>
				{tags.map((tag) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						key={tag.id}>
						<Card
							sx={{
								cursor: "pointer",
								"&:hover": { boxShadow: 3 },
								transition: "box-shadow 0.2s",
							}}
							onClick={() => handleTagClick(tag.id)}>
							<CardContent>
								<Typography
									variant="h6"
									gutterBottom>
									#{tag.name}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary">
									{tag.postsCount} {tag.postsCount === 1 ? "post" : "posts"}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}
