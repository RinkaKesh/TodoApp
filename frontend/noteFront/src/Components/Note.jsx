import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import AddNote from './AddNote';
import Logout from './Logout';
import Update from './Update';
import Delete from './Delete';
import "./Note.css"

const Note = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(2); 

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    async function fetchNotes() {
        try {
            const noteData = await axios.get("http://127.0.0.1:8000/note", { withCredentials: true });
            console.log(noteData);
            setNotes(noteData.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response.status === 403) {
                
                const errorMessage = error.response.data; 
                setErrorMessage(errorMessage);

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            } else {
                
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleUpdate = () => {
        fetchNotes(); 
    };

    return (
        <div>
            <Logout />
            {errorMessage && <h2 style={{ textAlign: "center", color: "red" }}>{errorMessage}</h2>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginTop: "50px", marginBottom: "30px", transition: "1s" }}>
                {currentNotes.map((note) => (
                    <div key={note._id} className='box'>
                        <h3><strong>{note.title}</strong></h3>
                        <p>{note.description}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                            <Update noteId={note._id} onUpdate={handleUpdate} /><br />
                            <Delete noteId={note._id} onUpdate={handleUpdate} />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                    notesPerPage={notesPerPage}
                    totalNotes={notes.length}
                    paginate={paginate}
                />
            </div>
            <Link to="/note/add" style={{ color: "green", display: "block", textAlign: "center", marginTop: "20px" }}>Want to add Note ?</Link>
        </div>
    );
}

const Pagination = ({ notesPerPage, totalNotes, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul style={{ listStyle: "none", display: "flex", justifyContent: "center" }}>
            {pageNumbers.map(number => (
                <li key={number} style={{ cursor: "pointer", margin: "0 5px" }}>
                    <a onClick={() => paginate(number)} href="#!">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Note;
