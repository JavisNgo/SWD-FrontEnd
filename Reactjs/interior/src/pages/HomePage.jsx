import React from 'react'

export const HomePage = () => {
    return (
        <>
            <div>
                <div className="container-fluid mb-3">
                    <div className="row px-xl-5">
                        <div className="col-lg-8">
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
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men
                                                    Fashion</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet
                                                    lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                                <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item position-relative" style={{ height: 430 }}>
                                        <img className="position-absolute w-100 h-100" src="img/carousel-2.jpg" style={{ objectFit: 'cover' }} />
                                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div className="p-3" style={{ maxWidth: 700 }}>
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women
                                                    Fashion</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet
                                                    lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                                <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item position-relative" style={{ height: 430 }}>
                                        <img className="position-absolute w-100 h-100" src="img/carousel-3.jpg" style={{ objectFit: 'cover' }} />
                                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div className="p-3" style={{ maxWidth: 700 }}>
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids
                                                    Fashion</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet
                                                    lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                                <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="product-offer mb-30" style={{ height: 200 }}>
                                <img className="img-fluid" src="img/offer-1.jpg" alt />
                                <div className="offer-text">
                                    <h6 className="text-white text-uppercase">Save 20%</h6>
                                    <h3 className="text-white mb-3">Special Offer</h3>
                                    <a href className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                            <div className="product-offer mb-30" style={{ height: 200 }}>
                                <img className="img-fluid" src="img/offer-2.jpg" alt />
                                <div className="offer-text">
                                    <h6 className="text-white text-uppercase">Save 20%</h6>
                                    <h3 className="text-white mb-3">Special Offer</h3>
                                    <a href className="btn btn-primary">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-5">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
                    <div className="row px-xl-5 pb-3">
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <a className="text-decoration-none" href>
                                <div className="cat-item d-flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                        <img className="img-fluid" src="img/categories/Mid-century modern.jpeg" alt />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>Mid-century modern</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <a className="text-decoration-none" href>
                                <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                        <img className="img-fluid" src="img/categories/Mordern-industry.jpeg" alt />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>Industrial</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <a className="text-decoration-none" href>
                                <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                        <img className="img-fluid" src="img/categories/Traditional.jpeg" alt />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>Traditional</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <a className="text-decoration-none" href>
                                <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                        <img className="img-fluid" src="img/categories/Modern.jpeg" alt />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>Modern</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-5 pb-3">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured
                        Products</span></h2>
                    <div className="row px-xl-5">
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-1.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-2.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-3.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-4.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-5.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-6.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-7.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-8.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-5">
                    <div className="row px-xl-5 justify-content-center">
                        <a href="https://baogia.lanha.vn/" target="_blank">
                            <img src="https://www.lanha.vn/wp-content/uploads/2023/11/banner-baogia-1.jpg.webp" className="img-fluid border" alt="Banner Baogia" decoding="async" title="Banner Baogia" style={{ height: 400 }} />
                        </a>
                    </div>
                </div>
                <div className="container-fluid pt-5 pb-3">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured
                        Products</span></h2>
                    <div className="row px-xl-5">
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-1.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-2.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-3.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-4.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-5.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-6.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-7.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src="img/project/project-8.jpg" alt />
                                    <div className="product-action">
                                        <a className="text-decoration-none text-truncate btn btn-outline-dark" href>Product Name Goes
                                            Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-5">
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="owl-carousel vendor-carousel">
                                <div className="bg-light p-4">
                                    <img src="img/vendor-1.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-2.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-3.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-4.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-5.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-6.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-7.jpg" alt />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="img/vendor-8.jpg" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
