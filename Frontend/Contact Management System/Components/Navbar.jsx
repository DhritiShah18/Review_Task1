import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;