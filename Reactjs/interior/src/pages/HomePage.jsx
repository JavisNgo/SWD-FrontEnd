import React, { useCallback, useEffect, useState } from 'react'
import { getCategories } from '../api/categories'
import { getConstructs } from '../api/constructs'
import { useNavigate } from 'react-router-dom'
import { getBlogs } from '../api/blogs'

export const HomePage = () => {
    const [categories, setCategories] = useState([])
    const [constructs, setContructs] = useState([])
    const [blogs, setBlogs] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        getConstructs()
            .then(constructsData => {
                setContructs(constructsData)
            })
            .catch(error => {
                console.log(error);
            });

        getCategories()
            .then(categoriesData => {
                setCategories(categoriesData);
            })
            .catch(error => {
                console.log(error);
            });

        getBlogs()
            .then(blogsData => {
                setBlogs(blogsData)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleGetQuote = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            //Navigate to get quote page
            navigate('/Quotation')
        }
        else {
            navigate('/Signin')
        }
    }

    const renderCategories = () => {
        return categories.map(category => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category.id}>
                <a className="text-decoration-none" onClick={() => handleClickCategory(category.id)}>
                    <div className="cat-item d-flex align-items-center mb-4">
                        <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                            <img className="img-fluid" src={`img/categories/${category.name}.jpeg`} alt="Image" />
                        </div>
                        <div className="flex-fill pl-3">
                            <h6>{category.name}</h6>
                        </div>
                    </div>
                </a>
            </div>
        ));
    }

    const handleClickCategory = (categoryId) => {
        navigate('/Constructs', { state: { categoryId: categoryId } });
    }

    const renderConstructs = () => {
        return constructs.map(construct => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={construct.id}>
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src={construct.constructImagesViews[0].imageUrl} alt="Image" />
                        <div className="product-action">
                            <a className="text-decoration-none text-truncate btn btn-outline-dark" onClick={() => goToContructDetail(construct.id)}>{construct.name}-{construct.estimatedPrice}$-{construct.categoriesView.name}</a>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    const goToContructDetail = (constructId) => {
        navigate(
            '/ConstructDetail',
            { state: { id: constructId } }
        )
    }

    const renderBlogs = () => {
        return blogs.map((blog, index) => (
            <div key={blog.id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src={`img/blogs/blogs (${index+1}).jpg`} alt="Image" />
                    </div>
                    <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="#">{blog.title}</a>
                    </div>
                </div>
            </div>

        ))
    }

    return (
        <>
            <div>
                <div className="container-fluid mb-3">
                    <div className="row px-xl-5">
                        <div className="col-lg-12">
                            <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#header-carousel" data-slide-to={0} className="active" />
                                    <li data-target="#header-carousel" data-slide-to={1} />
                                    <li data-target="#header-carousel" data-slide-to={2} />
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item position-relative active" style={{ height: 430 }}>
                                        <img className="position-absolute w-100 h-100" src="img/carousel-1.jpg" style={{ objectFit: 'cover' }} />
                                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div className="p-3" style={{ maxWidth: 700 }}>
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Professional</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">For Your Dream Project</p>
                                                <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#" onClick={() => { handleGetQuote() }}>Get quote</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item position-relative" style={{ height: 430 }}>
                                        <img className="position-absolute w-100 h-100" src="img/carousel-2.jpg" style={{ objectFit: 'cover' }} />
                                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div className="p-3" style={{ maxWidth: 700 }}>
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Builder</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Build Your Home</p>
                                                <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#" onClick={() => { handleGetQuote() }}>Get quote</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item position-relative" style={{ height: 430 }}>
                                        <img className="position-absolute w-100 h-100" src="img/carousel-3.jpg" style={{ objectFit: 'cover' }} />
                                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div className="p-3" style={{ maxWidth: 700 }}>
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Trusted</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">For Your Dream Home</p>
                                                <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#" onClick={() => { handleGetQuote() }}>Get quote</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-5">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
                    <div className="row px-xl-5 pb-3">
                        {renderCategories()}
                    </div>
                </div>
                <div className="container-fluid pt-5 pb-3">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured
                        Contractions</span></h2>
                    <div className="row px-xl-5">
                        {renderConstructs()}
                    </div>
                </div>
                <div className="container-fluid pt-5 pb-3">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured
                        Blogs</span></h2>
                    <div className="row px-xl-5">
                        {/**Render blogs */}
                        {renderBlogs()}
                    </div>
                </div>
            </div>
        </>
    )
}


