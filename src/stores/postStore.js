// src/stores/postStore.js - Zustand post store
import { create } from 'zustand'

export const usePostStore = create((set, get) => ({
  posts: [],
  currentPost: null,
  comments: [],
  tags: [],
  userLikedTags: [],
  
  setPosts: (posts) => set({ posts }),
  
  setCurrentPost: (post) => set({ currentPost: post }),
  
  setComments: (comments) => set({ comments }),
  
  setTags: (tags) => set({ tags }),
  
  setUserLikedTags: (tags) => set({ userLikedTags: tags }),
  
  updatePostLike: (postId, isLiked, likeCount) => {
    const { posts, currentPost } = get()
    
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, isLikedByUser: isLiked, likesCount: likeCount } : post
    )
    
    set({ posts: updatedPosts })
    
    if (currentPost && currentPost.id === postId) {
      set({ currentPost: { ...currentPost, isLikedByUser: isLiked, likesCount: likeCount } })
    }
  },
  
  addComment: (comment) => {
    const { comments, currentPost } = get()
    const newComments = [comment, ...comments]
    set({ comments: newComments })
    
    if (currentPost) {
      set({ 
        currentPost: { 
          ...currentPost, 
          commentsCount: currentPost.commentsCount + 1 
        } 
      })
    }
  },
  
  updateComment: (commentId, updatedComment) => {
    const { comments } = get()
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? updatedComment : comment
    )
    set({ comments: updatedComments })
  },
  
  removeComment: (commentId) => {
    const { comments, currentPost } = get()
    const filteredComments = comments.filter(comment => comment.id !== commentId)
    set({ comments: filteredComments })
    
    if (currentPost) {
      set({ 
        currentPost: { 
          ...currentPost, 
          commentsCount: Math.max(0, currentPost.commentsCount - 1) 
        } 
      })
    }
  }
}))