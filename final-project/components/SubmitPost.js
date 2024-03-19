import { useState } from 'react';
import { useMutation } from '@/hooks/UseMutation';
import Cookies from 'js-cookie';

const SubmitPost = ({ onPostSubmit }) => {
  const [description, setDescription] = useState('');
  const { mutate } = useMutation();

  const handlePostSubmit = async () => {
    try {
      const response = await mutate({
        url: 'https://paace-f178cafcae7b.nevacloud.io/api/post',
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
          'Content-Type': 'application/json',
        },
        payload: { description },
      });

      window.location.reload();
      if (response) {
        onPostSubmit(response);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 grid gap-8 w-[550px]">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full h-20 p-2 border rounded-md resize-none text-black"
      ></textarea>
      <button
        onClick={handlePostSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
      >
        Post
      </button>
    </div>
  );
};

export default SubmitPost;
