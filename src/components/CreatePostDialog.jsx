import React, { useState } from "react"
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
} from "@mui/material"
import { usePosts } from "../hooks/usePosts"

export function CreatePostDialog({ open, onClose }) {
	const { createPost, isCreating } = usePosts()
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: false,
	})
	const [error, setError] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")

		if (!formData.title.trim() || !formData.content.trim()) {
			setError("Title and content are required")
			return
		}

		try {
			await createPost(formData)
			setFormData({ title: "", content: "", published: false })
			onClose()
		} catch (error) {
			setError(error.message || "Failed to create post")
		}
	}

	const handleClose = () => {
		setFormData({ title: "", content: "", published: false })
		setError("")
		onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Create New Post</DialogTitle>

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
						label="Publish immediately"
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={isCreating}>
						{isCreating ? "Creating..." : "Create Post"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
