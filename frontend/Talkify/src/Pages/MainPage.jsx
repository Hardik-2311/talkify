import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rooms from "../components/Rooms";
import Messages from "../components/Messages";

const MainPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoomName, setSelectedRoomName] = useState(null);
  const handleRoomSelected = (roomId, roomName) => {
    setSelectedRoomId(roomId);
    setSelectedRoomName(roomName);
  };
  console.log(currentUser);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:5000/api/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCurrentUser();
  }, []);

  if (error) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex w-screen">
      <div className="w-1/4 border-r min-h-screen">
        <Rooms userId={currentUser?.id} onRoomSelected={handleRoomSelected} />
      </div>
      <div className="w-3/4 min-h-screen bg-white  dark:bg-[#2b2c37]">
        {selectedRoomId && (
          <Messages
            roomId={selectedRoomId}
            roomName={selectedRoomName}
            userId={currentUser?.id}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
