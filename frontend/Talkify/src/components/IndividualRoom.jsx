import React from "react";
import { FaTrash } from "react-icons/fa";
const IndividualRoom = ({
  room,
  userId,
  handleRoomClicked,
  handleJoinRoom,
  handleDeleteRoom,
}) => {
  return (
    <div key={room._id}>
      {room.members.some((member) => member.user === userId) ? (
        <li
        className="bg-white shadow-lg hover:bg-gray-200 rounded-lg flex justify-between items-baseline space-x-2 px-5 py-4 transition ease-in-out duration-500 cursor-pointer dark:bg-[#20212c] hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white "
          onClick={() => handleRoomClicked(room._id, room.name)}
        >
          <span className="text-lg font-bold">
            {room.name}
          </span>
          <FaTrash
            className="ml-2 text-red-600 cursor-pointer"
            onClick={() => handleDeleteRoom(room._id)}
          />
        </li>
      ) : (
        <li
          className={`bg-white hover:bg-gray-200 py-4 px-4 rounded-lg flex justify-between shadow-md transition duration-300 cursor-pointer dark:bg-[#20212c]`}
        >
          <span className="text-gray-800 font-medium dark:text-white">
            {room.name}
          </span>
          <button
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleJoinRoom(room._id, userId)}
          >
            Join
          </button>
        </li>
      )}
    </div>
  );
};

export default IndividualRoom;
