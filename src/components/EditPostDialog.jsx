import React, { useState, useEffect } from "react"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
	Alert,
	Box,
	Chip,
	IconButton,
} from "@mui/material"
import { Add, Close } from "@mui/icons-material"
import { usePosts } from "../hooks/usePosts"
import { useTags } from "../hooks/useTags"

export function EditPostDialog({ open, onClose, post }) {
	const { updatePost, isUpdating } = usePosts()
	const { addTag, removeTag, isAddingTag, isRemovingTag } = useTags()
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: false,
	})
	const [newTag, setNewTag] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		if (post) {
			setFormData({
				title: post.title || "",
				content: post.content || "",
				published: post.published || false,
			})
		}
	}, [post])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")

		if (!formData.title.trim() || !formData.content.trim()) {
			setError("Title and content are required")
			return
		}

		try {
			await updatePost({ postId: post.id, postData: formData })
			onClose()
		} catch (error) {
			setError(error.message || "Failed to update post")
		}
	}

	const handleAddTag = async (e) => {
		e.preventDefault()
		if (!newTag.trim()) return

		try {
			await addTag({ postId: post.id, tagName: newTag.trim() })
			setNewTag("")
		} catch (error) {
			setError(error.message || "Failed to add tag")
		}
	}

	const handleRemoveTag = async (tagId) => {
		try {
			await removeTag({ postId: post.id, tagId })
		} catch (error) {
			setError(error.message || "Failed to remove tag")
		}
	}

	const handleClose = () => {
		setFormData({ title: "", content: "", published: false })
		setNewTag("")
		setError("")
		onClose()
	}

	if (!post) return null

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Edit Post</DialogTitle>

				<DialogContent>
					{error && (
						<Alert
							severity="error"
							sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<TextField
						autoFocus
						margin="dense"
						label="Title"
						fullWidth
						variant="outlined"
						value={formData.title}
						onChange={(e) => setFormData({ ...formData, title: e.target.value })}
						sx={{ mb: 2 }}
					/>

					<TextField
						margin="dense"
						label="Content"
						fullWidth
						multiline
						rows={6}
						variant="outlined"
						value={formData.content}
						onChange={(e) => setFormData({ ...formData, content: e.target.value })}
						sx={{ mb: 2 }}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={formData.published}
								onChange={(e) =>
									setFormData({ ...formData, published: e.target.checked })
								}
							/>
						}
						label="Published"
						sx={{ mb: 2 }}
					/>

					{/* Tags Section */}
					<Box sx={{ mt: 2 }}>
						<Typography
							variant="h6"
							gutterBottom>
							Tags
						</Typography>

						<Box
							display="flex"
							flexWrap="wrap"
							gap={1}
							mb={2}>
							{post.tags?.map((tag) => (
								<Chip
									key={tag.id}
									label={tag.name}
									onDelete={() => handleRemoveTag(tag.id)}
									disabled={isRemovingTag}
									sx={{
										backgroundColor: "#e3f2fd",
										color: "#1976d2",
									}}
								/>
							))}
						</Box>

						<Box
							component="form"
							onSubmit={handleAddTag}
							display="flex"
							gap={1}>
							<TextField
								size="small"
								placeholder="Add tag..."
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								disabled={isAddingTag}
							/>
							<Button
								type="submit"
								variant="outlined"
								startIcon={<Add />}
								disabled={!newTag.trim() || isAddingTag}
								size="small">
								Add
							</Button>
						</Box>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={isUpdating}>
						{isUpdating ? "Updating..." : "Update Post"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
