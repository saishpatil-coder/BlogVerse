import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container, ShareButton } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

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
    

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <ShareButton post={post} />
                    </div>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
