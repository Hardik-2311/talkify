import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateRoomModal from "../modals/RoomModal";
import useDarkMode from "../Hooks/useDarkmode";
import {
  fetchChatRoomsAsync,
  createChatRoomAsync,
  deleteChatRoomAsync,
  joinChatRoomAsync,
} from "../features/rooms/roomSlice";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import GroupRooms from "./GroupRooms";
import IndividualRoom from "./IndividualRoom";

const Rooms = ({ userId, onRoomSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const chatRooms = useSelector((state) => state.room.chatRooms);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateRoom = (userData) => {
    dispatch(createChatRoomAsync(userData));
  };

  const handleRoomClicked = (roomId, roomName) => {
    onRoomSelected(roomId, roomName);
  };

  const handleDeleteRoom = (roomId) => {
    dispatch(deleteChatRoomAsync(roomId));
  };

  const handleJoinRoom = (roomId, userId) => {
    dispatch(joinChatRoomAsync({ roomId, userId }));
  };

  useEffect(() => {
    dispatch(fetchChatRoomsAsync());
  }, [dispatch]);

  const individualRooms = chatRooms.filter(
    (room) => room.type === "one-to-one"
  );
  const groupRooms = chatRooms.filter((room) => room.type === "group");

  return (
    <div
      className={`flex gap-4 flex-col p-4 bg-white dark:bg-[#2b2c37] h-screen`}
    >
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Your Chat Rooms:
      </h2>

      {/* Individual Rooms */}
      <div className="h-1/3 overflow-y-scroll">
        <h3 className="text-2xl font-bold mb-2 dark:text-[#635fc7]">
          Individual Rooms:
        </h3>
        {individualRooms.length === 0 ? (
          <p>No individual chat rooms available.</p>
        ) : (
          <ul className="flex flex-col-reverse gap-4 my-4 ">
            {individualRooms.map((room) => (
              <IndividualRoom
                key={room._id}
                room={room}
                userId={userId}
                handleRoomClicked={handleRoomClicked}
                handleJoinRoom={handleJoinRoom}
                handleDeleteRoom={handleDeleteRoom}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Group Rooms */}
      <div className=" h-1/3 overflow-y-scroll ">
        <h3 className="text-2xl font-bold mb-2 z-20 dark:text-[#635fc7]">
          Group Rooms:
        </h3>
        {groupRooms.length === 0 ? (
          <h3 className="font-bold text-[#635fc7] dark:text-white text-xl uppercase">
            Create a group room
          </h3>
        ) : (
          <ul className="flex flex-col-reverse gap-4 my-4 ">
            {groupRooms.map((room) => (
              <GroupRooms
                key={room._id}
                room={room}
                userId={userId}
                handleRoomClicked={handleRoomClicked}
                handleJoinRoom={handleJoinRoom}
                handleDeleteRoom={handleDeleteRoom}
              />
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleOpenModal} className="button">
        Create Room
      </button>

      <CreateRoomModal
        userId={userId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleCreateRoom={handleCreateRoom}
      />

      <div className="mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
        <BsFillSunFill className="dark:text-white" />
        <Switch
          checked={darkSide}
          onChange={toggleDarkMode}
          className={`${
            darkSide ? "bg-[#635fc7]" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              darkSide ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <BsFillMoonFill className="dark:text-white" />
      </div>
    </div>
  );
};

export default Rooms;
