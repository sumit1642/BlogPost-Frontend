import React, { useState } from "react"
import { Link } from "react-router-dom"
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
import { useAuth } from "../../hooks/useAuth"

export const RegisterPage = () => {
	const { register, isRegisterLoading, registerError } = useAuth()
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		register(formData)
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

				{registerError && (
					<Alert
						severity="error"
						sx={{ width: "100%", mb: 2 }}>
						{registerError}
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
						disabled={isRegisterLoading}
						sx={{
							mt: 2,
							mb: 2,
							py: 1.5,
							backgroundColor: "#1976d2",
							"&:hover": { backgroundColor: "#1565c0" },
						}}>
						{isRegisterLoading ? (
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
