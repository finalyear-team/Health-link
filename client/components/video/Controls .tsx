"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
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
import { Volume2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectIsConnectedToRoom, selectLocalVideoTrackID, useAVToggle, useDevices, useHMSActions, useHMSStore, useScreenShare } from "@100mslive/react-sdk";

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
  const [inputAudioSetting, setInputAudioSetting] = useState("");
  const [inputVideoSetting, setInputVideoSetting] = useState("");
  const [speakerSetting, setspeakerSetting] = useState("");


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
              <DropdownMenuContent className="w-[250px]">
                <h2 className="text-lg font-semibold mb-1 p-2">
                  Device Setting
                </h2>
                {/* Audio */}
                <DropdownMenuLabel className="flex items-center">
                  <MdOutlineVideocam className="h-5 w-5 mr-2" />
                  Video
                </DropdownMenuLabel>
                <Select onValueChange={(value) => setInputVideoSetting(value)}>
                  <SelectTrigger className="bg-slate-100">
                    <SelectValue placeholder="Select device from the list" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="microphone">Microphone</SelectItem>
                  </SelectContent>
                </Select>
                {/* Microphone */}
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuLabel className="flex items-center">
                  <MdMicNone size={20} className="mr-2" />
                  Microphone
                </DropdownMenuLabel>
                <Select
                  onValueChange={(value) => setInputAudioSetting(value)}
                  defaultValue="default"
                >
                  <SelectTrigger className="bg-slate-100">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="default">
                      Default - External Microphone (Conexant ISST Audio)
                    </SelectItem>
                    <SelectItem value="microphone">Microphone</SelectItem>
                  </SelectContent>
                </Select>
                {/* speaker */}
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuLabel className="flex items-center">
                  <Volume2 className="h-5 w-5 mr-2" /> Speaker
                </DropdownMenuLabel>
                <Select
                  onValueChange={(value) => setspeakerSetting(value)}
                  defaultValue="default"
                >
                  <SelectTrigger className="bg-slate-100">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="default">
                      Default - Headphones (Conexant ISST Audio)
                    </SelectItem>
                    <SelectItem value="microphone">Microphone</SelectItem>
                  </SelectContent>
                </Select>

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
