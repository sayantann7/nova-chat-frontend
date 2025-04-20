
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/context/ChatContext";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomeForm: React.FC = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const { setUsername, createRoom, joinRoom } = useChat();
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!inputUsername.trim()) {
      toast.error("Please enter a username");
      return;
    }

    setUsername(inputUsername);
    const newRoomCode = createRoom();
    toast.success(`Room created! Code: ${newRoomCode}`);
    navigate(`/chat/${newRoomCode}`);
  };

  const handleJoinRoom = () => {
    if (!inputUsername.trim()) {
      toast.error("Please enter a username");
      return;
    }

    if (!roomCode.trim()) {
      toast.error("Please enter a room code");
      return;
    }

    setUsername(inputUsername);
    const joined = joinRoom(roomCode);
    
    if (joined) {
      toast.success(`Joined room ${roomCode}`);
      navigate(`/chat/${roomCode}`);
    } else {
      toast.error("Failed to join room. Please check the room code.");
    }
  };

  return (
    <Card className="w-full max-w-md glass-effect">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Join NovaChat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="border-input"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="roomCode" className="text-sm font-medium">
            Room Code
          </label>
          <Input
            id="roomCode"
            placeholder="Enter room code to join"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="border-input"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          onClick={handleJoinRoom}
          className="w-full"
          variant="default"
        >
          Join Room
        </Button>
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <span className="relative px-2 text-xs text-muted-foreground bg-background">
            OR
          </span>
        </div>
        <Button
          onClick={handleCreateRoom}
          className="w-full"
          variant="outline"
        >
          Create New Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeForm;
