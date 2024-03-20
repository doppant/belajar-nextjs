import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Avatar from "react-avatar";
import SubmitPost from "@/components/SubmitPost";
import ShowPost from "@/components/ShowPost";
import { useQueries } from "@/hooks/UseQueries";
import Layout from "@/components/Layout";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState([]);
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` }
  });

  // Ambil profil pengguna
  useEffect(() => {

  }, []);

  console.log(data);

  // //   if (loading || userPostsLoading) return <div>Loading...</div>;
  //   if (error || userPostsError) return <div>Error fetching data</div>;

  return (
    <Layout>
      <div className="container mx-auto mt-8 grid gap-8 w-[550px]">
        <div className="bg-gray-800 text-white rounded p-4">
          {/* Bagian atas profil */}
          <div className="flex items-center justify-center flex-col mb-4">
            <Avatar
              name={data && data.data ? data.data.name : ""}
              size="100"
              className="mx-auto mb-2"
              textSizeRatio={2}
              round
            />
            <div>
              <h2 className="text-lg font-semibold">{data.data.name}</h2>
              <p className="text-gray-400">{data.data.email}</p>
              <p className="text-gray-400">Hobby: {data.data.hobby}</p>
              <p className="text-gray-400">DOB: {data.data.dob}</p>
              <p className="text-gray-400">Phone: {data.data.phone}</p>
            </div>
          </div>
          {/* Bagian bawah profil */}
          <div className="mb-4">
            <SubmitPost />
          </div>
        </div>
        {/* Tampilkan postingan pengguna sendiri */}
        {/* <ShowPost posts={userPosts.filter(post => post.is_own_post)} /> */}
      </div>
    </Layout>
  );
}

export default ProfilePage;
