import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from '../Components/signup'
import Login from '../Components/login'
// import Home from '../Components/Home'
import AdminDashboard from '../Components/AdminDashboard'
import CreateUser from '../Functionalities/createUser'
import CreateContact from '../Functionalities/createContact'
import ManageUser from '../Functionalities/mangeUser'
import UserContacts from '../Functionalities/viewContacts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      {/* <Route path='/home' element={<Home/>}/> */}
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path="/createUser" element={<CreateUser/>}/>
      <Route path="/createContact" element={<CreateContact/>}/>
      <Route path="/createContact" element={<CreateContact/>}/>
      <Route path="/ManageUser" element={<ManageUser/>}/>
      <Route path="/seecontacts/:id" element={<UserContacts/>}/>
    </Routes>
    </BrowserRouter>
    {/* <h1>hrllo</h1> */}
      
    </>
  )
}

export default App
