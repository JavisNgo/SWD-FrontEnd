import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Packages = () => {
    const [packages, setPackages] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        axios.get('https://localhost:7233/Subscriptions')
            .then(response => {
                setPackages(response.data)
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleBuyPackage = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData) {
            //Navigate with packageId to payment
            navigate('/Payment')
        } else {
            navigate('/Signin')
        }
    }

    const renderPackages = () => {
        return packages.map(item => (
            <div key={item.id} className={item.id === 2 ? "ptable-item featured-item" : "ptable-item"}>
                <div className="ptable-single">
                    <div className="ptable-header">
                        <div className="ptable-title">
                            <h2>{item.name}</h2>
                        </div>
                        <div className="ptable-price">
                            <h2><small>$</small>{item.price}<span>/ M</span></h2>
                        </div>
                    </div>
                    <div className="ptable-body">
                        <div className="ptable-description">
                            <ul>
                                <li><h3>{item.description}</h3></li>
                            </ul>
                        </div>
                    </div>
                    <div className="ptable-footer">
                        <div className="ptable-action">
                            <a href="#" onClick={handleBuyPackage}><i className="fa fa-shopping-cart"></i>Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div class="pricing-table table-3">
            {renderPackages()}
        </div>
    )
}
