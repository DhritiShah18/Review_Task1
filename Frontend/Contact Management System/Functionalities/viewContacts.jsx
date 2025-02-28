import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const UserContacts = () => {
  let { id } = useParams();

  // console.log(id)
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
const navigate=useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    
  }, []);

  useEffect(() => {
    // console.log(id)
    axios
    .get(`http://localhost:3000/Contact/${id}`)
    .then((response) => {
      // Assuming the response data is an array
      if ((response.data)) {
        setContacts(response.data);
      } else {
        alert("Expected an array but got", response.data.message);
      }
    })  
    .catch((err) => console.error("Error fetching contacts:", err.message));
}, [id]);

  useEffect(()=>{
    console.log(contacts)
  },[contacts])

  const handleDelete = (contactId) => {
    axios.delete(`http://localhost:3000/Contact/${contactId}`)
    .then((response)=>{
        if(response.data.success){
            alert(response.data.message)
            navigate('/seecontacts/:id')
            window.location.reload()
        }
        else{
            alert(response.data.message)

        }
    })
    .catch((error)=>{
        alert(error.message)
    })
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/Contact/${selectedContact._id}`, setSelectedContact)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          navigate('/seecontacts/:id')
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">User Contacts</h2>
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id} className="border-b">
                <td className="p-3">{contact.name}</td>
                <td className="p-3">{contact.phone}</td>
                <td className="p-3 flex gap-3">
                  <FaEdit
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(contact._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-3 text-center">
                No contacts available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleUpdateContact}>
              <input
                type="text"
                value={selectedContact.name}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    name: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-3"
              />
               <input
                type="text"
                value={selectedContact.phone}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-3"
              />
                <input
                type="text"
                value={selectedContact.email}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    email: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-3"
              />
               <input
                type="text"
                value={selectedContact.Nickname}
                placeholder="Nickname"
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    Nickname: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-3"
              />
               <input
                type="text"
                value={selectedContact.Address}
                placeholder="Address"
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    Address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-3"
              />
                 <input
                type="text"
                value={selectedContact.Notes}
                placeholder="Notes"
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    Notes: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-3"
              />
              <button
                type="submit"
                className="bg-blue-500 text-black px-4 py-2 rounded-md"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserContacts;
