import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Login = ({ showAlert }) => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            showAlert("Logged In Successfully!!", "success")
            history.push("/")
        } else {
            showAlert("Invalid Credentials", "danger");
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-2">
            <h2>Login to continue with iNotebook</h2>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input autoComplete="password" name="password" type="password" onChange={onChange} value={credentials.password} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
