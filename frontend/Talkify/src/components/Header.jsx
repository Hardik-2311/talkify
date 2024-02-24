import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const Header = ({ chatRoomName }) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/logout");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Failed to logout");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="flex justify-between items-center dark:text-white">
      <h2 className="text-2xl font-bold">{chatRoomName}</h2>
      <button
        onClick={handleLogout}
        className="flex items-center text-white px-4 py-2 rounded bg-[#635fc7] transition duration-300"
      >
        <FiLogOut className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default Header;
