import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote.js';
import { useHistory } from 'react-router';
const Notes = ({ showAlert }) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editnote } = context;
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes(localStorage.getItem('token'));
        } else {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
    const updateNote = (currentnote, token) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }

    const handleClick = (e) => {
        editnote(note.id, note.etitle, note.edescription, note.etag, localStorage.getItem('token'))
        refClose.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button ref={ ref } type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" ref={ refClose } className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        name="etitle"
                                        className="form-control"
                                        id="etitle"
                                        onChange={ onChange }
                                        value={ note.etitle }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" name="edescription" value={ note.edescription } className="form-control" id="edescription" onChange={ onChange } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" name="etag" value={ note.etag } className="form-control" id="etag" onChange={ onChange } />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={ note.edescription.length < 5 || note.etitle.length < 5 } type="button" className="btn btn-primary" onClick={ handleClick }>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    { notes.length === 0 && 'No Notes to display' }
                </div>
                { notes.map((note) => {
                    return <NoteItem showAlert={ showAlert } key={ note._id } updateNote={ updateNote } note={ note } />
                }) }
            </div>
        </>
    )
}

export default Notes
