import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import myaccountIcon from '../icons/myaccountIcon.svg'
const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const hanldeLogout = () => {
        localStorage.removeItem('token');
        history.push('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">about</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link
                                to='/login'
                                role="button"
                                className="btn btn-primary mx-1">Login</Link>
                            <Link
                                to='/signup'
                                role="button"
                                className="btn btn-primary mx-1">Sign Up</Link>
                        </form> : <div className="d-flex justify-content-evenly align-items-center">
                            <Link to='/myaccount'>
                                <img
                                    src={myaccountIcon}
                                    alt="MyAccount"
                                    className="bg-light mx-2 rounded-circle" />
                            </Link>
                            <button className="btn btn-primary mx-2" onClick={hanldeLogout}>Logout</button>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
