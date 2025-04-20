
import React, { createContext, useContext, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatRoom {
  id: string;
  messages: Message[];
}

interface ChatContextType {
  username: string;
  setUsername: (name: string) => void;
  currentRoom: ChatRoom | null;
  createRoom: () => string;
  joinRoom: (roomId: string) => boolean;
  sendMessage: (text: string) => void;
  leaveRoom: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);

  // Generate a random ID for rooms
  const generateRoomId = (): string => {
    return Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
  };

  // Create a new room
  const createRoom = (): string => {
    const roomId = generateRoomId();
    const newRoom: ChatRoom = {
      id: roomId,
      messages: [],
    };
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setCurrentRoom(newRoom);
    return roomId;
  };

  // Join an existing room
  const joinRoom = (roomId: string): boolean => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
      return true;
    } else {
      // If room doesn't exist yet, create it (for demo purposes)
      const newRoom: ChatRoom = {
        id: roomId,
        messages: [],
      };
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      setCurrentRoom(newRoom);
      return true;
    }
  };

  // Send a message to the current room
  const sendMessage = (text: string) => {
    if (!currentRoom || !username) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: username,
      timestamp: Date.now(),
    };

    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === currentRoom.id) {
          return {
            ...room,
            messages: [...room.messages, newMessage],
          };
        }
        return room;
      })
    );

    setCurrentRoom((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      };
    });
  };

  // Leave the current room
  const leaveRoom = () => {
    setCurrentRoom(null);
  };

  return (
    <ChatContext.Provider
      value={{
        username,
        setUsername,
        currentRoom,
        createRoom,
        joinRoom,
        sendMessage,
        leaveRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
