import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Avatar from "react-avatar";
import SubmitPost from "@/components/SubmitPost";
import ShowPost from "@/components/ShowPost";
import Layout from "@/components/Layout";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/user/me", {
          headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  console.log(user);

  return (
    <Layout>
      <div className="container mx-auto mt-8 grid gap-8 w-[550px]">
        {user && user.data ? (
          <>
            {/* Bagian atas profil */}
            <div className="flex items-center justify-center flex-col mb-4">
              <Avatar
                name={user.data.name}
                size="100"
                className="mx-auto mb-2"
                textSizeRatio={2}
                round
              />
              <div>
                <h2 className="text-lg font-semibold">{user.data.name}</h2>
                <p className="text-gray-400">{user.data.email}</p>
                <p className="text-gray-400">Hobby: {user.data.hobby}</p>
                <p className="text-gray-400">DOB: {user.data.dob}</p>
                <p className="text-gray-400">Phone: {user.data.phone}</p>
              </div>
            </div>
            {/* Bagian bawah profil */}
            <div className="mb-4">
              <SubmitPost />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {/* Tampilkan postingan pengguna sendiri */}
        {/* <ShowPost posts={userPosts.filter(post => post.is_own_post)} /> */}
      </div>
    </Layout>
  );
}

export default ProfilePage;
