import React, { useState } from 'react';
import axios from 'axios';

const Update = ({ noteId, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false); // State to control update form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simple validation: Ensure at least one field is being updated
      if (!formData.title.trim() && !formData.description.trim()) {
        setErrorMessage("Please provide at least one field to update.");
        setIsLoading(false);
        return;
      }

      const res = await axios.patch(`http://127.0.0.1:8000/note/update/${noteId}`, formData, { withCredentials: true });
      if (res.status === 200) {
        onUpdate(); // Fetch updated notes
        setFormData({ title: "", description: "" }); // Clear form fields
        setUpdate(false); // Hide update form after successful update
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
    }
  };

  return (
    <div>
      {errorMessage && <h2 style={{ textAlign: "center", color: "Red" }}>{errorMessage}</h2>}
      <button onClick={() => setUpdate(true)}>UPDATE</button> {/* Set update state to true to show form */}
      {update && (
        <div style={{ backgroundColor: "lightgrey", padding: "20px", borderRadius: "5px", marginTop: "10px" }}>
          <h1 style={{ textAlign: "center", color: "teal" }}>Update Note</h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" name='title' placeholder='Your note' value={formData.title} onChange={handleChange} />
            <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} maxLength={500}></textarea>
            <button type='submit' style={{ backgroundColor: "teal", color: "white", alignSelf: "center", width: "fit-content" }} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
