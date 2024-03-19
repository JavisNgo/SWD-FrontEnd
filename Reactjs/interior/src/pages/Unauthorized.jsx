import React from 'react'
import { Link } from 'react-router-dom'

export const Unauthorized = () => {
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row vh-100 bg-light rounded align-items-center justify-content-center mx-0">
                <div className="col-md-6 text-center p-4">
                    <i className="bi bi-exclamation-triangle display-1 text-primary" />
                    <h1 className="display-1 fw-bold">401</h1>
                    <h1 className="mb-4">Unauthorized</h1>
                    <p className="mb-4">We’re sorry, the page you have looked for may need have permission !
                        Maybe go to our home page or try to login?</p>
                    <Link to="/" className="btn btn-primary rounded-pill py-3 px-5">Go Back To Home</Link>
                    <Link to="/Signin" className="btn btn-primary rounded-pill py-3 px-5">Go To Login Page</Link>
                </div>
            </div>
        </div>
    )
}
