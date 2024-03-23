
//AddNoe.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout'

const AddNote = () => {
  const navigate=useNavigate()
  const[AddNoteText,setAddNoteText]=useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/note/add", formData, { withCredentials: true });
      if (res.status === 200) {
        console.log(res.data.message)
        setAddNoteText(res.data.message);
        setTimeout(() => {
          setAddNoteText('');
          navigate("/note");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 || status === 403 || status === 500) {
          console.log(data.error)
          setErrorMessage(data.error);
  
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        } else {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div>
        {errorMessage && <h2 style={{textAlign:"center",color:"Red"}}>{errorMessage}</h2>}
        {AddNoteText && <h2 style={{ textAlign: "center", color: "Green" }}>{AddNoteText}</h2>}

       
        <h1 style={{textAlign:"center",color:"teal"}}>Add Note</h1>
        <div style={{margin:'auto',display:"flex",flexDirection:"column",width:"400px",gap:"20px"}}>
        {/* <form action="" onSubmit={handleSubmit}>/ */}
        <input type="text" name='title' placeholder='your note' onChange={handleChange} />
        <textarea type="text" name="description" id="" width="100%"  height="80px" placeholder='Description' onChange={handleChange} maxLength={500}></textarea>
        <button type='submit' onClick={handleSubmit} style={{width:"30%",margin:"auto",backgroundColor:"teal",color:"white"}}>ADD</button>
        {/* </form> */}
        </div>
        
    </div>
  )
}

export default AddNote