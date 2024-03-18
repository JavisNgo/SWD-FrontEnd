import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
            <a key={category.id} href="#" className="nav-item nav-link" onClick={() => handleClick(category.id)}>{category.name}</a>
        ))
    }
    const handleClick = (categoryId) => {
        navigate('/Constructs', { state: { categoryId: categoryId } });
        setNavbarActive('Constructs')
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
                    <div className="col-lg-4 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-6 text-right">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My
                                Account</button>
                            {userData ? (
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link to="/MyInfo" className="dropdown-item" type="button">My info</Link>
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
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: 65, padding: '0 30px' }}>
                            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2" />Categories</h6>
                            <i className="fa fa-angle-down text-dark" />
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: 'calc(100% - 30px)', zIndex: 999 }}>
                            <div className="navbar-nav w-100">
                                {/**Render categories */}
                                {renderCategories()}
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
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
                                    <Link to="/" className={navbarActive === 'Home' ? "nav-item nav-link active" : "nav-item nav-link"} onClick={(e) => setNavbarActive(e.target.innerText)}>Home</Link>
                                    <Link to="/Constructs" className={navbarActive === 'Constructs' ? "nav-item nav-link active" : "nav-item nav-link"} onClick={(e) => setNavbarActive(e.target.innerText)}>Constructs</Link>
                                    <a href="checkout.html" className="nav-item nav-link">Checkout</a>
                                    <a href="contact.html" className="nav-item nav-link">Contact</a>
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1"></i></a>
                                        <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                            <Link to="/ContractorDetail" className="dropdown-item">Contractor Detail</Link>
                                            <Link to="/ConstructDetail" className="dropdown-item">Construct Detail</Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

