import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate=useNavigate()
    const [logoutText,setLogoutText]=useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogout= async() => { 
        try {
          const res = await axios.get("http://127.0.0.1:8000/logout", { withCredentials: true });
          if (res.status === 200) {
            setLogoutText(res.data.message);
            setTimeout(() => {
              setLogoutText('');
              navigate("/");
            },1000);
          }
        } catch (error) {
          if (error.response) {
            const { status, data } = error.response;
            if (status === 401 || status === 500) {
              setErrorMessage(data.error);
      
              setTimeout(() => {
                setErrorMessage('');
              }, 5000);
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
        {logoutText && <h2 style={{ textAlign: "center", color: "Green" }}>{logoutText}</h2>}
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout