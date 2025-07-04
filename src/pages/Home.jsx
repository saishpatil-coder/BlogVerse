import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, FullPageLoader, Loading, LoadingComponent, LoadingPost, LoadingSplash, PostCard } from '../components/index';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
    const user = useSelector(state => state.auth);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);

        if (location.state?.message) {
            toast.success(location.state.message);
        }

        service.getPosts()
            .then((response) => {
                if (response) {
                    setPosts(response.documents || []);
                } else {
                    setPosts([]);
                }
            })
            .catch((err) => {
                toast.error("Failed to load posts.");
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    if (isLoading) {
        return (
            <div className='w-full py-8 mt-4 h-screen text-center'>
                <Container>
                    <LoadingPost/>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
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
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
