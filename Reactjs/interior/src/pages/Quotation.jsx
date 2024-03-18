import React, { useEffect, useState } from 'react';
import { getContractorById, getContractors } from '../api/contractors';
import { getProductsByContractorId } from '../api/products';

export const Quotation = () => {
    const [contractor, setContractor] = useState({});
    const [contractors, setContractors] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductsList, setSelectedProductsList] = useState([]);
    const [contractorSelected, setContractorSelected] = useState(false);

    // Gọi API để lấy danh sách nhà cung cấp khi component được render
    useEffect(() => {
        getContractors()
            .then(response => {
                response && setContractors(response);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // Gọi API để lấy danh sách sản phẩm của nhà cung cấp khi nhà cung cấp được chọn thay đổi
    useEffect(() => {
        if (contractor.id) {
            getProductsByContractorId(contractor.id)
                .then(products => {
                    if (!products) {
                        setProducts([]);
                    }
                    setProducts(products);
                })
                .catch(err => {
                    console.log(err);
                    setProducts([]);
                });
        }
    }, [contractor]);

    // Xử lý sự kiện khi người dùng chọn một nhà cung cấp từ dropdown
    const handleSelectContractor = (contractorId) => {
        const selectContractor = contractors.find(contractor => contractor.id == contractorId);
        setContractor(selectContractor);
        setContractorSelected(true); // Đặt biến state này thành true khi người dùng đã chọn một nhà cung cấp
    };

    // Xử lý sự kiện khi người dùng chọn một sản phẩm từ dropdown
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

    // Xử lý khi người dùng gửi báo giá
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected products:', selectedProductsList);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select className="form-select" onChange={(e) => handleSelectContractor(e.target.value)}>
                    <option value="">Select a supplier</option>
                    {contractors.map(contractor => (
                        <option key={contractor.id} value={contractor.id}>{contractor.name}</option>
                    ))}
                </select>

                {contractorSelected && ( // Kiểm tra xem người dùng đã chọn nhà cung cấp chưa, nếu chưa thì không hiển thị dropdown chọn sản phẩm
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
                                            <td>{contractor.name}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <img className='img-thumbnail img-fluid' style={{ width: 100, height: 100 }} src={product.productImagesViews[0].imageUrl} alt='image' />
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
    );
};
