import Head from "next/head";
import VideoChatInitiation from "@/components/layout/video-chat";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Video Chat Interface</title>
        <meta
          name="description"
          content="A video chat interface built with Next.js and Tailwind CSS"
          title="HealthLink Live"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <VideoChatInitiation />
      </div>
    </div>
  );
};

export default Home;
