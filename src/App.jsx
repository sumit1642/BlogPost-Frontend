// Final update to App.jsx to include all routes
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CssBaseline from "@mui/material/CssBaseline"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./components/HomePage"
import { LoginPage } from "./components/auth/LoginPage"
import { RegisterPage } from "./components/auth/RegisterPage"
import { PostDetail } from "./components/PostDetail"
import { ProfilePage } from "./components/ProfilePage"
import { MyPostsPage } from "./components/MyPostsPage"
import { TagsPage } from "./components/TagsPage"
import { TagPostsPage } from "./components/TagPostsPage"
import { AuthGuard } from "./components/AuthGuard"

export const BASE_URL = "http://localhost:3000"

// Create a client for React Query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	},
})

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
			path: "/",
			element: (
				<AuthGuard>
					<Navbar />
					<HomePage />
				</AuthGuard>
			),
		},
		{
			path: "/login",
			element: (
				<AuthGuard>
					<Navbar />
					<LoginPage />
				</AuthGuard>
			),
		},
		{
			path: "/register",
			element: (
				<AuthGuard>
					<Navbar />
					<RegisterPage />
				</AuthGuard>
			),
		},
		{
			path: "/post/:postId",
			element: (
				<AuthGuard>
					<Navbar />
					<PostDetail />
				</AuthGuard>
			),
		},
		{
			path: "/profile",
			element: (
				<AuthGuard requireAuth>
					<Navbar />
					<ProfilePage />
				</AuthGuard>
			),
		},
		{
			path: "/my-posts",
			element: (
				<AuthGuard requireAuth>
					<Navbar />
					<MyPostsPage />
				</AuthGuard>
			),
		},
		{
			path: "/tags",
			element: (
				<AuthGuard>
					<Navbar />
					<TagsPage />
				</AuthGuard>
			),
		},
		{
			path: "/tags/:tagId/posts",
			element: (
				<AuthGuard>
					<Navbar />
					<TagPostsPage />
				</AuthGuard>
			),
		},
	])

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={routes} />
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
