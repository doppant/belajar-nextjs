import { useState } from "react";
import Cookies from "js-cookie";
import SubmitPost from "./SubmitPost"; // Komponen untuk menambah dan mengedit post
import { useMutation } from "@/hooks/UseMutation"; // Impor useMutation

function EditPostModal({ post, onEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);

  const { mutate: editPost, isError: editError } = useMutation();

  const handleEditSubmit = async () => {
    try {
      const response = await editPost({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${post.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        payload: { description: editedDescription },
      });

      if (!response) {
        throw new Error("Failed to edit post");
      }

      // Perbarui post di antarmuka pengguna setelah berhasil mengedit
      onEdit(post.id, editedDescription);

      // Tutup modal setelah berhasil
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)}>Edit</button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 w-96 rounded-lg">
            <SubmitPost
              initialDescription={editedDescription}
              onPostSubmit={handleEditSubmit}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EditPostModal;
