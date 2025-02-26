import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // Fetch Users from Backend
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle User Update
  const handleUpdateUser = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/users/${selectedUser._id}`, selectedUser)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const deleteUser=(id)=>{
    axios.delete(`http://localhost:3000/users/${id}`)
    .then((response)=>{
        if(response.data.success){
            alert(response.data.message)
            window.location.reload()
        }
        else{
            alert(response.data.message)

        }
    })
    .catch((error)=>{
        alert(error.message)
    })
  }

  return (
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
                // setSelectedDelUser(user);
                deleteUser(user._id)


              }}
            />
          </div>
        ))}
      </div>
      {/* {selectedDelUser && (deleteUser())} */}

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
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
