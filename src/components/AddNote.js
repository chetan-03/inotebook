import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext);
    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag, localStorage.getItem('token'));
        setNote({ title: "", description: "", tag: "" });

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="title"
                        onChange={onChange}
                        value={note.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        name="description"
                        className="form-control" id="description"
                        onChange={onChange}
                        value={note.description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        value={note.tag}
                        type="text"
                        name="tag"
                        className="form-control"
                        id="tag"
                        onChange={onChange}
                    />
                </div>
                <button
                    disabled={note.title.length < 5 || note.description.length < 5}
                    type="submit" onClick={handleClick}
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>

    )
}

export default AddNote
