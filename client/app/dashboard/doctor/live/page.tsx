import Head from "next/head";
import VideoChatInitiation from "@/components/layout/video-chat";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Video Chat Interface</title>
        <meta
          name="description"
          content="A video chat interface built with Next.js and Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VideoChatInitiation />
      </main>
    </div>
  );
};

export default Home;
