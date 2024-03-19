import React, { useEffect, useRef, useState } from 'react'
import { getRequestByCustomerId } from '../api/request';
import { getContractorById } from '../api/contractors';
import { getCustomerByUsername } from '../api/customer';
import { getContractByRequestId, updateContract } from '../api/contract';
import { useNavigate } from 'react-router-dom';

export const MyRequest = () => {
    // Pending Accept Complete Sign Reject
    const [customerRequests, setCutomerRequests] = useState([])
    const [filterRequests, setFilterRequests] = useState([])
    const [contractor, setContractor] = useState({})
    const [contract, setContract] = useState()
    let contractApi = useRef()
    let navigate = useNavigate()


    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    useEffect(() => {
        if (userData) {
            getCustomerByUsername(userData.Username)
                .then(customer => {
                    getRequestByCustomerId(customer.id)
                        .then(requestData => {
                            setCutomerRequests(requestData)
                            const newArr = requestData.filter(item => item.status == 0)
                            setFilterRequests(newArr)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }, [])

    const handleClickRequest = (status) => {
        const newArr = customerRequests.filter(item => item.status == status)
        setFilterRequests(newArr)
    }

    const renderTime = (time) => {
        // Giả sử request.timeIn là một đối tượng datetime
        const dateTimeString = time;
        const dateTime = new Date(dateTimeString);

        // Lấy ngày, tháng và năm từ đối tượng Date
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1; // Lưu ý: tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = dateTime.getFullYear();

        // Tạo chuỗi ngày/tháng/năm
        const formattedDate = `${day}/${month}/${year}`;

        // Sử dụng chuỗi đã được định dạng để hiển thị
        return (
            <small><i>{formattedDate}</i></small>
        );
    }

    const renderRequestInfo = () => {
        return filterRequests.map((request, index) => (
            <div key={index} className="card mb-4 border-bottom pb-4 justify-content-center">
                <div className="card-body">
                    <div className='row'>
                        <div className='col-1'>
                            <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1 card-img-top" style={{ width: 45 }} />
                        </div>
                        <div className='col-9'>
                            <h4 className='pb-2'>{request.contractorName}</h4>
                            <h6 className='pb-2'>Time in: {renderTime(request.timeIn)}</h6>
                            <h6 className='pb-2'>Time out: {renderTime(request.timeOut)}</h6>
                            <p>{request.note}
                            </p>
                        </div>
                        {request.status == 2 && (
                            <div className="col-2 pt-1">
                                <input type="file" onChange={(e) => handleFileChange(e)} />
                                <button type="button" className="btn btn-primary flex-grow-1" 
                                onClick={() => handleUploadContract(request.id)}>Upload Contract</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1]; // Chỉ lấy phần base64
                contractApi.current = base64Data
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadContract = (requestId) => {
        const contractDataJson = {
            "requestId": requestId,
            "contractUrl": contractApi.current
        }
        getContractByRequestId(requestId)
            .then(contractData => {
                console.log(contractDataJson);
                updateContract(contractData.id, contractDataJson)
                    .then(response => navigate('/MyRequest'))
                    .catch(err => navigate('/Error'))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="row px-xl-5">
            <div className="col">
                <div className="bg-light p-30">
                    <div className="nav nav-tabs mb-4">
                        <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1" onClick={() => handleClickRequest(0)}>Pending</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2" onClick={() => handleClickRequest(1)}>Accept</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3" onClick={() => handleClickRequest(2)}>Complete</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-4" onClick={() => handleClickRequest(3)}>Sign</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-5" onClick={() => handleClickRequest(4)}>Deposit</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-5" onClick={() => handleClickRequest(5)}>Reject</a>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <div className="row">
                                <div className="container-fluid">
                                    <h4 className="mb-4">{filterRequests.length} request</h4>
                                    {renderRequestInfo()}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-2">
                            <div className="row">
                                <div className="container-fluid">
                                    <h4 className="mb-4">{filterRequests.length} request</h4>
                                    {renderRequestInfo()}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row">
                                <div className="container-fluid">
                                    <h4 className="mb-4">{filterRequests.length} request</h4>
                                    {renderRequestInfo()}

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-4">
                            <div className="row">
                                <div className="container-fluid">
                                    <h4 className="mb-4">{filterRequests.length} request</h4>
                                    {renderRequestInfo()}

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-5">
                            <div className="row">
                                <div className="container-fluid">
                                    <h4 className="mb-4">{filterRequests.length} request</h4>
                                    {renderRequestInfo()}

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-6">
                            <div className="row">
                                <div className="container-fluid">
                                    <h4 className="mb-4">{filterRequests.length} request</h4>
                                    {renderRequestInfo()}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
