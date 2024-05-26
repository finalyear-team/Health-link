import React from "react";
import { Badge } from "@/components/ui/badge";
import { MdPeople } from "react-icons/md";
import UserAvatar from "../shared/user-avatar";

const ParticipantList = ({ participants }: any) => {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-xl mb-3 flex items-center space-x-3">
        <MdPeople size={30} /> Participants
      </h2>
      <ul>
        {participants.map((participant: any) => (
          <li key={participant.id} className="flex items-center mb-1 space-x-2">
            <UserAvatar
              imageUrl="/image/profile-picture.jpg"
              name={participant.name}
              email="john.doe@example.com"
            />

            <Badge>{participant.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
