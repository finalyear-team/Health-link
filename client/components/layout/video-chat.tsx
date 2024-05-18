"use client";

import VideoCall from "@/components/video/VideoCall";
import Controls from "@/components/video/Controls ";
import ParticipantList from "@/components/video/ParticipantList ";
import Chat from "@/components/video/Chat";
import AudioSettings from "../video/AudioSettings ";

const ConsultationPage = () => {
  const participants = [
    { id: 1, name: "John Doe", status: "active" },
    {
      id: 2,
      name: "Alice Smith",
      status: "active",
    },
  ];
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex">
        {/* Video Call Area */}
        <div className="flex-grow">
          <VideoCall />
        </div>
        {/* Participant List */}
        <div className="w-1/4">
          <ParticipantList participants={participants} />
        </div>
      </div>
      {/* Controls and Chat */}
      <AudioSettings />
    </div>
  );
};

export default ConsultationPage;
