import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaAddressBook,
  FaUsersCog,
  FaTasks,
  FaUserShield,
} from "react-icons/fa";
// import UserNavbar from "./userNavbar";
import Navbar from "./Navbar";

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  const userID = JSON.parse(localStorage.getItem("user"));
  const id=userID._id

  const permissionsOptions = [
    {
      title: "createUser",
      icon: <FaUserPlus />,
      bgColor: "bg-blue-500",
      path: "/createUser",
    },
    {
      title: "updateTeam",
      icon: <FaUsers />,
      bgColor: "bg-green-500",
      path: "/manageTeam",
    },
    {
      title: "createContact",
      icon: <FaAddressBook />,
      bgColor: "bg-yellow-500",
      path: "/createContact",
    },
    {
      title: "updateUser",
      icon: <FaTasks />,
      bgColor: "bg-purple-500",
      path: "/ManageUser",
    },
    {
      title: "createTeam",
      icon: <FaUsersCog />,
      bgColor: "bg-indigo-500",
      path: "/createTeam",
    },
      {
          title: "updateContacts",
          icon: <FaTasks />,
          bgColor: "bg-purple-500",
          path: `/seecontacts/${id}`,
        },
  ];

  const permission = JSON.parse(localStorage.getItem("user"));
  const permissions = permission.permissions;

  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-6">Welcome, {permission.name}!</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {permissionsOptions.map((option, index) => (
                
                permissions.includes(option.title) &&
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
    </>
  );
};
export default UserDashboard;
