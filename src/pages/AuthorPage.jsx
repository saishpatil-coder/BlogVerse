import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostCard, LoadingPost } from '../components';
import { Query } from 'appwrite';
import service from '../appwrite/config';

export default function AuthorPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    setLoading(true);
    console.log("userId", userId); 
    service
      .getPosts([Query.equal('userId', userId)])
      .then((res) => {
        if (res && res.documents) {
          setPosts(res.documents);
          if (res.documents.length > 0) {
            setAuthorName(res.documents[0].userName || 'Author');
          } else {
            setAuthorName('Author');
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching author posts:', err);
        setAuthorName('Author');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="w-full">
      {/* Mobile: Instagram-style feed */}
      <div className="md:hidden">
        {/* Author Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 text-center">Posts by {authorName}</h2>
        </div>
        
        {/* Mobile Posts Feed */}
        {loading ? (
          <LoadingPost />
        ) : posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post.$id} className="w-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">No posts found for this author.</p>
          </div>
        )}
      </div>
      
      {/* Desktop: Grid layout */}
      <div className="hidden md:block p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Posts by {authorName}</h2>
        {loading ? (
          <LoadingPost />
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">No posts found for this author.</p>
          </div>
        )}
      </div>
    </div>
  );
} 