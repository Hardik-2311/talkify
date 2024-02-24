import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { fetchMessagesByChatRoomIdAsync } from "../features/messages/messageSlice";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const Messages = ({ roomId, roomName, userId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    dispatch(fetchMessagesByChatRoomIdAsync(roomId));
  }, [dispatch, roomId]);

  return (
    <div className="w-full  p-6 shadow-md min-h-screen flex flex-col gap-4 ">
      {/* Header */}
      <div className="h-1/6 flex-none">
        <Header chatRoomName={roomName} />
      </div>

      {/* Message list */}
      <div className="flex-auto h-4/6 overflow-y-auto">
        <MessageList messages={messages} userId={userId} roomId={roomId} />
      </div>

      {/* Message input */}
      <div className="h-1/6 flex-none">
        <MessageInput roomId={roomId} userId={userId} socket={socket} />
      </div>
    </div>
  );
};

export default Messages;
