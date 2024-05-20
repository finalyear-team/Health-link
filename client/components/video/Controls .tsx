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

import React, { useState } from "react";
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

const Controls = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const role = user?.unsafeMetadata.role;

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleAudio = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: "This is a test Toast",
      description: isMicOn ? "Microphone is OFF." : "Microphone is ON.",
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: "This is a test Toast",
      description: isVideoOn ? "Video is OFF." : "Video is ON",
    });
  };

  const endCall = () => {
    toast({
      title: "This is a test Toast",
      description: "Video Ended.",
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
          <TooltipTrigger>
            <Button onClick={toggleAudio} variant={"video"}>
              {isMicOn ? (
                <MdMicNone size={20} />
              ) : (
                <MdOutlineMicOff size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMicOn ? "Turn Mic off" : "Turn Mic on"}</p>
          </TooltipContent>
        </Tooltip>

        {/* camera control */}
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={toggleVideo} variant={"video"}>
              {isVideoOn ? (
                <MdOutlineVideocam size={20} />
              ) : (
                <MdOutlineVideocamOff size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMicOn ? "Turn Camera off" : "Turn Camera on"}</p>
          </TooltipContent>
        </Tooltip>

        {role === "provider" ? (
          // end call control
          <Tooltip>
            <TooltipTrigger>
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
            <TooltipTrigger>
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
          <TooltipTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"video"}>
                  <MdOutlineSettings size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
          <TooltipTrigger>
            <Button onClick={toggleFullScreen} variant={"video"}>
              {isFullScreen ? (
                <MdFullscreenExit size={20} />
              ) : (
                <MdFullscreen size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFullScreen ? "Exit Full Screen" : "Full Screen"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default Controls;
