import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    posts: [],
    loading:true
}

let postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            let post = action.payload.post;
            state.posts.push(post);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => 
                post.$id !== action.payload.post.$id
            );
        },
        setLikes(state, action) {
            const { postId, likedBy } = action.payload;
            state.posts = state.posts.map((post) => 
                post.$id === postId ? { ...post, likedBy: likedBy } : post
            );
        },
        toggleLike(state, action) {
            const { postId, userId } = action.payload;
            state.posts = state.posts.map((post) => {
                if (post.$id === postId) {
                    const likedBy = post.likedBy || [];
                    const isLiked = likedBy.includes(userId);
                    
                    if (isLiked) {
                        // Unlike: remove userId from likedBy array
                        return { ...post, likedBy: likedBy.filter(id => id !== userId) };
                    } else {
                        // Like: add userId to likedBy array
                        return { ...post, likedBy: [...likedBy, userId] };
                    }
                }
                return post;
            });
        },
        toggleBookmark(state, action) {
            const { postId, userId } = action.payload;
            state.posts = state.posts.map((post) => {
                if (post.$id === postId) {
                    const bookmarkedUserId = post.bookmarkedUserId || [];
                    const isBookmarked = bookmarkedUserId.includes(userId);
                    
                    if (isBookmarked) {
                        // Unbookmark: remove userId from bookmarkedUserId array
                        return { ...post, bookmarkedUserId: bookmarkedUserId.filter(id => id !== userId) };
                    } else {
                        // Bookmark: add userId to bookmarkedUserId array
                        return { ...post, bookmarkedUserId: [...bookmarkedUserId, userId] };
                    }
                }
                return post;
            });
        },
        setPosts(state, action) {
            state.posts = action.payload;
            state.loading = false 
        },
        setPostLoading(state,action){
            state.loading = action.payload
        }

    }
});

export const { deletePost, addPost, setLikes, setPosts, setPostLoading, toggleLike, toggleBookmark} = postSlice.actions;
export default postSlice.reducer;