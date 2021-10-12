import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import deleteIcon from '../icons/deleteIcon.svg'
import editIcon from '../icons/editIcon.svg'
const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deletenote } = context;

    return (
        <div className="col-md-4">
            <div className="card my-3 mx-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <img className="mx-2" src={deleteIcon} alt="DeleteIconx" onClick={() => deletenote(note._id, localStorage.getItem('token'))} />
                        <img className="mx-2" src={editIcon} alt="EditIcon" onClick={() => { updateNote(note, localStorage.getItem('token')) }} />
                    </div>
                    <p className="card-text">{note.description}   </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
