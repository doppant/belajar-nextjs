import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, metaTitle }) {
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="viewport" content="width=device-width initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
