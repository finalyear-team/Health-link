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
import useAuth from "@/hooks/useAuth";
import useVideoCallInfoStore from "@/store/videoCallInfo";
import { UserType } from "@/types/types";

const ConsultationPage = ({ role }: any) => {
  const { user } = useAuth() as any;
  const hmsActions = useHMSActions();
  const [Room, setRoom] = useState<any>();
  const [AuthToken, setAuthToken] = useState<any>();
  const { participants } = useParticipants();
  const notification = useHMSNotifications();
  const { toast } = useToast();
  const {
    appointmentId,
    doctorId,
    patientId,
    appointmentDate,
    appointmentTime,
    room,
  } = useVideoCallInfoStore()

  console.log(doctorId)


  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await getRoom({
          doctor: doctorId,
          patient: patientId,
          appointmentDate: appointmentDate,
          appointmentTime: appointmentTime,
        });
        console.log(response)
        setRoom(response?.room);
        if (user?.Role === UserType.DOCTOR) {
          setAuthToken(response?.hostToken);
        } else if (user?.Role === UserType.PATIENT) {
          setAuthToken(response?.memberToken);
        } else
          toast({
            title: "Token not created",
          });
      } catch (error) {
      }
    };
    fetchRoom();
  }, [user]);
  console.log(Room)

  useEffect(() => {
    const join = async () => {
      try {
        if (!AuthToken) return;
        const join = await hmsActions.join({
          userName: user.FullName,
          authToken: AuthToken,
        });
      } catch (error) {
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
