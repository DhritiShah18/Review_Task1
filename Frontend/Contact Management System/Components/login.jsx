import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userType, setUserType] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    const login = {
      username,
      password,
    };
    axios
      .post("http://localhost:3000/login", login)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("auth-token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          const utype = JSON.parse(localStorage.getItem("user"));
          setUserType(utype.role);

          alert(response.data.message);
          if (utype.role === "admin") {
            navigate("/admin");
          } else if (utype.role === "normal") {
            navigate("/user");
          }
        } else {
          alert(response.data.message);
        }
      })

      .catch((error) => {
        console.log(error.message);
        navigate("/");
        // enqueueSnackbar("Coundnt login", { variant: "success" });
      });
  };
  return (
    <div className="flex  items-center justify-center  bg-gray-100">
      <div className="w-full max-w-3xl p-8 space-y-6 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-black bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login
          </button>
          {/* <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div> */}
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
