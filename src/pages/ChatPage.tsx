
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import MessageInput from "@/components/MessageInput";

const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { username, currentRoom, joinRoom } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    // If no username is set or no roomId in URL, redirect to landing
    if (!username) {
      navigate("/");
      return;
    }

    // If roomId exists but not joined yet, try to join
    if (roomId && !currentRoom) {
      const joined = joinRoom(roomId);
      if (!joined) {
        navigate("/");
      }
    }
  }, [username, roomId, currentRoom, joinRoom, navigate]);

  // Don't render chat UI until we have both username and room
  if (!username || !currentRoom || !roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="loading-bubble delay-75"></div>
          <div className="loading-bubble delay-100"></div>
          <div className="loading-bubble delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader roomId={roomId} />
      <ChatMessages />
      <MessageInput />
    </div>
  );
};

export default ChatPage;
