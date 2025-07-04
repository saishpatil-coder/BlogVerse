import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingPost, LogOutBtn, PostCard } from '../components';
import { Query } from 'appwrite';
import service from '../appwrite/config';

export default function Profile() {
  const user = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authStatus) {
      navigate('/login');
    } else if (user?.$id) {
      setLoading(true);
      service
        .getPosts([Query.equal('userId', user.$id)])
        .then((res) => {
          if (res && res.documents) {
            setUserPosts(res.documents);
          }
        })
        .catch((err) => {
          console.error('Error fetching user posts:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [authStatus, navigate, user]);

  const avatar = user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <div className="w-full ">
      <div className="bg-white  p-6 w-full  ">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6 w-full">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-800 font-extrabold text-4xl">
                {avatar}
              </div>
            </div>
            {/* Name & Email */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</h2>
              <p className="text-gray-500">{user?.email || 'No email provided'}</p>
            </div>
          </div>
          <LogOutBtn className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200 shadow" />
        </div>

        <hr className="border-gray-300 mb-6" />

        {/* Posts Section */}
        <div className="w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Posts</h3>

          {loading ? (
            <LoadingPost />
          ) : userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {userPosts.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg">No posts yet.</p>
              <p className="text-sm">Start by creating your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
