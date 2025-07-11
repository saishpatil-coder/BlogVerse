import { useState } from "react";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../../appwrite/config";
import { toggleLike } from "../../store/postSlice";

export default function LikeButton({ postId }) {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const post = useSelector((state) => 
    state.post.posts.find(p => p.$id === postId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get like data from Redux store
  const likedBy = post?.likedBy || [];
  const likes = likedBy.length;
  const isLiked = user ? likedBy.includes(user.$id) : false;

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
      // Optimistically update UI
      dispatch(toggleLike({ postId, userId: user.$id }));

      // Heart animation
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);

      // Update backend
      await service.likePost(postId, user.$id);

      toast.success(isLiked ? "Removed like" : "Post liked!");
    } catch (error) {
      // Revert optimistic update on error
      dispatch(toggleLike({ postId, userId: user.$id }));
      toast.error("Error updating like.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <span
        className={`transition-transform duration-300 ease-in-out ${
          animate ? "scale-125" : "scale-100"
        }`}
        title={isLiked ? "Unlike" : "Like"}
      >
        {isLiked ? (
          <SolidHeart className="w-6 h-6 text-red-500" />
        ) : (
          <OutlineHeart className="w-6 h-6" />
        )}
      </span>
    </button>
  );
}
