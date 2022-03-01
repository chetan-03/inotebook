import NoteContext from "./noteContext";
import React, { useState } from 'react';
// import axios from "axios";
const NoteState = (props) => {
    const host = "https://quiet-harbor-83032.herokuapp.com//api/notes/fetchallnotes";
    const [notes, setNote] = useState([]);
    const [user, setUser] = useState([]);
    const getNotes = async (token) => {
        try {
            const response = await fetch(`${ host }/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    "auth-token": token
                }
            });
            const json = await response.json();
            setNote(json);
        } catch (error) {
            console.log(error.message)
        }


    }
    const getUserDetails = async (token) => {
        try {
            const response = await fetch(`${ host }/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    "auth-token": token
                }
            });
            const json = await response.json();
            setUser(json);
        } catch (error) {
            console.log(error.message)
        }
    }
    const addnote = async (title, description, tag, token) => {
        try {
            const response = await fetch(`${ host }/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify({ title, description, tag })
            });
            console.log(response, { token });
            const note = {
                title,
                description,
                tag
            }
            setNote(notes.concat(note));
            props.showAlert("Note added Successfully !! ", "success")

        } catch (error) {
            console.log(error.message)
            props.showAlert("Note not Found! ", "danger")
        }
    }
    const deletenote = async (id, token) => {
        try {
            await fetch(`${ host }/api/notes/deletenote/${ id }`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            props.showAlert("Note deleted Successfully !! ", "success")
        } catch (error) {
            console.log(error.message)
            props.showAlert("Note not Found!! !! ", "danger")
        }
        const newNotes = notes.filter((note) => {
            return note._id !== id
        });
        setNote(newNotes)
    }
    const editnote = async (id, title, description, tag, token) => {
        try {
            await fetch(`${ host }/api/notes/updatenote/${ id }`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify({ title, description, tag })
            });
        } catch (error) {
            console.log(error.message)
            props.showAlert("Note not Found !! ", "success")
        }
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {

            let element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNote(newNotes)
        props.showAlert("Note Updated Successfully !! ", "success")
    }
    return (
        <NoteContext.Provider value={ { notes, addnote, deletenote, editnote, getNotes, getUserDetails, user } }>
            { props.children }
        </NoteContext.Provider>
    )
}
export default NoteState