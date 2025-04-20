
import React, { useEffect, useRef } from "react";
import { useChat } from "@/context/ChatContext";

const ChatMessages: React.FC = () => {
  const { currentRoom, username } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentRoom?.messages]);

  if (!currentRoom) return null;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="space-y-4">
        {currentRoom.messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        )}
        
        {currentRoom.messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div
              className={`message-bubble ${
                message.sender === username
                  ? "message-bubble-sent"
                  : "message-bubble-received"
              }`}
            >
              {message.sender !== username && (
                <p className="text-xs font-semibold mb-1">{message.sender}</p>
              )}
              <p>{message.text}</p>
              <div className="text-right mt-1">
                <span className="text-xs opacity-70">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
