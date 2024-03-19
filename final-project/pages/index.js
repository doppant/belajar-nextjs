import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import ShowPost from "@/components/ShowPost";
import SubmitPost from "@/components/SubmitPost"

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const handlePostSubmit = (response) => {
    // Handle post submission response here
    console.log('Post submitted:', response);
  };

  return (
    <>
    <Layout>
      <SubmitPost onPostSubmit={handlePostSubmit}/>
      <ShowPost/>
    </Layout>
    </>
  );
}
