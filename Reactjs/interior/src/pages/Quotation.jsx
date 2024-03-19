import React, { useEffect, useRef, useState } from 'react';
import { getContractorById, getContractors } from '../api/contractors';
import { getProductsByContractorId } from '../api/products';
import { useLocation, useNavigate } from 'react-router-dom';
import { postRequest } from '../api/request';
import { getCustomerByUsername } from '../api/customer';

export const Quotation = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()

    const [contractor, setContractor] = useState({});
    const [contractors, setContractors] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductsList, setSelectedProductsList] = useState([]);
    const [contractorSelected, setContractorSelected] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [productsQuantity, setProductsQuantity] = useState([])

    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    // Gọi API để lấy danh sách nhà cung cấp khi component được render
    useEffect(() => {
        if (state && state.contractor && state.construct) {
            setContractors([state.contractor])
            const selectedProducts = state.construct.constructProductsViews.map(item => item.productsView)
            selectedProducts.forEach(element => {
                setDefaultQuantity(element.id, 1)
            });
            setSelectedProductsList(selectedProducts)
            loadProductsByContractorId(state.contractor.id)
            setContractorSelected(true)
        }
        else {
            getContractors()
                .then(response => {
                    response && setContractors(response);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    // Gọi API để lấy danh sách sản phẩm của nhà cung cấp khi nhà cung cấp được chọn thay đổi
    useEffect(() => {
        if (contractor.id) {
            loadProductsByContractorId(contractor.id)
        }

        return () => {
            setSelectedProductsList([])
        }
    }, [contractor]);
    const loadProductsByContractorId = (contractorId) => {
        getProductsByContractorId(contractorId)
            .then(products => {
                if (!products) {
                    setProducts([]);
                }
                setProducts(products);
            })
            .catch(err => {
                console.log(err);
            })
    }

    //Xử lý tính tổng tiền
    useEffect(() => {
        setTotalPrice(selectedProductsList.reduce((total, product) => {
            const foundQuantity = productsQuantity.find(item => item.productId == product.id);
            if (foundQuantity) {
                return total + product.price * foundQuantity.quantity
            }
            else {
                return total + product.price
            }
        }, 0))
    }, [selectedProductsList, productsQuantity])

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

    // Xử lý khi người dùng thêm sản phẩm
    const handleAddProduct = () => {
        if (selectedProduct) {
            // Kiểm tra xem sản phẩm đã được chọn có trong danh sách hay không
            const isProductExists = selectedProductsList.some(product => product.id === selectedProduct.id);
            if (!isProductExists) {
                setSelectedProductsList(prevProducts => {
                    if (prevProducts.length < 10) {
                        // Thêm sản phẩm vào danh sách với số lượng mặc định là 1
                        const productWithDefaultQuantity = { ...selectedProduct };
                        setDefaultQuantity(productWithDefaultQuantity.id, 1);
                        return [...prevProducts, productWithDefaultQuantity];
                    }
                    return prevProducts;
                });
            } else {
                alert('This product is already added.');
            }
        }
    };

    // Thiết lập số lượng mặc định cho một sản phẩm
    const setDefaultQuantity = (productId, defaultQuantity) => {
        setProductsQuantity(prev => {
            const isProductExists = prev.some(product => product.productId === productId);
            if (!isProductExists) {
                // Thêm số lượng mặc định cho sản phẩm vào danh sách số lượng sản phẩm
                return [...prev, { productId, quantity: parseInt(defaultQuantity) }];
            }
            return prev;
        });
    };

    // Xử lý sự kiện khi người dùng nhấn nút xóa sản phẩm
    const handleRemoveProduct = (productId) => {
        setSelectedProductsList(prev => {
            const updatedProducts = prev.filter(item => item.id != productId);
            return updatedProducts;
        });
        setProductsQuantity(prev => {
            const updatedArr = prev.filter(item => item.productId != productId);
            return updatedArr;
        })
    };

    // Xử lý khi người dùng gửi báo giá 
    const handleSubmit = (e) => {
        e.preventDefault();
        getCustomerByUsername(userData.Username)
            .then(customer => {
                const requestJson = {
                    "customerId": customer.id,
                    "contractorId": state ? state.contractor.id : contractor.id,
                    "note": "string",
                    "totalPrice": totalPrice,
                    "requestDetailViews": productsQuantity
                }
                postRequest(requestJson)
                    .then(response => {
                        if (response.status === 200) {
                            navigate('/MyRequest')
                        }
                        else {
                            console.log(response)
                        }
                    }
                    )
                    .catch(err => {
                        console.log(err.response)
                        navigate('/Error')
                    }
                    )
            })
            .catch(err => {
                console.log(err.response)
                navigate('/Error')
            })
    };

    // Xử lý khi người dùng nhập quantity
    const handleQuantity = (quantity, productId) => {
        setProductsQuantity(prev => {
            const isProductExists = prev.some(product => product.productId === productId);
            if (!isProductExists) {
                // Nếu sản phẩm chưa tồn tại trong danh sách, thêm nó vào với số lượng mới
                return [...prev, {
                    productId: productId,
                    quantity: quantity ? parseInt(quantity) : 1
                }];
            } else {
                // Nếu sản phẩm đã tồn tại trong danh sách, cập nhật số lượng của nó
                return prev.map(product => {
                    if (product.productId === productId) {
                        return {
                            ...product,
                            quantity: quantity ? parseInt(quantity) : 1
                        };
                    }
                    return product;
                });
            }
        });
    };


    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='row justify-content-between pb-4'>
                    <div className='col-6'>
                        <select className="form-select p-1" value={state && state.contractor.id} onChange={(e) => handleSelectContractor(e.target.value)}>
                            {!state && (<option value="">Select a contractor</option>)}
                            {contractors.map(contractor => (
                                <option key={contractor.id} value={contractor.id}>{contractor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-6'>
                        <h5>Total price of all products: {totalPrice} VND</h5>
                    </div>
                </div>

                {contractorSelected && ( // Kiểm tra xem người dùng đã chọn nhà cung cấp chưa, nếu chưa thì không hiển thị dropdown chọn sản phẩm
                    <div>
                        <div className='pb-4'>
                            <select className="form-select p-1" onChange={(e) => handleSelectProduct(e.target.value)}>
                                <option value="">Select a product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead className='bg-primary'>
                                    <tr>
                                        <th>Contractor</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedProductsList.map((product, index) => (
                                        <tr key={index}>
                                            <td className='col-sm-1'>{contractor.name || state.contractor.name}</td>
                                            <td className='col-sm-2'>{product.name}</td>
                                            <td className='col-sm-4'>{product.description}</td>
                                            <td className='col-sm-1'>{product.price}</td>
                                            <td className='col-sm-1'>
                                                <input type='number' placeholder='quantity' min='1' max='10'
                                                    onChange={(e) => handleQuantity(e.target.value, product.id)}>
                                                </input>
                                            </td>
                                            <td className='col-sm-1'>
                                                <img className='img-thumbnail img-fluid' style={{ width: 100, height: 100 }} src={product.productImagesViews[0].imageUrl} alt='image' />
                                            </td>
                                            <td className='col-sm-2'>
                                                <button type="button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='row container-fluid'>
                                {selectedProductsList.length < 10 && (
                                    <div className='col-3'>
                                        <button type="button" onClick={handleAddProduct}>Add product</button>
                                    </div>
                                )}
                                <div className='col-3'>
                                    <button type='submit'>Quotation</button>
                                </div>
                            </div>


                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
