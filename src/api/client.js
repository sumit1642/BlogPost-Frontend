const BASE_URL = "http://localhost:3000"

class ApiClient {
	async request(endpoint, options = {}) {
		const url = `${BASE_URL}${endpoint}`
		const config = {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		}

		const response = await fetch(url, config)
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message || "API request failed")
		}

		return data
	}

	// Auth endpoints
	async login(credentials) {
		return this.request("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(credentials),
		})
	}

	async register(userData) {
		return this.request("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		})
	}

	async logout() {
		return this.request("/api/auth/logout", {
			method: "POST",
		})
	}

	async refreshToken() {
		return this.request("/api/auth/refresh", {
			method: "POST",
		})
	}

	// Posts endpoints
	async getPosts(published = true) {
		const query = published ? "?published=true" : "?published=false"
		return this.request(`/api/posts${query}`)
	}

	async getPost(postId) {
		return this.request(`/api/posts/${postId}`)
	}

	async createPost(postData) {
		return this.request("/api/posts", {
			method: "POST",
			body: JSON.stringify(postData),
		})
	}

	async updatePost(postId, postData) {
		return this.request(`/api/posts/${postId}`, {
			method: "PUT",
			body: JSON.stringify(postData),
		})
	}

	async deletePost(postId) {
		return this.request(`/api/posts/${postId}`, {
			method: "DELETE",
		})
	}

	async getUserPosts(userId) {
		return this.request(`/api/posts/user/${userId}`)
	}

	async getMyPosts() {
		return this.request("/api/posts/my/posts")
	}

	// Interactions endpoints
	async toggleLike(postId) {
		return this.request(`/api/interactions/posts/${postId}/like`, {
			method: "POST",
		})
	}

	async getComments(postId) {
		return this.request(`/api/interactions/posts/${postId}/comments`)
	}

	async addComment(postId, content) {
		return this.request(`/api/interactions/posts/${postId}/comments`, {
			method: "POST",
			body: JSON.stringify({ content }),
		})
	}

	async updateComment(commentId, content) {
		return this.request(`/api/interactions/comments/${commentId}`, {
			method: "PUT",
			body: JSON.stringify({ content }),
		})
	}

	async deleteComment(commentId) {
		return this.request(`/api/interactions/comments/${commentId}`, {
			method: "DELETE",
		})
	}

	// Profile endpoints
	async getProfile() {
		return this.request("/api/profile")
	}

	async updateProfile(profileData) {
		return this.request("/api/profile", {
			method: "PUT",
			body: JSON.stringify(profileData),
		})
	}

	// Tags endpoints
	async getTags() {
		return this.request("/api/tags")
	}

	async getPostsByTag(tagId) {
		return this.request(`/api/tags/${tagId}/posts`)
	}

	async addTagToPost(postId, tagName) {
		return this.request(`/api/tags/posts/${postId}`, {
			method: "POST",
			body: JSON.stringify({ tagName }),
		})
	}

	async removeTagFromPost(postId, tagId) {
		return this.request(`/api/tags/posts/${postId}/${tagId}`, {
			method: "DELETE",
		})
	}

	async getUserLikedTags() {
		return this.request("/api/tags/liked")
	}
}

export const apiClient = new ApiClient()
