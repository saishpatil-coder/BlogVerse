import React, { useEffect } from 'react';
import service from '../appwrite/config';
import { Container, LoadingPost, PostCard } from '../components/index';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setPosts, setPostLoading } from '../store/postSlice';

function Home() {
    const user = useSelector(state => state.auth);
    const posts = useSelector(state => state.post.posts);
    const loading = useSelector(state => state.post.loading);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
        }

        // Only fetch posts if they're not already loaded
        if ((posts || []).length === 0 && !loading) {
            dispatch(setPostLoading(true));
            service.getPosts()
                .then((response) => {
                    if (response) {
                        dispatch(setPosts(response.documents || []));
                    } else {
                        dispatch(setPosts([]));
                    }
                })
                .catch((err) => {
                    toast.error("Failed to load posts.");
                    console.error(err);
                    dispatch(setPosts([]));
                })
                .finally(() => {
                    dispatch(setPostLoading(false));
                });
        }
    }, [dispatch, location.state?.message, (posts || []).length, loading]);

    if (loading) {
        return (
            <div className='w-full py-8 mt-4 h-screen text-center'>
                <Container>
                    <LoadingPost/>
                </Container>
            </div>
        );
    }

    if ((posts || []).length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <h1 className='text-2xl font-bold text-gray-600'>
                        No posts found.
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full'>
            {/* Mobile: Instagram-style feed */}
            <div className='md:hidden'>
                {posts.map((post) => (
                    <div key={post.$id} className='w-full'>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
            
            {/* Desktop: Grid layout */}
            <div className='hidden md:block py-8'>
                <Container>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {posts.map((post) => (
                            <PostCard key={post.$id} post={post} />
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;
