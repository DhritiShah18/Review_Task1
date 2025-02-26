import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const UserContacts = () => {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // console.log(id)
    axios
    .get(`http://localhost:3000/Contact?q=${id}`)
    .then((response) => {
      // Assuming the response data is an array
      if (Array.isArray(response.data)) {
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
      .put(`http://localhost:3000/Contact/${selectedUser._id}`, selectedUser)
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

  return (
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
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContacts;
