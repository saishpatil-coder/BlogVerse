import { Link } from 'react-router-dom';
import service from '../../appwrite/config';
import { formatDistanceToNow } from 'date-fns';

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
    $createdAt
  } = post;

  const displayName = userName || 'Unknown';
  const avatarInitial = displayName.charAt(0).toUpperCase() || 'U';
  const createdTime = $createdAt
    ? formatDistanceToNow(new Date($createdAt), { addSuffix: true })
    : '';
  const previewText = content ? stripHTML(content).slice(0, 100) + '...' : '';

  return (
    <Link
      to={`/post/${$id}`}
      aria-label={`Read post: ${title}`}
      className="block group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 rounded-xl"
      tabIndex={0}
    >
      <div className="bg-white rounded-xl shadow hover:shadow-2xl hover:scale-[1.025] transition-all duration-300 overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400">

        {/* Avatar + Display Name */}
        <div className="flex items-center gap-2 p-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-base shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-300">
            {avatarInitial}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 font-medium">
              {displayName}
            </span>
            {createdTime && (
              <span className="text-xs text-gray-400">
                {createdTime}
              </span>
            )}
          </div>
        </div>

        {/* Image with overlay */}
        <div className="relative w-full h-48">
          {featuredImage ? (
            <>
              <img
                src={service.getFilePreview(featuredImage)}
                alt={`Cover for ${title}`}
                className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/60"></div>
            </>
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Title & Content */}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
            {title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {previewText}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
