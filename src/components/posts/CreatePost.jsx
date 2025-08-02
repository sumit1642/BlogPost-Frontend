// src/components/posts/CreatePost.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostForm } from "./PostForm"

export const CreatePost = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (formData) => {
		setLoading(true)
		setError("")

		// Simulate API call
		setTimeout(() => {
			console.log("Creating post:", formData)
			// Mock success
			navigate("/my-posts")
			setLoading(false)
		}, 1000)

		// Future API call will be:
		// try {
		//   const response = await fetch(`${BASE_URL}/api/posts`, {
		//     method: "POST",
		//     headers: { "Content-Type": "application/json" },
		//     credentials: "include",
		//     body: JSON.stringify(formData),
		//   })
		//   const data = await response.json()
		//   if (data.status === "success") {
		//     navigate("/my-posts")
		//   } else {
		//     setError(data.message)
		//   }
		// } catch (error) {
		//   setError("Failed to create post. Please try again.")
		// } finally {
		//   setLoading(false)
		// }
	}

	return (
		<PostForm
			title="Create New Post"
			submitButtonText="Create Post"
			onSubmit={handleSubmit}
			loading={loading}
			error={error}
		/>
	)
}
