import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    posts: []
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
            let id = action.payload.id;
            let likes = action.payload.likes;
            state.posts = state.posts.map((post) => 
                id === post.$id ? { ...post, likes: likes } : post
            );
        },
        setPosts(state, action) {
            state.posts = action.payload.posts;
        }
    }
});

export const { deletePost, addPost, setLikes, setPosts } = postSlice.actions;
export default postSlice.reducer;