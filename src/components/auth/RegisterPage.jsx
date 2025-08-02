// src/components/auth/RegisterPage.jsx
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	CircularProgress,
} from "@mui/material"

export const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const validateForm = () => {
		if (!formData.name.trim()) {
			setError("Name is required")
			return false
		}
		if (formData.name.trim().length < 2) {
			setError("Name must be at least 2 characters long")
			return false
		}
		if (!formData.email.trim()) {
			setError("Email is required")
			return false
		}
		if (!formData.password) {
			setError("Password is required")
			return false
		}
		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long")
			return false
		}
		return true
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")

		if (!validateForm()) {
			return
		}

		setLoading(true)

		// Simulate API call
		setTimeout(() => {
			// Mock successful registration
			navigate("/login")
			setLoading(false)
		}, 1000)

		// Future API call will be:
		// try {
		//   const response = await fetch(`${BASE_URL}/api/auth/register`, {
		//     method: "POST",
		//     headers: { "Content-Type": "application/json" },
		//     credentials: "include",
		//     body: JSON.stringify(formData),
		//   })
		//   const data = await response.json()
		//   if (data.status === "success") {
		//     navigate("/login")
		//   } else {
		//     setError(data.message)
		//   }
		// } catch (error) {
		//   setError("Registration failed. Please try again.")
		// }
	}

	return (
		<Container
			component="main"
			maxWidth="sm"
			sx={{ py: 8 }}>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Typography
					component="h1"
					variant="h4"
					gutterBottom
					sx={{ fontWeight: 600, color: "#333" }}>
					Create Account
				</Typography>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 3 }}>
					Join our community and start sharing your thoughts
				</Typography>

				{error && (
					<Alert
						severity="error"
						sx={{ width: "100%", mb: 2 }}>
						{error}
					</Alert>
				)}

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ width: "100%" }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="name"
						label="Full Name"
						name="name"
						autoComplete="name"
						autoFocus
						value={formData.name}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={formData.email}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="new-password"
						value={formData.password}
						onChange={handleChange}
						helperText="Minimum 6 characters"
						sx={{ mb: 3 }}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={loading}
						sx={{
							mt: 2,
							mb: 2,
							py: 1.5,
							backgroundColor: "#1976d2",
							"&:hover": { backgroundColor: "#1565c0" },
						}}>
						{loading ? (
							<CircularProgress
								size={24}
								color="inherit"
							/>
						) : (
							"Create Account"
						)}
					</Button>

					<Box textAlign="center">
						<Typography
							variant="body2"
							color="text.secondary">
							Already have an account?{" "}
							<Link
								to="/login"
								style={{
									color: "#1976d2",
									textDecoration: "none",
									fontWeight: 500,
								}}>
								Sign in here
							</Link>
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Container>
	)
}
