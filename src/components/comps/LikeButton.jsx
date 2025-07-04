import { useEffect, useState } from "react";
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import service from '../../appwrite/config'; // adjust as per your project
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      const post = await service.getPost(postId);
      const likes = post.likedBy?.length || 0;

      setLikes(likes || 0);
      if (user) {
        setLiked(post.likedBy?.includes(user.$id));
      }
    };
    fetchPost();
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) {
      //give alert and when placed okay navigate to login page
      alert("Please login to like a post");
      navigate("/login");
      return;
    }

    const updated = await service.likePost(postId, user.$id);
    if (liked) {
      setLikes((prev) => Math.max(prev - 1, 0));
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleLike(e);
      }}
      className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-md transition-all cursor-pointer"
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <span className="transition-transform duration-300 ease-in-out">
        {liked ? (
          <SolidHeart className="w-5 h-5 text-red-500 group-hover:scale-110" />
        ) : (
          <OutlineHeart className="w-5 h-5 text-gray-600 group-hover:scale-110" />
        )}
      </span>
      <span className="text-xs font-medium text-gray-800">{likes}</span>
    </button>
  );
  
}
