import React from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface JoinButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({ isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`${isActive ? "" : "bg-slate-300 cursor-not-allowed"}`}
      disabled={!isActive}
    >
      <Video className="w-4 h-4 mr-2" /> Join Live Consultation
    </Button>
  );
};

export default JoinButton;
