import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container, ShareButton } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from 'date-fns';

export default function Post()
{
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
 
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() =>
    {
        if (slug) {
            service.getPost(slug).then((post) =>
            {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            console.log("Deleting Post : ", post)
            const status = await service.deletePost({ slug: post.$id });
            if (status) {
                await service.deleteFile(post.featuredImage);
                navigate("/", { state: { message: "Post deleted successfully!" } });
            } else {
                alert("Failed to delete post.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Something went wrong while deleting the post.");
        }
    };
    
    const createdTime = post?.$createdAt
        ? formatDistanceToNow(new Date(post.$createdAt), { addSuffix: true })
        : '';

    return post ? (
        <div className="min-h-screen theme-bg-primary">
            <Container>
                {/* Hero Section with Featured Image */}
                <div className="relative w-full h-96 md:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Author Actions */}
                    {isAuthor && (
                        <div className="absolute top-6 right-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-green-600" className="shadow-lg">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost} className="shadow-lg">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </Button>
                        </div>
                    )}
                    
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mb-4 leading-tight">
                            {post.title}
                        </h1>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                {/* Author Avatar */}
                                <Link to={`/author/${post.userId}`} className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                                        {post.userName?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-semibold theme-text-primary group-hover:text-blue-600 transition-colors">
                                            {post.userName || 'Unknown Author'}
                                        </p>
                                        <p className="text-sm theme-text-secondary">
                                            {createdTime}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            
                            {/* Share Button */}
                            <div className="flex items-center gap-2">
                                <ShareButton post={post} />
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <article className="prose prose-lg max-w-none theme-bg-card rounded-2xl p-8 shadow-lg">
                        <div className="rich-text-content">
                            {parse(post.content)}
                        </div>
                    </article>

                    {/* Footer Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm theme-text-secondary">
                                    📖 Read more posts by{' '}
                                    <Link to={`/author/${post.userId}`} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                        {post.userName || 'Unknown Author'}
                                    </Link>
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm theme-text-secondary">
                                <span>📅 Published {createdTime}</span>
                                <span>•</span>
                                <span>📊 {post.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
