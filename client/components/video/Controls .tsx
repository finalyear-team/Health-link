// "use client";

// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { useUser } from "@clerk/nextjs";
// import AudioSettings from "./AudioSettings ";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   MdOutlineKeyboardVoice,
//   MdOutlineVideocam,
//   MdOutlineVideocamOff,
//   MdOutlineCallEnd,
//   MdFullscreen,
//   MdFullscreenExit,
//   MdOutlineSettings,
//   MdLogout,
// } from "react-icons/md";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Controls = () => {
//   const { toast } = useToast();
//   const { user } = useUser();
//   const role = user?.unsafeMetadata.role;

//   const toggleAudio = () => {
//     toast({
//       title: "This is a test Toast",
//       description: "Audio button is toggled.",
//     });
//   };

//   const toggleVideo = () => {
//     toast({
//       title: "This is a test Toast",
//       description: "Video button is toggled.",
//     });
//   };

//   const endCall = () => {
//     toast({
//       title: "This is a test Toast",
//       description: "Video Ended.",
//     });
//   };

//   const fullScreen = () => {
//     toast({
//       title: "This is a test Toast",
//       description: "Full Screened.",
//     });
//   };

//   return (
//     <TooltipProvider>
//       <div className="flex justify-center items-end mt-4 space-x-2">
//         {/* audio control */}
//         <AudioSettings />
//         {/* microphone control */}
//         <Tooltip>
//           <TooltipTrigger>
//             {" "}
//             <Button onClick={toggleAudio} variant={"video"}>
//               <MdOutlineKeyboardVoice size={20} />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Microphone</p>
//           </TooltipContent>
//         </Tooltip>

//         {/* camera control */}
//         <Tooltip>
//           <TooltipTrigger>
//             {" "}
//             <Button onClick={toggleVideo} variant={"video"}>
//               <MdOutlineVideocam size={20} />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Camera</p>
//           </TooltipContent>
//         </Tooltip>

//         {role === "provider" ? (
//           // end call control
//           <Tooltip>
//             <TooltipTrigger>
//               {" "}
//               <Button onClick={endCall} variant={"destructive"}>
//                 <MdOutlineCallEnd size={20} />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>End Call</p>
//             </TooltipContent>
//           </Tooltip>
//         ) : role === "patient" ? (
//           // Leave call control
//           <Tooltip>
//             <TooltipTrigger>
//               {" "}
//               <Button onClick={endCall} variant={"destructive"}>
//                 <MdLogout size={20} />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>Leave Call</p>
//             </TooltipContent>
//           </Tooltip>
//         ) : (
//           ""
//         )}

//         {/* Settings control */}
//         <Tooltip>
//           <TooltipTrigger>
//             {" "}
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 {" "}
//                 <Button onClick={endCall} variant={"video"}>
//                   <MdOutlineSettings size={20} />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>Audio Input Device</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Default</DropdownMenuItem>
//                 <DropdownMenuItem>Microphone</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Setting</p>
//           </TooltipContent>
//         </Tooltip>

//         {/* Full screen control */}
//         <Tooltip>
//           <TooltipTrigger>
//             {" "}
//             <Button onClick={fullScreen} variant={"video"}>
//               <MdFullscreen size={20} />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Full Screen</p>
//           </TooltipContent>
//         </Tooltip>
//       </div>
//     </TooltipProvider>
//   );
// };

// export default Controls;

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import AudioSettings from "./AudioSettings ";
import { useToast } from "@/components/ui/use-toast";
import {
  MdMicNone,
  MdOutlineMicOff,
  MdOutlineVideocam,
  MdOutlineVideocamOff,
  MdOutlineCallEnd,
  MdFullscreen,
  MdFullscreenExit,
  MdOutlineSettings,
  MdLogout,
  MdScreenShare,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeviceType, selectIsConnectedToRoom, selectLocalVideoTrackID, useAVToggle, useDevices, useHMSActions, useHMSStore, useScreenShare } from "@100mslive/react-sdk";

const Controls = () => {
  const { isLocalVideoEnabled, isLocalAudioEnabled, toggleAudio, toggleVideo} = useAVToggle();
  const {screenShareAudioTrackId,screenShareVideoTrackId,toggleScreenShare}=useScreenShare()
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions=useHMSActions()
  const { toast } = useToast();
  const { user } = useUser();
  const { allDevices, selectedDeviceIDs, updateDevice } = useDevices();
  const { videoInput, audioInput, audioOutput } = allDevices;
  const videoTrackId = useHMSStore(selectLocalVideoTrackID);

  const role = user?.unsafeMetadata.role;

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("unload",()=>{
      if(isConnected)
       hmsActions.leave()
    })
    return  window.removeEventListener("unload",()=>{
         console.log("component unmounted")
    })
  }, [hmsActions]);

  const handleDeviceChange = (deviceId: string, deviceType: DeviceType) => {
        updateDevice({ deviceId, deviceType });
      };
  const endCall = () => {
     hmsActions.leave()
    toast({
      title: "Call ended",
      description: "Thank u .",
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    toast({
      title: "This is a test Toast",
      description: isFullScreen
        ? "Exited Full Screen."
        : "Entered Full Screen.",
    });
  };

  return (
    <TooltipProvider>
      <div className="flex justify-center items-end mt-4 space-x-2">
        {/* audio control */}
        <AudioSettings />
        {/* microphone control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggleAudio} variant={"video"}>
              {isLocalAudioEnabled ? (
                <MdMicNone size={20} />
              ) : (
                <MdOutlineMicOff size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isLocalAudioEnabled ? "Turn Mic off" : "Turn Mic on"}</p>
          </TooltipContent>
        </Tooltip>

        {/* camera control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggleVideo} variant={"video"}>
              {isLocalVideoEnabled ? (
                <MdOutlineVideocam size={20} />
              ) : (
                <MdOutlineVideocamOff size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isLocalVideoEnabled ? "Turn Camera off" : "Turn Camera on"}</p>
          </TooltipContent>
        </Tooltip>

        {role === "provider" ? (
          // end call control
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={endCall} variant={"destructive"}>
                <MdOutlineCallEnd size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>End Call</p>
            </TooltipContent>
          </Tooltip>
        ) : role === "patient" ? (
          // Leave call control
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={endCall} variant={"destructive"}>
                <MdLogout size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Leave Call</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          ""
        )}

        {/* Settings control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"video"}>
                  <MdOutlineSettings size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuLabel>Audio Input Device</DropdownMenuLabel>
                <DropdownMenuSeparator />                
                <DropdownMenuItem>Default</DropdownMenuItem>
                <DropdownMenuItem>Microphone</DropdownMenuItem>
                <DropdownMenuLabel>Audio Input Device</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Default</DropdownMenuItem>
                <DropdownMenuItem>Microphone</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Setting</p>
          </TooltipContent>
        </Tooltip>

        {/* Full screen control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggleFullScreen} variant={"video"}>
              {isFullScreen ? (
                <MdScreenShare size={20} />
              ) : (
                <MdScreenShare size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>screen share</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default Controls;
