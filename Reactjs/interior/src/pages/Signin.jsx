import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export const Signin = () => {
    let navigate = useNavigate()

    const [username, setUsename] = useState()
    const [password, setPassword] = useState()
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    console.log(password);

    const login = (username, password) => {
        axios.post('https://localhost:7233/api/v1/accounts/login', {
            username: username,
            password: password,
        })
            .then(response => {
                localStorage.setItem('userData', JSON.stringify(response.data));
                navigate('/')
            }
            )
            .catch(error => {
                navigate('/Error')
            })
    }

    const handleClick = () => {
        if (!username) {
            setUsernameError('User Name is empty');
            return;
        }
        if (!password) {
            setPasswordError('Password is empty');
            return;
        }

        login(username, password)
    }

    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html">
                                <h3 className="text-primary"><i className="fa fa-hashtag me-2" />MULTY INTERIOR</h3>
                            </a>
                            <h3>Sign In</h3>
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor="floatingInput">User Name</label>
                            <input type="text" className="form-control" onChange={(e) => setUsename(e.target.value)} id="floatingInput" placeholder="User Name" />
                            {usernameError && <p className="text-danger">{usernameError}</p>}
                        </div>
                        <div className="form-floating mb-4">
                            <label htmlFor="floatingPassword">Password</label>
                            <input type="password" className="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            {passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>
                        <button type="submit" onClick={handleClick} className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                        <p className="text-center mb-0">Don't have an Account? <Link to="/Signup" className="dropdown-item" type="button">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
