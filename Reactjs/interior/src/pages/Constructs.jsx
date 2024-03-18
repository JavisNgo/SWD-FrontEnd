import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getCategories } from '../api/categories'
import { getConstructs } from '../api/constructs'

export const Constructs = () => {
    const [constructs, setContructs] = useState([])
    const [categories, setCategories] = useState([])
    const [originalConstructs, setOriginalConstructs] = useState([])

    const location = useLocation();
    let categoryFilter = useRef();

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const constructsPerPage = 6;
    const indexOfLastConstruct = currentPage * constructsPerPage;
    const indexOfFirstConstruct = indexOfLastConstruct - constructsPerPage;
    const currentConstructs = constructs.slice(indexOfFirstConstruct, indexOfLastConstruct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    let navigate = useNavigate()

    useEffect(() => {
        let isMounted = true; // Sử dụng biến này để kiểm tra component đã unmount chưa

        getConstructs()
            .then(constructData => {
                if (isMounted) { // Kiểm tra component có đang mounted không
                    setContructs(constructData);
                    setOriginalConstructs(constructData);
                }
            })
            .catch(error => {
                console.log(error);
            });

        getCategories()
            .then(categoriesData => {
                if (isMounted) { // Kiểm tra component có đang mounted không
                    setCategories(categoriesData);
                }
            })
            .catch(error => {
                console.log(error);
            });

        return () => {
            isMounted = false; // Thiết lập isMounted thành false khi component unmount
        };
    }, []);

    useEffect(() => {
        categoryFilter.current = location.state?.categoryId || 0
        console.log(categoryFilter.current);
        const newArr = originalConstructs.filter(construct => construct.categoriesView.id === categoryFilter.current);
        setContructs(newArr);
    }, [])

    const renderConstructs = () => {
        return currentConstructs.map(construct => (
            <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={construct.id}>
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

    const renderCategories = () => {
        return categories.map(category => (
            <div key={category.id} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                <input type="checkbox" className="custom-control-input"
                    checked={category.id === categoryFilter.current}
                    id={`category-${category.id}`}
                    onClick={() => handleFilter(category.id)} />

                <label className="custom-control-label" htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
        ));
    }

    const handleFilter = (categoryId) => {
        if (categoryId === 0) { // Nếu không có category được chọn
            setContructs(originalConstructs); // Hiển thị lại mảng constructs ban đầu
            categoryFilter.current = 0;
        } else {
            const newArr = originalConstructs.filter(construct => construct.categoriesView.id === categoryId);
            setContructs(newArr);
            categoryFilter.current = categoryId;
        }
    }

    const goToContructDetail = useCallback(
        (constructId) => {
            navigate(
                '/ConstructDetail',
                { state: { id: constructId } }
            )
        }, [navigate])

    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                            <Link className="breadcrumb-item text-dark" to="/Contructs">Contructs</Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by categories</span></h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input"
                                        id="category-all"
                                        checked={0 === categoryFilter.current}
                                        onClick={() => handleFilter(0)} />
                                    <label className="custom-control-label" htmlFor="category-all">All categories</label>
                                </div>

                                {
                                    categories && renderCategories()
                                }
                            </form>
                        </div>
                    </div>
                    {/* Shop Sidebar End */}
                    {/* Shop Product Start */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row pb-3">
                            {
                                constructs && renderConstructs()
                            }

                            <div className="col-12">
                                <Pagination
                                    constructsPerPage={constructsPerPage}
                                    totalConstructs={constructs.length}
                                    paginate={paginate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Pagination = ({ constructsPerPage, totalConstructs, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalConstructs / constructsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

