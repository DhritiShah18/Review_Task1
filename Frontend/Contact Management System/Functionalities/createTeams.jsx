import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";


const CreateTeam = () => {
  
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

const navigate=useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    
  }, []);

  useEffect(() => {
    fetchMembers();
    fetchPermissions();
  }, []);

 

  // Fetch members
  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/permissions");
      setPermissions(response.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Handle team creation
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/teams", {
        name: teamName,
        members: selectedMembers.map((m) => m._id), 
        permissions: selectedPermissions.map((p) => p._id), 
      });

     
      setTeamName("");
      setSelectedMembers([]);
      setSelectedPermissions([]);
      window.location.reload()
      navigate('/teams')
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  

  // Handle member selection
  const handleSelectMember = (member) => {
    setSelectedMembers([...selectedMembers, member]);
    setMembers(members.filter((m) => m._id !== member._id));
  };

  // Handle permission selection
  const handleSelectPermission = (permission) => {
    setSelectedPermissions([...selectedPermissions, permission]);
    setPermissions(permissions.filter((p) => p._id !== permission._id));
  };

  return (
    <>
    <Navbar/>
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-6 flex justify-center">Create New Team</h2>

        <form onSubmit={handleCreateTeam} className="bg-white p-6 shadow-md rounded-lg">
         
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Team Name</label>
            <input
              type="text" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

       
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Add Members</label>
            <select
              onChange={(e) => {
                const selectedMember = members.find((m) => m._id === e.target.value);
                if (selectedMember) handleSelectMember(selectedMember);
              }}
              className="w-full p-2 border rounded-lg mt-1"
            >
              <option value="">Select a member...</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>

  
            <div className="flex flex-wrap mt-2">
              {selectedMembers.map((member) => (
                <span key={member._id} className="m-1 bg-blue-200 p-2 rounded-lg">
                  {member.name}
                </span>
              ))}
            </div>
          </div>

        
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Assign Permissions</label>
            <select
              onChange={(e) => {
                const selectedPermission = permissions.find((p) => p._id === e.target.value);
                if (selectedPermission) handleSelectPermission(selectedPermission);
              }}
              className="w-full p-2 border rounded-lg mt-1"
            >
              <option value="">Select a permission...</option>
              {permissions.map((permission) => (
                <option key={permission._id} value={permission._id}>
                  {permission.name}
                </option>
              ))}
            </select>

          
            <div className="flex flex-wrap mt-2">
              {selectedPermissions.map((permission) => (
                <span key={permission._id} className="m-1 bg-green-200 p-2 rounded-lg">
                  {permission.name}
                </span>
              ))}
            </div>
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-500 text-black p-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateTeam;