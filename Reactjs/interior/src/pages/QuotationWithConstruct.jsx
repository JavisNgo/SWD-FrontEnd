import React, { useEffect, useRef, useState } from 'react';
import { getContractorById, getContractors } from '../api/contractors';
import { getProductsByContractorId } from '../api/products';
import { useLocation } from 'react-router-dom';

export const QuotationWithConstruct = () => {
    const location = useLocation()
    const { state } = location
    let contractor = useRef()
    let construct = useRef()
    const [products, setProducts] = useState([]);
    const [selectedProductsList, setSelectedProductsList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadContractorById(state.contractorId)
        loadProductsByContractorId(state.contractorId)
        construct.current = state.construct
        setSelectedProductsList(construct.current.constructProductsViews)
    }, [])

    const loadContractorById = (contractorId) => {
        getContractorById(contractorId)
            .then(data => {
                contractor.current = data
            })
            .catch(err => {
                console.log(err);
            })
    }

    const loadProductsByContractorId = (contractorId) => {
        getProductsByContractorId(contractorId)
            .then(data => {
                setProducts(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSelectProduct = (productId) => {
        const selectedProduct = products.find(product => product.id == productId);
        setSelectedProduct(selectedProduct);
    };

    // Thêm sản phẩm đã chọn vào danh sách các sản phẩm đã chọn
    const handleAddProduct = () => {
        if (selectedProduct) {
            // Kiểm tra xem sản phẩm đã được chọn có trong danh sách hay không
            const isProductExists = selectedProductsList.some(product => product.id === selectedProduct.id);
            if (!isProductExists) {
                setSelectedProductsList(prevProducts => {
                    if (prevProducts.length < 10) {
                        return [...prevProducts, selectedProduct];
                    }
                    return prevProducts;
                });
            } else {
                console.log('This product is already added.');
            }
        }
    };

    // Xử lý sự kiện khi người dùng nhấn nút xóa sản phẩm
    const handleRemoveProduct = (index) => {
        setSelectedProductsList(prevProducts => {
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(index, 1);
            return updatedProducts;
        });
    };

    console.log(contractor);

    return (
        <div>
            <form>
                <select className="form-select" value={contractor.current.id}>
                    <option value={contractor.current.id}>{contractor.current.name}</option>
                </select>

                {
                    ( // Kiểm tra xem người dùng đã chọn nhà cung cấp chưa, nếu chưa thì không hiển thị dropdown chọn sản phẩm
                        <div>
                            <select className="form-select" onChange={(e) => handleSelectProduct(e.target.value)}>
                                <option value="">Select a product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>

                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Contractor</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProductsList.map((product, index) => (
                                            <tr key={index}>
                                                <td>{contractor.current.name}</td>
                                                <td>{product.productsView.name}</td>
                                                <td>{product.productsView.description}</td>
                                                <td>{product.productsView.price}</td>
                                                <td>
                                                    <img className='img-thumbnail img-fluid' style={{ width: 100, height: 100 }} src={product.productsView.productImagesViews[0].imageUrl} alt='image' />
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {selectedProductsList.length < 10 && (
                                    <button type="button" onClick={handleAddProduct}>Add more product</button>
                                )}

                                <button type='submit'>Quotation</button>
                            </div>
                        </div>
                    )}
            </form>
        </div>
    )
};
