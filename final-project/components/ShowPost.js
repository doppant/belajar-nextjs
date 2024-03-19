import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Avatar from 'react-avatar';
import { HeartIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { useQueries } from '@/hooks/UseQueries';
import { useMutation } from '@/hooks/UseMutation';

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { mutate: likePost } = useMutation();
  const { mutate: unlikePost } = useMutation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all", {
          headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLikeToggle = async (postId, isLiked) => {
    try {
      if (!likePost || !unlikePost) {
        console.error('Mutation functions are not available.');
        return;
      }

      const mutationFunction = isLiked ? unlikePost : likePost;

      await mutationFunction({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/${isLiked ? 'un' : ''}likes/post/${postId}`,
        method: 'POST',
        headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
      });

      // Update posts data after successful like/unlike
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            is_like_post: !isLiked,
            likes_count: isLiked ? post.likes_count - 1 : post.likes_count + 1,
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditPost = async (postId) => {
    // Implement edit post logic here
    console.log('Edit post:', postId);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Handle success
      console.log('Post deleted successfully');

      // Update posts data after successful deletion
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleToggleDropdown = (postId) => {
    setShowDropdown(!showDropdown);
    setSelectedPostId(postId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="container mx-auto mt-8 grid gap-8 w-[550px]">
      {posts.map((post) => (
        <div key={post.id} className="relative">
          <div className="flex flex-col bg-gray-800 text-white rounded p-4">
            {/* Bagian atas card */}
            <div className="flex items-center justify-between mb-4">
              <Avatar
                name={post.user ? post.user.name : "Unknown User"}
                size='50'
                className="mr-2"
              />
              <div>
                <h2 className="text-lg font-semibold">{post.user ? post.user.name : "Unknown User"}</h2>
                <p className="text-gray-400">{post.user ? post.user.email : "No Email"}</p>
              </div>
              {post.is_own_post && (
                <div className="relative">
                  <button onClick={() => handleToggleDropdown(post.id)} className="focus:outline-none">
                    <svg className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                  {showDropdown && selectedPostId === post.id && (
                    <div className="absolute right-0 mt-2 w-24 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <div className="py-1">
                        <button onClick={() => handleEditPost(post.id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</button>
                        <button onClick={() => handleDeletePost(post.id)} className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900" role="menuitem">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Bagian tengah card */}
            <div className="mb-4">
              <p className="text-gray-300">{post.description}</p>
            </div>
            {/* Bagian bawah card */}
            <div className="flex justify-between">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleLikeToggle(post.id, post.is_like_post)}
              >
                {post.is_like_post ? (
                  <HeartIconSolid className="h-5 w-5 mr-2 inline-block" /> 
                ) : (
                  <HeartIconOutline className="h-5 w-5 mr-2 inline-block" />
                )}
                {post.likes_count}
              </button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Replies {post.replies_count}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
