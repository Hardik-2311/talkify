import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageAsync } from "../features/messages/messageSlice";

const MessageInput = ({ roomId, userId, socket }) => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(""); // State to store received message
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      content: message,
      user: userId,
      chatRoom: roomId,
    });
    dispatch(
      createMessageAsync({ content: message, user: userId, chatRoom: roomId })
    );
    setMessage("");
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setReceivedMessage(data);
      dispatch(
        createMessageAsync({
          content: data.content,
          user: data.user,
          chatRoom: data.chatRoom,
        })
      );
      setMessage("");
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, dispatch]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full mr-2 focus:outline-none focus:border-blue-500 dark:bg-[#20212c]  dark:border-gray-700 dark:text-white"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-[#635fc7] text-white px-6 py-3 rounded-md focus:outline-none focus:bg-[#635fc7] transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
