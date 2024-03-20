import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "@heroicons/react/outline";
import Cookies from "js-cookie";
import Router from "next/router";
import Avatar from "react-avatar";
import { useQueries } from "@/hooks/UseQueries";
import { useMutation } from "@/hooks/UseMutation";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` }
  });
  const { mutate } = useMutation();

  useEffect(() => {
    const cookieLogin = Cookies.get("isLoggedIn");
    if (cookieLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const result = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/user/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!result.success) {
      console.log("gagal logout");
    } else {
      Cookies.remove("isLoggedIn");
      Cookies.remove("user_token");
      setIsLoggedIn(false);
      Router.push("/login");
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sanber Daily</h1>
        {isLoggedIn && (
          <div className="relative">
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={toggleDropdown}
            >
              <Avatar
                name={data && data.data ? data.data.name : ""}
                size={50}
                round
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <ul>
                  <li>
                    <Link href="/profil">
                      <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
                        Profile
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/notification">
                      <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
                        Notification
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
