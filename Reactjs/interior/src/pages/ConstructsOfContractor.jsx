import React, { useCallback, useEffect, useState } from 'react'
import { getConstructsByContractorId } from '../api/constructs'
import { useNavigate } from 'react-router-dom'

export const ConstructsOfContractor = ({ contractorId }) => {
    const [constructs, setConstructs] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        getConstructsByContractorId(contractorId)
            .then(data => {
                setConstructs(data)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const renderConstructs = () => {
        return constructs.map(construct => (
            <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={construct.id}>
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" style={{ width: 290, height: 290 }} src={`img/construct-banner/construct-banner(${construct.id}).jpg`} alt="Image" />
                        <div className="product-action">
                            <a className="text-decoration-none text-truncate btn btn-outline-dark" onClick={() => goToContructDetail(construct.id)}>{construct.name}-{construct.estimatedPrice}$-{construct.categoriesView.name}</a>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    const goToContructDetail = useCallback(
        (constructId) => {
            navigate(
                '/ConstructDetail',
                { state: { id: constructId } }
            )
        }, [navigate])

    return (
        <div className="container-fluid pt-5 pb-3">
            <div className="row px-xl-5">
                {constructs && renderConstructs()}
            </div>
        </div>
    )
}


