import React, { useState } from 'react'
import { useHistory } from 'react-router';

const SignUp = ({ showAlert }) => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch('https://quiet-harbor-83032.herokuapp.com/api/notes/fetchallnotes/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history.push("/")
            showAlert("Signed Up Successfully !!", "success")
        } else {
            showAlert('Enter Correct Credentials', 'danger')
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-2">
            <h2>Sign to continue with iNotebook</h2>
            <form onSubmit={ handleSubmit } className="container">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" onChange={ onChange } value={ credentials.name } className="form-control" id="name" aria-describedby="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={ onChange } value={ credentials.email } className="form-control" id="email" aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input autoComplete="password" name="password" type="password" onChange={ onChange } value={ credentials.password } className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input autoComplete="cpassword" name="cpassword" type="cpassword" onChange={ onChange } value={ credentials.cpassword } className="form-control" id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
