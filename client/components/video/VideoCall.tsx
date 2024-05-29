"use client"
import React, { useEffect } from "react";
import Controls from "@/components/video/Controls ";
import { selectLocalPeer, selectRemotePeers, useHMSActions, useHMSStore, useVideo } from "@100mslive/react-sdk";
import Video from "./Video";

const VideoCall = () => {
  const localPeer=useHMSStore(selectLocalPeer)
  const remotePeers=useHMSStore(selectRemotePeers)

  return (
    <div className="relative flex flex-col h-[80vh] bg-slate-200 justify-center items-center shadow-sm rounded mr-2">
      {/* Local Video Stream */}
      <div className="absolute top-[45.1%] right-5 w-[250px]  bg-white">
        <Video peer={localPeer}>
        Your browser does not support the video come on man.
        </Video>     
        </div>
      {/* Remote Video Stream */
      remotePeers?.map((peer:any)=>
        <div className="w-full h-full"> 
        <Video peer={peer} >
      Your browser does not support the Video tag.
    </Video>
        </div>     
      )

}
      {/* Controls Component */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Controls />
      </div>
    </div>
  );
};

export default VideoCall;
