import React from 'react';
import Notes from './Notes.js'
const Home = ({ showAlert }) => {
    return (
        <div className="container">
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home
