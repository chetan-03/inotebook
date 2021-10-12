import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
const MyAccount = () => {
    const context = useContext(noteContext);
    const { getUserDetails, user } = context;
    const token = localStorage.getItem('token');
    useEffect(() => {
        getUserDetails(token)
    }, [token])
    const { _id, name, email, date } = user;
    return (
        <div class="container">
            <div class="row g-2">
                <div class="col-6">
                    <div class="p-3 border bg-light">User Id</div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light"> {_id} </div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light">User Name</div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light">{name}</div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light">Email</div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light">{email}</div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light">Date</div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light">{date}</div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
