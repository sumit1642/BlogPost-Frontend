// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./components/HomePage"
import { LoginPage } from "./components/auth/LoginPage"
import { RegisterPage } from "./components/auth/RegisterPage"
import { CreatePost } from "./components/posts/CreatePost"
import { EditPost } from "./components/posts/EditPost"
import { MyPosts } from "./components/posts/MyPosts"
import { PostDetail } from "./components/posts/PostDetail"
import { UserPosts } from "./components/posts/UserPosts"

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
		// Home route
		{
			path: `/`,
			element: (
				<>
					<Navbar />
					<HomePage />
				</>
			),
		},
		// Auth routes
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
		// Post management routes
		{
			path: `/create-post`,
			element: (
				<>
					<Navbar />
					<CreatePost />
				</>
			),
		},
		{
			path: `/edit-post/:postId`,
			element: (
				<>
					<Navbar />
					<EditPost />
				</>
			),
		},
		{
			path: `/my-posts`,
			element: (
				<>
					<Navbar />
					<MyPosts />
				</>
			),
		},
		// Post viewing routes
		{
			path: `/post/:postId`,
			element: (
				<>
					<Navbar />
					<PostDetail />
				</>
			),
		},
		{
			path: `/user/:userId/posts`,
			element: (
				<>
					<Navbar />
					<UserPosts />
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
