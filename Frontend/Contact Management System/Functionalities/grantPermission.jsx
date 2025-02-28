import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const GrantPermission = () => {
  const  [Team, setUserTeam] = useState("");
  const [allTeam, setAllTeam] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    const storedTeam = localStorage.getItem("user");
    if (storedTeam) {
      const user = JSON.parse(storedTeam); 
      if (user && user._id) {
        setUserTeam(user._id); 
      }
    }
  }, []);
  console.log(Team)

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:3000/teams");
      setAllTeam(response.data.message || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  // console.log(allTeam)

  const handleDelete = (teamID) => {
    axios
      .delete(`http://localhost:3000/teams/${teamID}`)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          navigate("/seecontacts/:id");
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
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">User Contacts</h2>
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Members</th>
              <th className="p-3">Permission</th>
              {console.log(allTeam)}
            </tr>
          </thead>
          <tbody>
          {Team.length > 0 ? (
              allTeam
              .filter((team) =>
                team.members.some((member) => Team.includes(member))
              ) 
                .map((t) => (
                  <tr key={t._id} className="border-b">
                    {console.log(t)}
                    <td className="p-3">{t.name}</td>
                    <td className="p-3">{t.members.join(", ")}</td>
                    <td className="p-3 flex gap-3">
                      <FaEdit
                        className="text-blue-500 cursor-pointer"
                        
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(t._id)}
                      />
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center">
                  User is in no team
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GrantPermission;
