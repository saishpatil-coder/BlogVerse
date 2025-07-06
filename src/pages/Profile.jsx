import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingPost, PostCard, UpdateUsernameForm } from '../components';
import { Query } from 'appwrite';
import service from '../appwrite/config';
import authService from '../appwrite/auth';
import { logout } from '../store/authSlice';

export default function Profile() {
  const user = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userPosts, setUserPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'saved'

  useEffect(() => {
    if (!authStatus) {
      navigate('/login');
    } else if (user?.$id) {
      // Fetch user posts
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

      // Fetch saved posts
      setSavedLoading(true);
      service
        .getBookmarkedPosts(user.$id)
        .then((res) => {
          if (res && res.documents) {
            setSavedPosts(res.documents);
          }
        })
        .catch((err) => {
          console.error('Error fetching saved posts:', err);
        })
        .finally(() => {
          setSavedLoading(false);
        });
    }
  }, [authStatus, navigate, user]);

  const avatar = user?.name?.[0]?.toUpperCase() || 'U';

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/');
    }).catch((err) => {
      console.error("Logout failed:", err);
    });
  };

  return (
    <div className="w-full">
      {/* Mobile: Instagram-style profile */}
      <div className="block md:hidden">
        {/* Profile Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-800 font-extrabold text-2xl">
                {avatar}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{user?.name || 'User'}</h2>
              <p className="text-sm text-gray-500">{user?.email || 'No email provided'}</p>
            </div>
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          {/* Settings Dropdown for Mobile */}
          {showSettingsDropdown && (
            <>
              <div className="absolute right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUpdateForm(true);
                      setShowSettingsDropdown(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Change Username
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowSettingsDropdown(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSettingsDropdown(false)}
                aria-hidden="true"
              />
            </>
          )}
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Posts ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'saved'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Saved ({savedPosts.length})
          </button>
        </div>

        {/* Mobile Posts Feed */}
        {activeTab === 'posts' ? (
          loading ? (
            <LoadingPost />
          ) : userPosts.length > 0 ? (
            <div>
              {userPosts.map((post) => (
                <div key={post.$id} className="w-full">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg">No posts yet.</p>
              <p className="text-sm">Start by creating your first one!</p>
            </div>
          )
        ) : (
          // Saved Posts Tab
          savedLoading ? (
            <LoadingPost />
          ) : savedPosts.length > 0 ? (
            <div>
              {savedPosts.map((post) => (
                <div key={post.$id} className="w-full">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg">No saved posts yet.</p>
              <p className="text-sm">Bookmark posts to see them here!</p>
            </div>
          )
        )}
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden md:block">
        <div className="py-8">
        <div className="bg-white p-6 w-full max-w-6xl mx-auto">
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
            <div className="relative">
              <button
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Settings"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* Settings Dropdown */}
              {showSettingsDropdown && (
                <>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowUpdateForm(true);
                          setShowSettingsDropdown(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Change Username
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowSettingsDropdown(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSettingsDropdown(false)}
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Desktop Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Posts ({userPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Saved ({savedPosts.length})
            </button>
          </div>

          {/* Posts Section */}
          <div className="w-full">
            {activeTab === 'posts' ? (
              <>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Posts</h3>
                {loading ? (
                  <LoadingPost />
                ) : userPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Saved Posts</h3>
                {savedLoading ? (
                  <LoadingPost />
                ) : savedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedPosts.map((post) => (
                      <PostCard key={post.$id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="text-lg">No saved posts yet.</p>
                    <p className="text-sm">Bookmark posts to see them here!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Update Username Modal */}
      {showUpdateForm && (
        <UpdateUsernameForm onClose={() => setShowUpdateForm(false)} />
      )}
    </div>
  );
}
