import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import service from '../../appwrite/config';
import { formatDistanceToNow } from 'date-fns';
import LikeButton from './LikeButton.jsx';
import BookmarkButton from './BookmarkButton.jsx';
import ShareButton from './ShareButton.jsx';
import { deletePost } from '../../store/postSlice';
import { toast } from 'react-toastify';

// Utility to strip HTML tags
function stripHTML(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

function PostCard({ post }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  
  const {
    $id,
    title,
    content,
    featuredImage,
    userName,
    userId,
    $createdAt
  } = post;

  const displayName = userName || 'Unknown';
  const avatarInitial = displayName.charAt(0).toUpperCase() || 'U';
  const createdTime = $createdAt
    ? formatDistanceToNow(new Date($createdAt), { addSuffix: true })
    : '';
  const previewText = content ? stripHTML(content).slice(0, 100) + '...' : '';
  
  // Check if current user is the author
  const isAuthor = user && user.$id === userId;

  const handleDelete = async () => {
    if (!isAuthor) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await service.deletePost({ slug: $id });
        if (featuredImage) {
          await service.deleteFile(featuredImage);
        }
        dispatch(deletePost({ post: { $id } }));
        toast.success('Post deleted successfully!');
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete post.');
      } finally {
        setIsDeleting(false);
        setShowMenu(false);
      }
    }
  };

  const handleEdit = () => {
    if (!isAuthor) return;
    navigate(`/edit-post/${$id}`);
    setShowMenu(false);
  };

  return (
    <div className="theme-bg-card md:rounded-xl theme-shadow md:hover:shadow-lg md:hover:scale-[1.025] transition-all duration-300 overflow-hidden theme-border border-b md:border mb-4 md:mb-0">

      {/* Author Header - Instagram Style */}
      <div className="flex items-center justify-between p-3 md:p-4">
        <div className="flex items-center gap-3">
          <Link
            to={`/author/${userId}`}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm md:text-base shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View posts by ${displayName}`}
          >
            {avatarInitial}
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/author/${userId}`}
              className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View posts by ${displayName}`}
            >
              {displayName}
            </Link>
            {createdTime && (
              <span className="text-xs text-gray-500">{createdTime}</span>
            )}
          </div>
        </div>
        
        {/* Instagram-style three dots menu */}
        {isAuthor && (
          <div className="relative">
            <button 
              className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleEdit}
                      disabled={isDeleting}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                  aria-hidden="true"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Image - Instagram Style */}
      <div className="relative w-full bg-gray-100">
        <div className="flex justify-center items-center">
          <img
            src={
              featuredImage
                ? service.getFilePreview(featuredImage)
                : '/sample.png'
            }
            alt={`Cover for ${title}`}
            className="object-contain w-full max-h-96 md:max-h-48"
            loading="lazy"
          />
        </div>
      </div>

      {/* Actions Section - Instagram Style */}
      <div className="p-3 md:p-4">
        {/* Like and other actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <LikeButton postId={$id} />
            {/* Comment button */}
            <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            {/* Share button */}
            <ShareButton post={post} />
          </div>
          {/* Bookmark button */}
          <BookmarkButton postId={$id} />
        </div>

        {/* Title & Content - Instagram Style */}
        <Link
          to={`/post/${$id}`}
          aria-label={`Read post: ${title}`}
          className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer"
        >
          <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 mb-1">
            {title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {previewText}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
