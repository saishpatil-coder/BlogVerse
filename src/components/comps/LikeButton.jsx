import { useEffect, useState } from "react";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../../appwrite/config";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const post = await service.getPost(postId);
        setLikes(post.likedBy?.length || 0);
        if (user) setLiked(post.likedBy?.includes(user.$id));
      } catch (error) {
        toast.error("Failed to fetch likes");
      }
    };
    fetchLikes();
  }, [postId, user]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Please login to like posts.");
      navigate("/login");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
      await service.likePost(postId, user.$id);


      // Heart animation
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);

      toast.success(liked ? "Removed like" : "Post liked!");
    } catch (error) {
      toast.error("Error updating like.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-md transition-all cursor-pointer"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <span
  className={`transition-transform duration-300 ease-in-out ${
    animate ? "scale-125" : "scale-100"
  }`}

        title={liked ? "Unlike" : "Like"}
      >
        {liked ? (
          <SolidHeart className="w-5 h-5 text-red-500" />
        ) : (
          <OutlineHeart className="w-5 h-5 text-gray-600" />
        )}
      </span>
      <span
  className={`transition-transform duration-300 ease-in-out ${
    animate ? "scale-125" : "scale-100"
  }`}
>
{likes}</span>
    </button>
  );
}
