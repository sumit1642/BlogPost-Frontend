import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./components/HomePage"
import { LoginPage } from "./components/auth/LoginPage"
import { RegisterPage } from "./components/auth/RegisterPage"

// export const BASE_URL = "http://localhost:3000"
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
		<>
			<RouterProvider router={routes} />
		</>
	)
}

export default App
