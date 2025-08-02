// src/components/ProfilePage.jsx
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
	Divider,
	Card,
	CardContent,
	Avatar,
} from "@mui/material"
import { useProfile } from "../hooks/useProfile"
import { useAuth } from "../hooks/useAuth"

export function ProfilePage() {
	const { profile, isLoading, error, updateProfile, isUpdating, updateError } = useProfile()
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

	if (error) {
		return (
			<Container
				maxWidth="sm"
				sx={{ py: 4 }}>
				<Alert
					severity="error"
					sx={{ mb: 2 }}>
					{error}
				</Alert>
			</Container>
		)
	}

	return (
		<Container
			maxWidth="sm"
			sx={{ py: 4 }}>
			{/* Profile Display Card */}
			<Card
				elevation={2}
				sx={{ mb: 4 }}>
				<CardContent>
					<Box
						display="flex"
						alignItems="center"
						gap={2}
						mb={2}>
						<Avatar
							sx={{
								bgcolor: "#1976d2",
								width: 64,
								height: 64,
								fontSize: "1.5rem",
							}}>
							{profile?.name?.charAt(0) || user?.name?.charAt(0) || "U"}
						</Avatar>
						<Box>
							<Typography
								variant="h5"
								sx={{ fontWeight: 600 }}>
								{profile?.name || user?.name || "User"}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary">
								{profile?.email || user?.email}
							</Typography>
						</Box>
					</Box>
					{profile?.bio && (
						<Typography
							variant="body1"
							color="text.secondary">
							{profile.bio}
						</Typography>
					)}
				</CardContent>
			</Card>

			<Paper
				elevation={3}
				sx={{ p: 4 }}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{ fontWeight: 600 }}>
					Profile Settings
				</Typography>

				<Divider sx={{ mb: 3 }} />

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
						required
					/>

					<TextField
						fullWidth
						label="Bio"
						multiline
						rows={4}
						value={formData.bio}
						onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
						sx={{ mb: 3 }}
						placeholder="Tell us about yourself..."
						helperText="Optional: Share a brief description about yourself"
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
