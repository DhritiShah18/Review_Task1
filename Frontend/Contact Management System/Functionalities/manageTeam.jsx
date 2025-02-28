import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Navbar from "../Components/Navbar";


const ManageTeam = () => {
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetchTeams();
   
  }, []);
  const fetchTeams = async () => {
    try {
      await axios
        .get("http://localhost:3000/teams")
        .then((response) => {
          setTeams(response.data.message);
        })
        .catch(() => {
          console.log(response.message);
        });
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  const handleDeleteTeam = async (teamID) => {
    try {
      console.log(teamID)
      await axios
        .delete(`http://localhost:3000/teams/${teamID}`)
        .then((response) => {
          if (response.data.success) {
            setTeams(
              teams.filter((team) => {
                team._id !== teamID;
              })
            );
            alert(response.data.message);
            navigate("/manageTeam");
            window.location.reload();
          } else {
            //   console.log(teamID)
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
    <Navbar/>
      <div className="flex h-screen bg-gray-50">
  <div className="w-full p-4 bg-white shadow-lg rounded-lg mx-4 my-6">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Existing Teams</h2>
    {teams.length === 0 ? (
      <p className="text-gray-500 text-center">No team exists</p>
    ) : (
      <div className="space-y-4">
        {teams.map((team) => (
          <div
            key={team._id}
            className="p-5 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer flex items-center justify-between"
            onClick={() => navigate(`/teaminfo/${team._id}`)}
          >
            <span className="text-lg font-medium text-blue-900">{team.name}</span>
            <FaTrash
              className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTeam(team._id);
              }}
            />
          </div>
        ))}
      </div>
    )}
  </div>
</div>

    </>
  );
};
export default ManageTeam;
