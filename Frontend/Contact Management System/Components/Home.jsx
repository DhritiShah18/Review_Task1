import React, { useState } from 'react';

const Home = ({ userPermissions, allPermissions, onUpdate }) => {
  // State to manage user permissions and available permissions
  const [selectedPermission, setSelectedPermission] = useState('');
  const [permissions, setPermissions] = useState(userPermissions);

  // Function to handle adding a permission
  const handleAddPermission = () => {
    if (selectedPermission && !permissions.includes(selectedPermission)) {
      const updatedPermissions = [...permissions, selectedPermission];
      setPermissions(updatedPermissions);
      onUpdate(updatedPermissions); // Assuming you will handle this on the backend or parent component
      setSelectedPermission('');
    }
  };

  // Function to handle deleting a permission
  const handleDeletePermission = (permissionToDelete) => {
    const updatedPermissions = permissions.filter(permission => permission !== permissionToDelete);
    setPermissions(updatedPermissions);
    onUpdate(updatedPermissions); // Assuming you will handle this on the backend or parent component
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">User Permissions</h2>

      {/* List of assigned permissions */}
      <div className="space-y-2">
        {permissions.length === 0 ? (
          <p>No permissions assigned.</p>
        ) : (
          permissions.map((permission, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-lg">{permission}</span>
              <button
                onClick={() => handleDeletePermission(permission)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Dropdown to select a permission to add */}
      <div className="flex items-center space-x-2">
        <select
          className="border p-2 rounded-md"
          value={selectedPermission}
          onChange={(e) => setSelectedPermission(e.target.value)}
        >
          <option value="">Select a permission</option>
          {allPermissions
            .filter(permission => !permissions.includes(permission)) // Filter out already assigned permissions
            .map((permission, index) => (
              <option key={index} value={permission}>
                {permission}
              </option>
            ))}
        </select>
        <button
          onClick={handleAddPermission}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Add Permission
        </button>
      </div>
    </div>
  );
};

export default Home;
