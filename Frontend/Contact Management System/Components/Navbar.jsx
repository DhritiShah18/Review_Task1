import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const utype = JSON.parse(localStorage.getItem("user"));
    if (utype) {
      setUserType(utype.role);
    }
  }, []);

  return (
    <nav className="bg-gray-500 text-white p-4 shadow-md flex justify-between items-center w-auto">
      <p 
        className="text-xl font-bold m-3 cursor-pointer"
        onClick={() => {
          if (userType === 'admin') {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }}
      >
        Dashboard
      </p>
      
      {userType === 'normal' && (
        <Link
          className="text-xl text-white font-bold m-3"
          to="/grantpermission"
        >
          Team
        </Link>
      )}

      <Link
        className="text-xl text-white font-bold m-3"
        to="/"
        onClick={() => {
          localStorage.removeItem("auth-token");
        }}
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
