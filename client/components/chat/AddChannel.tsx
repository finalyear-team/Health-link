import { Plus } from "lucide-react";
import React from "react";

const AddChannel = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  type,
}: any) => {
  return (
    <div
      onClick={() => {
        setCreateType(type);
        setIsCreating((prevState: any) => !prevState);
        setIsEditing(false);
        if (setToggleContainer)
          setToggleContainer((prevState: any) => !prevState);
      }}
    >
      <Plus className="w-6 h-6 m-2" />
    </div>
  );
};

export default AddChannel;
