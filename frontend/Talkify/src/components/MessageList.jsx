import React, { useState, useEffect } from "react";
import {
  updateMessageAsync,
  deleteMessageAsync,
} from "../features/messages/messageSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
const MessageList = ({ messages, userId, roomId }) => {
  const dispatch = useDispatch();
  const [selectedMessage, setSelectedMessage] = useState(null);
  console.log(selectedMessage);
  console.log(messages);
  const messageListRef = React.useRef();
  const handleEdit = (messageId) => {
    console.log("Edit message with ID:", messageId);
  };

  const handleDelete = async (messageId) => {
    try {
      dispatch(deleteMessageAsync({ messageId }));
    } catch (error) {}
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageListRef}
      className="border p-6 border-gray-300 h-[68vh] overflow-y-scroll w-full items-end flex flex-col bg-[#f4f7fd] dark:bg-[#20212c] "
    >
      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No messages to display.
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-4 max-w-[75%] flex  items-center justify-between${
              message.user === userId
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-gray-700"
            } rounded-lg shadow-md dark:bg-gray-700 dark:text-white relative`}
          >
            {message.content}
            {message.user === userId && (
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedMessage(message._id)}
                  className="focus:outline-none"
                >
                  <BsThreeDotsVertical size={15} />
                </button>
                {selectedMessage === message._id && (
                  <div className="absolute right-8 top-8 bg-white border border-gray-200 rounded-md shadow-lg">
                    <button
                      onClick={() => handleEdit(message._id)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
