import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getConstructById } from '../api/constructs';
import { getContractorById } from '../api/contractors';

export const ConstructDetail = () => {
    const [construct, setConstruct] = useState({})
    const [products, setProducts] = useState([])
    const [contractor, setContractor] = useState({})
    const [isState, setIsState] = useState(false)
    let contractorId = useRef()

    let navigate = useNavigate()
    const location = useLocation()

    const handleToContractorDetail = () => {
        navigate('/ContractorDetail',
            { state: { contractorId: construct.contractorId } }
        )
    }

    useEffect(() => {
        getConstructById(location.state.id)
            .then(data => {
                setConstruct(data)
                setProducts(data.constructProductsViews)
                contractorId.current = data.contractorId
                setIsState(true)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        getContractorById(contractorId.current)
            .then(data => {
                setContractor(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [contractorId.current])

    const renderConstructInfo = () => {
        return <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
                <h2>{construct.name}</h2>
                <a className="breadcrumb-item text-dark" onClick={() => handleToContractorDetail()}>{contractor.name}</a>
                <h5 className="font-weight-semi-bold mb-4">Expected price: {construct.estimatedPrice} VND</h5>
                <p className="mb-4">{construct.description}</p>
                <div className="d-flex pt-1">
                    <button type="button" className="btn btn-primary" onClick={() => handleToQuotation()}>Quotation</button>
                </div>
            </div>
        </div>
    }

    const handleToQuotation = () => {
        navigate('/Quotation', {
            state: {
                construct: construct,
                contractor: contractor
            }
        })
    }

    const TabPane1 = () => {
        return (
            <div className="tab-pane fade show active" id="tab-pane-1">
                {products.map(product => (
                    <div key={product.id} className="row">
                        <div className="col-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <img className='img-fluid img-thumbnail' style={{ width: 200, height: 200 }} src={product.productsView.productImagesViews[0].imageUrl} />
                                </li>
                            </ul>
                        </div>
                        <div className="col-9">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <h3 className='font-weight-bold p-2'>{product.productsView.name}</h3>
                                    <h5 className='font-weight-normal p-2'>{product.productsView.description}</h5>
                                    <p className='p-2'>{product.productsView.price} VND</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const TabPane2 = () => {
        return (
            <div className="tab-pane fade" id="tab-pane-2">
                <h4 className="mb-3">Construct Images</h4>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <img className='img-fluid img-thumbnail' src={isState && construct.constructImagesViews[0].imageUrl} />
                            </li>
                            <li className="list-group-item">
                                <img className='img-fluid img-thumbnail' src={isState && construct.constructImagesViews[0].imageUrl} />
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <img className='img-fluid img-thumbnail' src={isState && construct.constructImagesViews[0].imageUrl} />
                            </li>
                            <li className="list-group-item">
                                <img className='img-fluid img-thumbnail' src={isState && construct.constructImagesViews[0].imageUrl} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    const TabPane3 = () => {
        return (
            <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="mb-4">Leave a review</h4>
                        <small>Your email address will not be published. Required fields are marked *</small>
                        <div className="d-flex my-3">
                            <p className="mb-0 mr-2">Your Rating * :</p>
                            <div className="text-primary">
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                                <i className="far fa-star" />
                            </div>
                        </div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="message">Your Review *</label>
                                <textarea id="message" cols={30} rows={5} className="form-control" defaultValue={""} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Your Name *</label>
                                <input type="text" className="form-control" id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your Email *</label>
                                <input type="email" className="form-control" id="email" />
                            </div>
                            <div className="form-group mb-0">
                                <input type="submit" defaultValue="Leave Your Review" className="btn btn-primary px-3" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#" onClick={() => {navigate('/')}}>Home</a>
                            <a className="breadcrumb-item text-dark" href="#" onClick={() => {navigate('/Constructs')}}>Constructs</a>
                            <span className="breadcrumb-item active">Construct Detail</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 mb-30">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner bg-light">
                                <div className="carousel-item active">
                                    <img className="w-100 h-100" style={{ width: 100, height: 100 }} src={isState && construct.constructImagesViews[0].imageUrl} alt="Image" />
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100 h-100" style={{ width: 100, height: 100 }} src={isState && construct.constructImagesViews[0].imageUrl} alt="Image" />
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100 h-100" style={{ width: 100, height: 100 }} src={isState && construct.constructImagesViews[0].imageUrl} alt="Image" />
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100 h-100" style={{ width: 100, height: 100 }} src={isState && construct.constructImagesViews[0].imageUrl} alt="Image" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark" />
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark" />
                            </a>
                        </div>
                    </div>
                    {/**Render construct info */}
                    {renderConstructInfo()}
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <div className="nav nav-tabs mb-4">
                                <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Products List</a>
                                <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Construct Images</a>
                            </div>
                            <div className="tab-content">
                                <TabPane1 />

                                <TabPane2 />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}




