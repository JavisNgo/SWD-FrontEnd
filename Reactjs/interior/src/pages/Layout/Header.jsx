import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Signin } from '../Signin'
import { getCategories } from '../../api/categories'

export const Header = () => {
    let navigate = useNavigate()

    const [navbarActive, setNavbarActive] = useState('Home')

    const [categories, setCategories] = useState([])

    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        getCategories()
            .then(categoriesData => {
                setCategories(categoriesData)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const renderCategories = () => {
        return categories.map(category => (
            <a key={category.id} className="nav-item nav-link" onClick={() => handleClick(category.id)}>{category.name}</a>
        ))
    }
    const handleClick = (categoryId) => {
        navigate('/Constructs', { state: { categoryId: categoryId } });
        setNavbarActive('Constructs')
    }

    const handleSignOut = () => {
        try {
            localStorage.removeItem("userData");
            navigate('/')
            alert('You sign out')
        } catch {
            navigate('/Error')
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4">
                        <a href="/" className="text-decoration-none">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Interior</span>
                        </a>
                    </div>

                    <div className="col-lg-8 col-6 text-right">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My
                                Account</button>
                            {userData && userData.Role === 'CUSTOMER' ? (
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link to="/MyInfo" className="dropdown-item" type="button">My info</Link>
                                    <Link to="/MyRequest" className="dropdown-item" type="button">My request</Link>
                                    <a class="dropdown-item" onClick={handleSignOut}>Sign Out</a>
                                </div>
                            ) : (
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link to="/Signin" className="dropdown-item" type="button">Sign in</Link>
                                    <Link to="/Signup" className="dropdown-item" type="button">Sign up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <Link to="/" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to="/" className={navbarActive === 'Home' ? "nav-item nav-link active" : "nav-item nav-link"}
                                        onClick={(e) => setNavbarActive(e.target.innerText)}>Home
                                    </Link>
                                    <Link to="/Constructs" className={navbarActive === 'Constructs' ? "nav-item nav-link active" : "nav-item nav-link"}
                                        onClick={(e) => setNavbarActive(e.target.innerText)}>Constructs
                                    </Link>
                                    {renderCategories()}
                                </div>
                            </div>
                            <div className="input-group py-3 py-lg-0 px-0" style={{ width: 400 }}>
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" />
                                    </span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

