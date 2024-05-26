import React from "react";
import Controls from "@/components/video/Controls ";

const VideoCall = () => {
  return (
    <div className="relative flex flex-col h-[80vh] bg-slate-200 justify-center items-center shadow-sm rounded mr-2">
      {/* Local Video Stream */}
      <video id="localVideo" autoPlay muted></video>
        Your browser does not support the video tag.
      {/* Remote Video Stream */}
      <video
        id="remoteVideo"
        autoPlay
        className="absolute top-1/2 right-5 w-32 h-32 rounded shadow-sm bg-white"
      >
        Your browser does not support the video tag.
      </video>
      {/* Controls Component */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Controls />
      </div>
    </div>
  );
};

export default VideoCall;
