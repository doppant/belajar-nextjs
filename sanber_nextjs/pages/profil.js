import Layout from "@/layout";
import Image from "next/image";

export default function Profil({ children }) {
  return (
    <Layout metaTitle="Profil" metaDescription="Halaman ini mengenai profil">
      <p>Profil</p>
      <Image src="/next.png" width={400} height={400} alt="next img"/>
      <img src="/next.png" style={{width:400, height:400}} alt="next img"/>
    </Layout>
  );
}