import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="bg-gray-600 text-white p-4 shadow-md flex justify-between items-center w-auto">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <Link to="/grantpermission" className="w-full px-4 py-2 text-black bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Permission</Link>
      <Link className="w-full px-4 py-2 text-black bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300" to="/" onClick={()=>{localStorage.removeItem("auth-token")}}>
        Logout
      </Link>
    </nav>
  );
};

export default UserNavbar;