import { useState } from "react";
import { BookmarkIcon as OutlineBookmark } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmark } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../../appwrite/config";
import { toggleBookmark } from "../../store/postSlice";

export default function BookmarkButton({ postId }) {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const post = useSelector((state) => 
    state.post.posts.find(p => p.$id === postId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get bookmark data from Redux store
  const bookmarkedUserId = post?.bookmarkedUserId || [];
  const isBookmarked = user ? bookmarkedUserId.includes(user.$id) : false;

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Please login to bookmark posts.");
      navigate("/login");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      // Optimistically update UI
      dispatch(toggleBookmark({ postId, userId: user.$id }));

      // Bookmark animation
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);

      // Update backend
      await service.bookmarkPost(postId, user.$id);

      toast.success(isBookmarked ? "Removed from bookmarks" : "Post bookmarked!");
    } catch (error) {
      // Revert optimistic update on error
      dispatch(toggleBookmark({ postId, userId: user.$id }));
      toast.error("Error updating bookmark.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
    >
      <span
        className={`transition-transform duration-300 ease-in-out ${
          animate ? "scale-125" : "scale-100"
        }`}
        title={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        {isBookmarked ? (
          <SolidBookmark className="w-6 h-6 text-blue-600" />
        ) : (
          <OutlineBookmark className="w-6 h-6" />
        )}
      </span>
    </button>
  );
} 