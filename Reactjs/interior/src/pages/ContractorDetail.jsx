import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConstructsOfContractor } from './ConstructsOfContractor';
import { ProductsOfContractor } from './ProductsOfContractor';

export const ContractorDetail = () => {
  const [navbarActive, setNavbarActive] = useState('Constructs');
  const [contractor, setContractor] = useState({});
  const navigate = useNavigate()
  const location = useLocation();
  const contractorIdRef = useRef(location.state ? location.state.contractorId : null);

  useEffect(() => {
    const contractorId = contractorIdRef.current;
    if (contractorId) {
      axios.get(`https://localhost:7233/api/v1/contractors/id=${contractorId}`)
        .then(response => {
          setContractor(response.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const handleContent = (page) => {
    switch (page) {
      case 'Constructs':
        return <ConstructsOfContractor contractorId={contractorIdRef.current} />;
      case 'Products':
        return <ProductsOfContractor contractorId={contractorIdRef.current} />;
      default:
        return null;
    }
  };
  const GoQuoation = () =>{
    navigate("/Quotation")
  }
  const RenderContractorInfo = () => (
    <div className="container-fluid mb-30">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-8">
          <div className="card" style={{ borderRadius: 15 }}>
            <div className="card-body p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                  <img src="img/sponsor/vendor-1.jpg" alt="Generic placeholder image" className="img-fluid" style={{ width: 180, borderRadius: 10 }} />
                </div>
                <div className="flex-grow-1 ml-3">
                  <h5 className="mb-1">{contractor.name}</h5>
                  <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>{contractor.email}</p>
                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                    <div>
                      <p className="small text-muted mb-1">Address</p>
                      <p className="mb-0">{contractor.address}</p>
                      <p className="small text-muted mt-1 mb-1">Phone Number</p>
                      <p className="mb-0">{contractor.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <button type="button" onClick={GoQuoation} className="btn btn-primary flex-grow-1">Quotation</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <RenderContractorInfo />

      <nav className="navbar card navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className={`nav-link text-dark h4 ${navbarActive === 'Constructs' ? 'active' : ''}`}
                href="#"
                onClick={() => setNavbarActive('Constructs')}
              >
                Constructs
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link text-dark h4 ${navbarActive === 'Products' ? 'active' : ''}`}
                href="#"
                onClick={() => setNavbarActive('Products')}
              >
                Products
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="content">{handleContent(navbarActive)}</div>
    </>
  );
};

