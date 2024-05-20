"use client";

import VideoCall from "@/components/video/VideoCall";
import ParticipantList from "@/components/video/ParticipantList ";

const ConsultationPage = () => {
  const participants = [
    { id: 1, name: "Dr. John Doe", status: "active" },
    {
      id: 2,
      name: "Alice Smith",
      status: "active",
    },
  ];
  return (
    <div className="flex flex-wrap">
      {/* Video Call Area */}
      <div className="flex-grow w-full md:w-3/4">
        <VideoCall />
      </div>

      {/* Participant List */}
      <div className="w-full md:w-1/4 px-4">
        <ParticipantList participants={participants} />
      </div>
    </div>
  );
};

export default ConsultationPage;
