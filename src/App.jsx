// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./components/HomePage"
import { LoginPage } from "./components/auth/LoginPage"
import { RegisterPage } from "./components/auth/RegisterPage"

// Base URL for API calls - will be used later
export const BASE_URL = "http://localhost:3000"

// Custom Material UI theme
const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#757575",
		},
		background: {
			default: "#fafafa",
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 8,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 12,
				},
			},
		},
	},
})

function App() {
	const routes = createBrowserRouter([
		{
			path: `/`,
			element: (
				<>
					<Navbar />
					<HomePage />
				</>
			),
		},
		{
			path: `/login`,
			element: (
				<>
					<Navbar />
					<LoginPage />
				</>
			),
		},
		{
			path: `/register`,
			element: (
				<>
					<Navbar />
					<RegisterPage />
				</>
			),
		},
	])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={routes} />
		</ThemeProvider>
	)
}

export default App
