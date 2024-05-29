"use client"
import Head from "next/head";
import VideoChatInitiation from "@/components/layout/video-chat";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Video Chat Interface</title>
        <meta
          name="description"
          title="HealthLink Live"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <VideoChatInitiation role={"doctor"}/>
      </div>
    </div>
  );
};

export default Home;
