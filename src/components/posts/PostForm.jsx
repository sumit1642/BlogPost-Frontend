// src/components/posts/PostForm.jsx
import React, { useState, useEffect } from "react"
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	CircularProgress,
	FormControlLabel,
	Switch,
} from "@mui/material"

export const PostForm = ({
	initialData = null,
	onSubmit,
	loading = false,
	error = "",
	title = "Create New Post",
	submitButtonText = "Create Post",
}) => {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: false,
	})

	useEffect(() => {
		if (initialData) {
			setFormData({
				title: initialData.title || "",
				content: initialData.content || "",
				published: initialData.published || false,
			})
		}
	}, [initialData])

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit?.(formData)
	}

	const validateForm = () => {
		return formData.title.trim() && formData.content.trim()
	}

	return (
		<Container
			component="main"
			maxWidth="md"
			sx={{ py: 4 }}>
			<Paper
				elevation={3}
				sx={{ p: 4 }}>
				<Typography
					component="h1"
					variant="h4"
					gutterBottom
					sx={{ fontWeight: 600, color: "#333", mb: 3 }}>
					{title}
				</Typography>

				{error && (
					<Alert
						severity="error"
						sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				<Box
					component="form"
					onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="title"
						label="Post Title"
						name="title"
						autoFocus
						value={formData.title}
						onChange={handleChange}
						sx={{ mb: 2 }}
						helperText="Maximum 50 characters"
						inputProps={{ maxLength: 50 }}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						rows={8}
						id="content"
						label="Post Content"
						name="content"
						value={formData.content}
						onChange={handleChange}
						sx={{ mb: 3 }}
						helperText="Maximum 191 characters"
						inputProps={{ maxLength: 191 }}
					/>

					<FormControlLabel
						control={
							<Switch
								checked={formData.published}
								onChange={handleChange}
								name="published"
								color="primary"
							/>
						}
						label="Publish immediately"
						sx={{ mb: 3 }}
					/>

					<Box
						display="flex"
						gap={2}
						justifyContent="flex-end">
						<Button
							variant="outlined"
							onClick={() => window.history.back()}
							disabled={loading}>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							disabled={loading || !validateForm()}
							sx={{
								backgroundColor: "#1976d2",
								"&:hover": { backgroundColor: "#1565c0" },
							}}>
							{loading ? (
								<CircularProgress
									size={24}
									color="inherit"
								/>
							) : (
								submitButtonText
							)}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	)
}
