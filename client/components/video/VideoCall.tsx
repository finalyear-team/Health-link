"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Controls from "@/components/video/Controls ";

import Video from "./Video";
import { selectIsConnectedToRoom, selectLocalVideoTrackID, useAVToggle, useDevices, useHMSActions, useHMSStore, useScreenShare, useVideo, selectLocalPeer, selectRemotePeers, useHMSNotifications } from "@100mslive/react-sdk";
import useAuth from "@/hooks/useAuth";
import { AppointmentStatus, UserType } from "@/types/types";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_APPOINTMENT } from "@/graphql/mutations/appointmentMutations";
import useAppointmentStore from "@/store/appointmentStore";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";

const VideoCall = ({ role }: { role: any }) => {
  const localPeer = useHMSStore(selectLocalPeer)
  const remotePeers = useHMSStore(selectRemotePeers)
  console.log(role)
  const hmsActions = useHMSActions()
  const { toast } = useToast();
  const { selectedAppointment } = useAppointmentStore()
  const { showVideoChat, cancelVideoChat } = useAppointmentStore()
  const { user } = useAuth();
  const [openAlert, setOpenAlert] = useState(false)
  const notification = useHMSNotifications()

  console.log(notification)
  const { refetch } = useQuery(GET_USER_APPOINTMENTS, {
    variables: { userID: user?.UserID },
  });


  const [updateAppointmentStatus, { data: updateAppointmentData, loading, error }] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()
      cancelVideoChat()
      hmsActions.leave()
      toast({
        title: "Call ended",
        description: "Thank u .",
      });

    },
    onError: (error) => {
      console.error('Mutation error:', error);
      console.error("Error tment: ", error);

    }

  })


  const endCall = async () => {
    console.log(selectedAppointment)

    selectedAppointment &&
      updateAppointmentStatus({
        variables: {
          updateAppointmentInput: {
            AppointmentID: selectedAppointment.AppointmentID,
            DoctorID: selectedAppointment.DoctorID,
            PatientID: selectedAppointment.PatientID,
            Status: AppointmentStatus.COMPLETED
          }
        }
      }
      )

  };


  return (
    <div className="relative flex flex-col h-[80vh] bg-slate-200 justify-center items-center shadow-sm rounded mr-2">
      {/* Local Video Stream */}
      <div className="absolute top-[45.1%] right-5 w-[250px]  bg-white">
        <Video peer={localPeer}>
          Your browser does not support the video come on man.
        </Video>
      </div>
      {/* Remote Video Stream */
        remotePeers?.map((peer: any) =>
          <div className="w-full h-full">
            <Video peer={peer} >
              Your browser does not support the Video tag.
            </Video>
          </div>
        )

      }
      {/* Controls Component */}

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Controls onEndCall={endCall} role={role} setOpenAlert={setOpenAlert} />
      </div>
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Call Session?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the video call session? All participants will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button
                type="button"
                onClick={() => setOpenAlert(false)}
                className="btn-cancel "
              >
                Cancel
              </button>
            </AlertDialogCancel>
            <button
              type="button"
              onClick={endCall}
              className={`px-2 text-sm rounded-md text-black bg-slate-50 font-medium `}
            >
              confirm
            </button>
          </AlertDialogFooter>


        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default VideoCall;
