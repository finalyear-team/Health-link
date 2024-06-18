"use client";

import VideoCall from "@/components/video/VideoCall";
import ParticipantList from "@/components/video/ParticipantList ";
import { useUser } from "@clerk/nextjs";
import {
  selectLocalPeer,
  selectRemotePeers,
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
  useParticipants,
  useVideo,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import { getRoom } from "@/Services/videoCallServices";
import { toast, useToast } from "../ui/use-toast";
import Chat from "../layout/chat/chat";

const ConsultationPage = ({ role }: any) => {
  const { user } = useUser() as any;
  const hmsActions = useHMSActions();
  const [Room, setRoom] = useState<any>();
  const [AuthToken, setAuthToken] = useState<any>();
  const { participants } = useParticipants();
  const notification = useHMSNotifications();
  const { toast } = useToast();

  if (user) console.log(user.id);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await getRoom({
          doctor: "user_2h0T5Y17niLD8kejPXXEPx4j1ME",
          patient: "user_2gjqwG6Txeg2XAHHZ56zy5kvITA",
          appointmentDate: "29/05/2024",
          appointmentTime: "06:40 pm",
        });
        setRoom(response.room);
        if (role.includes("doctor")) {
          setAuthToken(response.hostToken);
        } else if (role.includes("patient")) {
          setAuthToken(response.memberToken);
        } else
          toast({
            title: "Token not created",
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, []);
  useEffect(() => {
    const join = async () => {
      try {
        if (!AuthToken) return;
        const join = await hmsActions.join({
          userName: user.fullName,
          authToken: AuthToken,
        });
      } catch (error) {
        console.log(error);
      }
    };
    join();
  }, [AuthToken, Room]);

  return (
    <div className="flex flex-wrap">
      {/* Video Call Area */}
      <div className="flex-grow w-full md:w-3/4 mb-2">
        <VideoCall />
      </div>

      {/* Participant List */}
      <div className="w-full md:w-1/4">
        {/* <ParticipantList participants={participants} /> */}
        {/* <ChatBox /> */}
        <div>
          <Chat includeSider={false} />
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
