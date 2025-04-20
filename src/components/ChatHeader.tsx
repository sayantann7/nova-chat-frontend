
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import ThemeToggle from "./ThemeToggle";

interface ChatHeaderProps {
  roomId: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ roomId }) => {
  const navigate = useNavigate();
  const { leaveRoom } = useChat();

  const handleLeaveRoom = () => {
    leaveRoom();
    navigate("/");
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    // Using native browser API instead of toast to avoid adding another import
    alert("Room code copied to clipboard!");
  };

  return (
    <header className="p-4 border-b flex justify-between items-center glass-effect">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">NovaChat</h1>
          <div className="flex items-center gap-1">
            <p className="text-xs text-muted-foreground">Room:</p>
            <button 
              onClick={copyRoomCode}
              className="text-xs font-mono bg-secondary px-2 py-0.5 rounded hover:bg-opacity-80"
            >
              {roomId}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button onClick={handleLeaveRoom} size="sm" variant="outline">
          Leave Room
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
