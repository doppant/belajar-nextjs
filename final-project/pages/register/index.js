import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { FormControl, Label } from "flowbite-react";
import { useMutation } from "@/hooks/UseMutation";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";

function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await mutate({
        url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
        payload: {
          name, email, dob, phone, hobby, password
        }
      });
      console.log(result);
      if (!result.success) {
        toast.error("Registration failed", { position: "top-center", autoClose: 1000 });
      } else {
        toast.success("Registration successful", { position: "top-center", autoClose: 1500 });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
          </div>
          <FormControl onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </Label>
              <input
                type="text"
                id="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-4 text-black"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
              <input
                type="email"
                id="email"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-4 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
              <input
                type="password"
                id="password"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-4 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
              <input
                type="date"
                id="dob"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-4 text-black"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</Label>
              <input
                type="tel"
                id="phone"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-4 text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hobby" className="block text-sm font-medium text-gray-700">Hobby</Label>
              <input
                type="text"
                id="hobby"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-4 text-black"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </FormControl>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default RegisterPage;
