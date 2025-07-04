import { Link } from 'react-router-dom';
import service from '../../appwrite/config';
import { formatDistanceToNow } from 'date-fns';
import LikeButton from './LikeButton.jsx';

// Utility to strip HTML tags
function stripHTML(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

function PostCard({ post }) {
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

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-2xl hover:scale-[1.025] transition-all duration-300 overflow-hidden border border-gray-200">

      {/* Author */}
      <div className="flex items-center gap-2 p-4">
        <Link
          to={`/author/${userId}`}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-base shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`View posts by ${displayName}`}
        >
          {avatarInitial}
        </Link>
        <div className="flex flex-col">
          <Link
            to={`/author/${userId}`}
            className="text-sm text-gray-700 font-medium hover:underline cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View posts by ${displayName}`}
          >
            {displayName}
          </Link>
          {createdTime && (
            <span className="text-xs text-gray-400">{createdTime}</span>
          )}
        </div>
      </div>

      {/* Image with overlay and Like button */}
      <div className="relative w-full h-48">
        <img
          src={
            featuredImage
              ? service.getFilePreview(featuredImage)
              : '/sample.png'
          }
          alt={`Cover for ${title}`}
          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/60"></div>
        <div
          className="absolute bottom-3 right-3 z-10"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <LikeButton postId={$id} />
        </div>
      </div>

      {/* Title & Content links to full post */}
      <Link
        to={`/post/${$id}`}
        aria-label={`Read post: ${title}`}
        className="block group p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer"
      >
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {previewText}
        </p>
      </Link>
    </div>
  );
}

export default PostCard;
