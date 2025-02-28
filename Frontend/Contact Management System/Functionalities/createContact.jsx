import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";

const CreateContact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    nickname: "",
    address: "",
    relationship: "",
    notes: "",
    company: "",
    jobTitle: "",
    website: "",
  });
  const navigate=useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
        const token = localStorage.getItem('auth-token')
        // console.log(token)
     await axios.post("http://localhost:3000/Contact", formData,{headers: {
        'Authorization':`Bearer ${token}`
      }})
      .then((response)=>{
        console.log(response)
        try{
          if (response.data.success) {
            alert(response.data.message);
            navigate('/admin')
          } else {
            alert(response.data.message);
            // navigate('/ManageUser')
          }
        }
          catch (error) {
            console.log(error.message);
          }

        })
        .catch((error)=>{
          console.log(error.message)
        } )
      
      }
        

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Contact
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

       
          <div>
            <label className="block text-gray-700 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium">Nickname</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">
              Relationship
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Friend">Friend</option>
              <option value="Family">Family</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
            </select>
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Contact
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateContact;
