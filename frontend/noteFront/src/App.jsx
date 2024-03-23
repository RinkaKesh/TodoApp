import { useState } from 'react'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import SignUP from './Components/SignUP';
import SignIn from './Components/SignIn';
import Note from './Components/Note';
import AddNote from './Components/AddNote';

import './App.css'
import Dashboard from './Components/Dashboard';

function App() {
  

  return (
    <>
    <div style={{display:'flex',justifyContent:"space-around"}}>
      <Link to="/">SignIn</Link>
      <Link to="/register">SignUP</Link>
      
    </div>

    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/register' element={<SignUP/>}/>
      <Route path='/note' element={<Note/>}/>
      <Route path='/logout' element={<SignIn/>}/>
      <Route path='/note/add' element={<AddNote/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

      

      
    </Routes>
      
        
    </>
  )
}

export default App
