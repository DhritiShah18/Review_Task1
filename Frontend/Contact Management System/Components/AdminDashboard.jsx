import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import {
  FaUserPlus,
  FaUsers,
  FaAddressBook,
  FaUsersCog,
  FaTasks,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);
      const userID = JSON.parse(localStorage.getItem("user"));
           const id=userID._id
    

  const adminOptions = [
    {
      title: "Create User",
      icon: <FaUserPlus />,
      bgColor: "bg-blue-500",
      path: "/createUser",
    },
    {
      title: "Manage Users",
      icon: <FaUsers />,
      bgColor: "bg-green-500",
      path: "/ManageUser",
    },
    {
      title: "Create Contact",
      icon: <FaAddressBook />,
      bgColor: "bg-yellow-500",
      path: "/createContact",
    },
    {
      title: "Manage Contacts",
      icon: <FaTasks />,
      bgColor: "bg-purple-500",
      path: `/seecontacts/${id}`,
    },
    {
      title: "Create Team",
      icon: <FaUsersCog />,
      bgColor: "bg-indigo-500",
      path: "/createTeam",
    },
    {
      title: "Manage Teams",
      icon: <FaTasks />,
      bgColor: "bg-pink-500",
      path: "/manageTeam",
    },
 
  ];

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-6">Welcome, Admin!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminOptions.map((option, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg text-black flex flex-col items-center ${option.bgColor} cursor-pointer transform transition hover:scale-105"
              onClick={() => navigate(option.path)}
            >
              <div className="text-4xl">{option.icon}</div>
              <h3 className="text-lg font-semibold mt-2">{option.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
