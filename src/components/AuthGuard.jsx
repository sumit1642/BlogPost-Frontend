// src/components/AuthGuard.jsx
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { CircularProgress, Box } from "@mui/material"

export function AuthGuard({ children, requireAuth = false }) {
	const { isAuthenticated, isCheckingAuth } = useAuth()

	useEffect(() => {
		// This will trigger the auth check
	}, [])

	if (isCheckingAuth) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="200px">
				<CircularProgress />
			</Box>
		)
	}

	if (requireAuth && !isAuthenticated) {
		return null // Or redirect to login
	}

	return children
}
