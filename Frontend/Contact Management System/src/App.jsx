import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "../Components/signup";
import Login from "../Components/login";
import ManageTeam from "../Functionalities/manageTeam";
import AdminDashboard from "../Components/AdminDashboard";
import CreateUser from "../Functionalities/createUser";
import CreateContact from "../Functionalities/createContact";
import ManageUser from "../Functionalities/mangeUser";
import UserContacts from "../Functionalities/viewContacts";
import CreateTeam from "../Functionalities/createTeams";
import TeamInfo from "../Functionalities/teamInfo";
import UserDashboard from "../Components/UserDashboard";
import GrantPermission from "../Functionalities/grantPermission";

function App() {
  return (
    <>
      {/* routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/grantpermission" element={<GrantPermission />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createContact" element={<CreateContact />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/ManageUser" element={<ManageUser />} />
          <Route path="/seecontacts/:id" element={<UserContacts />} />
          <Route path="createTeam" element={<CreateTeam />} />
          <Route path="/teaminfo/:id" element={<TeamInfo />} />
          <Route path="/manageTeam" element={<ManageTeam />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
