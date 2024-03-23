import React, { useState } from 'react';
import axios from 'axios';

const Delete = ({ noteId, onUpdate }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State to control delete confirmation prompt

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/note/delete/${noteId}`, { withCredentials: true });
      if (res.status === 200) {
        onUpdate(); // Fetch updated notes
        // Provide feedback to the user
        console.log(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false); // Hide delete confirmation prompt after request completes
    }
  };

  return (
    <div>
      {errorMessage && <h2 style={{ textAlign: "center", color: "Red" }}>{errorMessage}</h2>}
      <button onClick={() => setShowDeleteConfirm(true)}>DELETE</button> {/* Show delete confirmation prompt */}
      {showDeleteConfirm && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>Are you sure you want to delete this note?</p>
          <button onClick={handleDelete} disabled={isLoading}>{isLoading ? "Deleting..." : "Yes"}</button>
          <button onClick={() => setShowDeleteConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Delete;
