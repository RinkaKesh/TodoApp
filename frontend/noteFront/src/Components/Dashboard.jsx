import React, { useState } from 'react'
import Note from './Note'
import Logout from './Logout'

const Dashboard = () => {
    const[displayNote,setDisplayNote]=useState(false)
    const handleNote=()=>{
        setDisplayNote(!displayNote)
    }
  return (
    <div style={{ margin: "0 auto", width: "50%" }}>
        {!displayNote && <h1>Welcome to Note Application</h1>}
        <button onClick={handleNote}>{displayNote?"Hide Notes":"Show Notes"}</button>
        {displayNote && <Note/>}
        <Logout/>

    </div>
  )
}

export default Dashboard