import React, { useEffect, useState } from 'react'
import { getProductsByContractorId } from '../api/products'
import { useNavigate } from 'react-router-dom'

export const ProductsOfContractor = ({ contractorId }) => {
    const [products, setProducts] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        getProductsByContractorId(contractorId)
            .then(data => {
                setProducts(data)
            })
            .catch(err => [
                navigate("/Error")
            ])
    }, [])


    const renderProducts = () => {
        return products.map(product => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product.id}>
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src={product.productImagesViews[0].imageUrl} alt="Image"/>
                    </div>
                    <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate">{product.name}</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>${product.price}</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className="container-fluid pt-5 pb-3">
            <div className="row px-xl-5">
                {renderProducts()}
            </div>
        </div>
    )
}
