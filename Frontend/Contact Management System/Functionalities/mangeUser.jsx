import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import Navbar from "../Components/Navbar";


const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Fetch Users from Backend
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
      fetchPermissions();
  }, []);

  //fetching total permission
  const fetchPermissions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/permissions");
      setPermissions(response.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };
 

  // Update available permissions when user is selected
  useEffect(() => {
    if (selectedUser) {
      setAvailablePermissions(
        permissions.filter((perm) => !selectedUser.permissions.includes(perm))
      );
    }
  }, [selectedUser, permissions]);


  // Remove permission from user
  const handleRemovePermission = (perm) => {
    const updatedPermissions = selectedUser.permissions.filter(
      (p) => p !== perm
    );
    setSelectedUser({ ...selectedUser, permissions: updatedPermissions });
  };


  const handleAddPermission = (perm) => {
    if (perm && !selectedUser.permissions.includes(perm)) {
      setSelectedUser({
        ...selectedUser,
        permissions: [...selectedUser.permissions, perm],
      });
    }
  };

  // Handle User Update
  const handleUpdateUser = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/users/${selectedUser._id}`, {
        name:selectedUser.name,
        email:selectedUser.email,
        permissions:selectedUser.permissions
      })
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          setSelectedUser(null)
          navigate("/ManageUser");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Make user an admin
const handleMakeAdmin = async () => {
  try {
    await axios.put(`http://localhost:3000/users/${selectedUser._id}`, {
      role: "admin",
    });
    setSelectedUser({ ...selectedUser, role: "admin" });
    alert("User is now an Admin!");
  } catch (error) {
    console.error("Error updating role:", error);
  }
};

//delete user
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          navigate("/ManageUser");
          window.location.reload();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };


  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4"> Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-center cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/seecontacts/${user._id}`)}
          >
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <FaEdit
              className="text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUser(user);
              }}
            />
            <MdOutlineDelete
              className="text-blue-500 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                deleteUser(user._id);
              }}
            />
          </div>
        ))}
      </div>
  

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
               <input
                type="text"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              

              <div>
                <label className="block font-medium">Permissions</label>
                <div className="flex flex-wrap gap-2 my-2">
                  {selectedUser.permissions.map((perm,index) => (
                    <span
                      key={`${perm._id}-${index}`}
                      className="bg-blue-900 text-black-800 px-2 py-1 rounded-md flex items-center"
                    >
                      {perm.name}
                      <button
                        type="button"
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => handleRemovePermission(perm)}
                      >
                        ✖
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleAddPermission(e.target.value)}
                >
                  <option value="">Select Permission</option>
                  {availablePermissions.map((perm) => (
                    <option key={perm._id} value={perm.name}>
                      {perm.name}
                    </option>
                  ))}
                </select>
              </div>

            {selectedUser.role !== "admin" && (
            <button
              type="button"
              onClick={handleMakeAdmin}
              className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition"
            >
              Make Admin
            </button>
          )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-500 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-black px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ManageUser;
