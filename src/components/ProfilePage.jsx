import React, { useState } from "react"
import {
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	Box,
	Alert,
	CircularProgress,
} from "@mui/material"
import { useProfile } from "../hooks/useProfile"
import { useAuth } from "../hooks/useAuth"

export function ProfilePage() {
	const { profile, isLoading, updateProfile, isUpdating, updateError } = useProfile()
	const { user } = useAuth()
	const [formData, setFormData] = useState({
		name: "",
		bio: "",
	})
	const [success, setSuccess] = useState(false)

	React.useEffect(() => {
		if (profile) {
			setFormData({
				name: profile.name || "",
				bio: profile.bio || "",
			})
		}
	}, [profile])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setSuccess(false)

		try {
			await updateProfile(formData)
			setSuccess(true)
			setTimeout(() => setSuccess(false), 3000)
		} catch (error) {
			console.error("Failed to update profile:", error)
		}
	}

	if (isLoading) {
		return (
			<Container
				maxWidth="sm"
				sx={{ py: 4 }}>
				<Box
					display="flex"
					justifyContent="center">
					<CircularProgress />
				</Box>
			</Container>
		)
	}

	return (
		<Container
			maxWidth="sm"
			sx={{ py: 4 }}>
			<Paper
				elevation={3}
				sx={{ p: 4 }}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{ fontWeight: 600 }}>
					Profile Settings
				</Typography>

				{success && (
					<Alert
						severity="success"
						sx={{ mb: 2 }}>
						Profile updated successfully!
					</Alert>
				)}

				{updateError && (
					<Alert
						severity="error"
						sx={{ mb: 2 }}>
						{updateError}
					</Alert>
				)}

				<Box
					component="form"
					onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label="Name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						sx={{ mb: 2 }}
					/>

					<TextField
						fullWidth
						label="Bio"
						multiline
						rows={4}
						value={formData.bio}
						onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
						sx={{ mb: 3 }}
					/>

					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={isUpdating}
						sx={{ py: 1.5 }}>
						{isUpdating ? "Updating..." : "Update Profile"}
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}
