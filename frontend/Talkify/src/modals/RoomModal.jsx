import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
const CreateRoomModal = ({ userId, isOpen, onClose, handleCreateRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("one-to-one");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Room Name:", roomName);
    console.log("Room Type:", roomType);
    console.log("User ID:", userId);
    const userData = {
      name: roomName,
      type: roomType,
      userId: userId,
    };
    console.log(userData);
    handleCreateRoom(userData);
    setRoomName("");
    setRoomType("");
    onClose();
  };

  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-full ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-lg font-semibold">Create Room</h3>
          <button onClick={onClose} className="modal-close cursor-pointer">
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-4">
              <label htmlFor="roomName" className="block font-medium">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                className="w-full rounded border-gray-300 mt-2"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="roomType" className="block font-medium">
                Room Type
              </label>
              <select
                required
                id="roomType"
                className="w-full rounded border-gray-300 mt-2"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">Select Room Type</option>
                <option value="one-to-one">One-to-One</option>
                <option value="group">Group</option>
              </select>
            </div>
          </div>
          <div className="modal-footer flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Create Room
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
