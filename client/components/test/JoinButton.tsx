import React from 'react';
import { Button } from "@/components/ui/button";


interface JoinButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({ isActive, onClick }) => {
  return (
    <Button 
      onClick={onClick} 
      className={`${isActive ? '' : 'bg-slate-300 cursor-not-allowed'}`} 
      disabled={!isActive}
    >
    Join Chat
    </Button>
  );
}

export default JoinButton;
