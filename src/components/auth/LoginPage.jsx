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

export const LoginPage = () => {
	const { login, isLoginLoading, loginError } = useAuth()
	const [formData, setFormData] = useState({
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
		login(formData)
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
					Welcome Back
				</Typography>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 3 }}>
					Sign in to your account to continue
				</Typography>

				{loginError && (
					<Alert
						severity="error"
						sx={{ width: "100%", mb: 2 }}>
						{loginError}
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
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
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
						autoComplete="current-password"
						value={formData.password}
						onChange={handleChange}
						sx={{ mb: 3 }}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isLoginLoading}
						sx={{
							mt: 2,
							mb: 2,
							py: 1.5,
							backgroundColor: "#1976d2",
							"&:hover": { backgroundColor: "#1565c0" },
						}}>
						{isLoginLoading ? (
							<CircularProgress
								size={24}
								color="inherit"
							/>
						) : (
							"Sign In"
						)}
					</Button>

					<Box textAlign="center">
						<Typography
							variant="body2"
							color="text.secondary">
							Don't have an account?{" "}
							<Link
								to="/register"
								style={{
									color: "#1976d2",
									textDecoration: "none",
									fontWeight: 500,
								}}>
								Sign up here
							</Link>
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Container>
	)
}
