/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar } from "@mui/material"

export const Navbar = () => {
	const [user, setUser] = useState(null) // Will be managed later with API
	const [anchorEl, setAnchorEl] = useState(null)
	const navigate = useNavigate()

	// Mock user for UI demonstration - remove when adding API
	const mockUser = { name: "John Doe", email: "john@example.com" }
	const isAuthenticated = false // Change to true to see authenticated state

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		// Will add API call later
		setUser(null)
		handleClose()
		navigate("/")
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
								Welcome, {mockUser.name}
							</Typography>
							<Avatar
								sx={{
									bgcolor: "#1976d2",
									width: 32,
									height: 32,
									cursor: "pointer",
								}}
								onClick={handleMenu}>
								{mockUser.name.charAt(0)}
							</Avatar>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My Posts</MenuItem>
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
