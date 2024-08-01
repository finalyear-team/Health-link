import { DoorClosedIcon } from "lucide-react";
import React from "react";

const CloseCreateChannel = ({ setIsCreating, setIsEditing }: any) => {
  return (
    <div
      onClick={() => {
        if (setIsCreating) setIsCreating(false);
        if (setIsEditing) setIsEditing(false);
      }}
    >
      <DoorClosedIcon className="w-5 h-5 m-2" />
    </div>
  );
};

export default CloseCreateChannel;
