import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar } from "@mui/material"
import { useAuth } from "../hooks/useAuth"

export const Navbar = () => {
	const { user, isAuthenticated, logout } = useAuth()
	const [anchorEl, setAnchorEl] = useState(null)
	const navigate = useNavigate()

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		logout()
		handleClose()
	}

	const handleProfile = () => {
		navigate("/profile")
		handleClose()
	}

	const handleMyPosts = () => {
		navigate("/my-posts")
		handleClose()
	}

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: "#f5f5f5",
				color: "#333",
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
			}}>
			<Toolbar>
				<Typography
					variant="h6"
					component={Link}
					to="/"
					sx={{
						flexGrow: 1,
						textDecoration: "none",
						color: "#333",
						fontWeight: 600,
					}}>
					Blog Platform
				</Typography>

				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					{isAuthenticated ? (
						<>
							<Typography
								variant="body2"
								sx={{ color: "#666" }}>
								Welcome, {user?.name}
							</Typography>
							<Avatar
								sx={{
									bgcolor: "#1976d2",
									width: 32,
									height: 32,
									cursor: "pointer",
								}}
								onClick={handleMenu}>
								{user?.name?.charAt(0)}
							</Avatar>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								<MenuItem onClick={handleProfile}>Profile</MenuItem>
								<MenuItem onClick={handleMyPosts}>My Posts</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<Button
								component={Link}
								to="/login"
								sx={{
									color: "#666",
									border: "1px solid #ddd",
									"&:hover": { backgroundColor: "#f0f0f0" },
								}}>
								Login
							</Button>
							<Button
								component={Link}
								to="/register"
								variant="contained"
								sx={{
									backgroundColor: "#1976d2",
									"&:hover": { backgroundColor: "#1565c0" },
								}}>
								Sign Up
							</Button>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	)
}
