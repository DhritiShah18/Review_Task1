import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Navbar from "../Components/Navbar";


const TeamInfo=()=>{
    const { id } = useParams();
    // console.log(id)
    const navigate=useNavigate()
    const [team,setTeam]=useState([])
    useEffect(()=>{
        fetchTeamDetails()
    },[])
    const fetchTeamDetails=async ()=>{
        try{
            await axios.get(`http://localhost:3000/teams/${id}`)
            .then((response)=>{
                setTeam(response.data)
                console.log(team)
            })
            .catch((error)=>{
            console.log(error.message)
        })
        .catch((error)=>{
          console.log(response.message)
        })
        }
        catch{
            // console.log(team)
// 
        }
}


const handleUpdateTeam = async () => {
    try {
      await axios.put(`http://localhost:3000/teams/${id}`, team);
      alert("Team updated successfully!");
      navigate("/createTeam");
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  if (!team) return <p>Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h2 className="text-2xl font-bold">Edit Team: {team.name}</h2>
      <h3>{team.name}</h3>
      <input
        type="text"
        value={team.name}
        onChange={(e) => setTeam({ ...team, name: e.target.value })}
        className="border p-2 w-full my-4"
      />
      <button onClick={handleUpdateTeam} className="bg-blue-500 text-white p-2 rounded-lg">
        Update Team
      </button>
    </div>
    </>
  );
};

export default TeamInfo;

