import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Modal, Pagination, Tab, Tabs } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import ComboDetail from "./ComboDetail";
import PieChart from "../Chart/PieChart";
import { deepOrange, deepPurple } from '@mui/material/colors';
import BarChart from "../Chart/BarChart";
import SearchIcon from '@mui/icons-material/Search';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { PDFViewer } from '@react-pdf/renderer';
import ExportPDF from "../../components/ExportPDF";
import RequestDetail from "./RequestDetail";

const ContractorIndex = () => {
    //API route---------------------------------------------------------

    const productGetAllAPI = "https://localhost:7233/api/v1/products/get";
    const productPostAPI = "https://localhost:7233/api/v1/products/post";
    const productPutAPI = "https://localhost:7233/api/v1/products/put";
    const productDeletaAPI = "https://localhost:7233/api/v1/products/put/status";

    const comboGetAllAPI = "https://localhost:7233/api/v1/constructs/get"
    const comboPostAPI = "https://localhost:7233/api/v1/constructs/post"
    const comboDeleteAPI = "https://localhost:7233/api/v1/constructs/delete"
    const comboPutAPI = "https://localhost:7233/api/v1/constructs/put"

    const categoryGetALLAPI = "https://localhost:7233/api/v1/categories/get"
    const categoryPutAPI = "https://localhost:7233/api/v1/categories/put"
    const categoryPostAPI = "https://localhost:7233/api/v1/categories/post"
    const categoryDeleteAPI = "https://localhost:7233/api/v1/categories/delete"

    const requestGetAllAPI = "https://localhost:7233/Requests"
    const requestPostAPI = "https://localhost:7233/Requests/"
    const requestPendingToAcceptAPI = "https://localhost:7233/RequestAccepted"
    const requestAcceptToCompleteAPI = "https://localhost:7233/IsMeeting"

    const customerGetAllAPI = "https://localhost:7233/api/v1/customers"

    const appoinmentGetByContractorAllAPI = "https://localhost:7233/api/v1/appointments/contractor"

    const contractGetByContractorAPI = "https://localhost:7233/api/v1/contracts/contractor"

    const depositGetAllAPI = "https://localhost:7233/api/v1/depositOrders/get"
    const depositAcceptStatusAPI = "https://localhost:7233/api/v1/depositOrders/update"

    const blogGetAllAPI = "https://localhost:7233/api/v1/blogs/get"
    const blogPostAPI = "https://localhost:7233/api/v1/blogs/post"
    const blogPutAPI = "https://localhost:7233/api/v1/blogs/put"
    const blogDeleteAPI = "https://localhost:7233/api/v1/blogs/delete"
    const ContractorId = 1;
    // ----------------Load Data-----------
    function loadItem() {
        fetch(categoryGetALLAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setCategory(data))
            .catch(err => console.log(err))

        fetch(requestGetAllAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setRequestItem(data.filter(x => x.contractorId == ContractorId)))
            .catch(err => console.log(err))

        fetch(customerGetAllAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setCustomerItem(data))
            .catch(err => console.log(err))
        fetch(depositGetAllAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setItemDeposit(data))
            .catch(err => console.log(err))

        fetch(blogGetAllAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setItemBlogCombo(data.filter(x => x.contractorId == ContractorId)))
            .catch(err => console.log(err))
        fetch(contractGetByContractorAPI + `/${contractorId}`, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setItemContract(data))
            .catch(err => console.log(err))
        fetch(appoinmentGetByContractorAllAPI + `/${contractorId}`, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setItemAppointment(data))
            .catch(err => console.log(err))
        fetch(productGetAllAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setItem(data.filter(x => x.contractorId == ContractorId)))
            .catch(err => console.log(err))

        fetch(comboGetAllAPI, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => setItemCombo(data.filter(x => x.contractorId == ContractorId)))
            .catch(err => console.log(err))
    }

    //Variable Declare--------------------------------------------------------
    const [contractorId, setContractorId] = useState(1);
    const defaultPlugin = defaultLayoutPlugin()
    const [item, setItem] = useState();
    const [onreload, setOnReload] = useState(true)
    const [requestItem, setRequestItem] = useState();
    const [customerItem, setCustomerItem] = useState();
    const [itemCombo, setItemCombo] = useState();
    const [itemAppointment, setItemAppointment] = useState()
    const [itemDeposit, setItemDeposit] = useState()
    var inputImages = []
    const [contractDisplay, setContractDisplay] = useState()
    const [itemBlogCombo, setItemBlogCombo] = useState();
    const [itemContract, setItemContract] = useState();
    const [handleModal, setHandleModal] = useState(false);
    const [category, setCategory] = useState();
    const [actionMode, setActionMode] = useState("")
    const [Product, setProduct] = useState();
    const [page, setPage] = useState(1);
    const [inputProductForm, setInputProductForm] = useState({
        contractorId: 1,
        name: "",
        description: "",
        price: 0,
        status: true,
        productImagesViews: []
    })
    const [inputCombo, setInputCombo] = useState({
        "contractorId": 1,
        "categoryId": 1,
        "name": "",
        "description": "",
        "estimatedPrice": 0,
        "constructImagesViews": []
    })
    const [inputBlog, setInputBlog] = useState({
        "contractorId": 1,
        "title": "",
        "content": "",
        "editTime": (new Date().toISOString()),
        "status": true,
        "blogImagesViews": []
    })
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "10px",
        overflowY: 'scroll',
        display: 'block',
    };
    const styleContract = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "10px",
        overflowY: 'scroll',
        display: 'block',
    };
    const styleCombo = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1400,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "10px",
        overflowY: 'scroll',
        display: 'block',
    };
    const [sideBar, setSideBar] = useState("PRODUCT")
    const [constructionProcessStatus, setConstructionProcessStatus] = useState(0)
    //ChangeInputForm ----------------------------------------------------------------
    async function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = reject
        })
    }


    const OnFormChange = async (event) => {
        if (event.target.files) {
            for (let index = 0; index < event.target.files.length; index++) {
                let data = ''
                await getBase64(event.target.files[index])
                    .then(res => {
                        data = res
                        console.log(res)
                    })
                    .catch(err => console.log(err))
                inputImages.push({
                    imageUrl: data.slice(data.indexOf("base64,") + "base64,".length, data.length)
                })
            }
            if (actionMode === "EDIT" && inputProductForm.productImagesViews) {
                inputProductForm.productImagesViews.forEach(element => {
                    inputImages.push(element)
                });
            }
            setInputProductForm(
                {
                    ...inputProductForm,
                    productImagesViews: inputImages
                }
            );
        } else {
            setInputProductForm({
                ...inputProductForm,
                [event.target.name]: event.target.value
            })
        }
    }
    const OnFormComboChange = async (event) => {
        if (event.target.files) {
            for (let index = 0; index < event.target.files.length; index++) {
                let data = ''
                await getBase64(event.target.files[index])
                    .then(res => {
                        data = res
                        console.log(res)
                    })
                    .catch(err => console.log(err))
                inputImages.push({
                    imageUrl: data.slice(data.indexOf("base64,") + "base64,".length, data.length)
                })
            }
            if (actionMode === "EDIT" && inputCombo.constructImagesViews) {
                inputCombo.constructImagesViews.forEach(element => {
                    inputImages.push(element)
                });
            }
            setInputCombo(
                {
                    ...inputCombo,
                    constructImagesViews: inputImages
                }
            );
        } else {
            setInputCombo({
                ...inputCombo,
                [event.target.name]: event.target.value
            })
        }
    }

    const OnFormBlogChange = async (event) => {
        if (event.target.files) {
            for (let index = 0; index < event.target.files.length; index++) {
                let data = ''
                await getBase64(event.target.files[index])
                    .then(res => {
                        data = res
                        console.log(res)
                    })
                    .catch(err => console.log(err))
                inputImages.push({
                    imageUrl: data.slice(data.indexOf("base64,") + "base64,".length, data.length)
                })
            }
            if (actionMode === "EDIT" && inputBlog.blogImagesViews) {
                inputBlog.blogImagesViews.forEach(element => {
                    inputImages.push(element)
                });
            }
            setInputBlog(
                {
                    ...inputBlog,
                    blogImagesViews: inputImages
                }
            );
        } else {
            setInputBlog({
                ...inputBlog,
                [event.target.name]: event.target.value
            })
        }
        // if (event.target.files) {
        //     for (let index = 0; index < event.target.files.length; index++) {
        //         inputImages.push(event.target.files[index])

        //     }
        //     setInputBlog(
        //         {
        //             ...inputBlog,
        //             "blogImagesViews": inputImages
        //         }
        //     );
        // }
    }
    function RemoveImage(Url) {
        if (window.confirm("You want to remove this image ?"))
            setInputProductForm({
                ...inputProductForm,
                productImagesViews: inputProductForm.productImagesViews.filter(x => x.imageUrl !== Url)
            })
        // inputProductForm.productImagesViews.splice(inputProductForm.productImagesViews.indexOf(inputProductForm.productImagesViews.find(x => x.productId == id))-1, 1)
    }
    function RemoveImageBlog(Url) {
        if (window.confirm("You want to remove this image ?"))
            setInputBlog({
                ...inputBlog,
                blogImagesViews: inputBlog.blogImagesViews.filter(x => x.imageUrl !== Url)
            })
        // inputProductForm.productImagesViews.splice(inputProductForm.productImagesViews.indexOf(inputProductForm.productImagesViews.find(x => x.productId == id))-1, 1)
    }
    function RemoveImageConstruct(Url) {
        if (window.confirm("You want to remove this image ?"))
            setInputCombo({
                ...inputCombo,
                constructImagesViews: inputCombo.constructImagesViews.filter(x => x.imageUrl !== Url)
            })
    }
    const MarkContract = async () => {
        const pdfBytes = await fetch('/contract/Contract.pdf').then((response) => response.arrayBuffer());
        const sealBytes = await fetch('/img/Stamp/InteriorStamp.png').then((response) => response.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const sealImage = await pdfDoc.embedPng(sealBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[pages.length - 1]

        firstPage.drawImage(sealImage, {
            x: 400,
            y: 100,
            width: 100,
            height: 100,
        });

        const pdfBytesWithSeal = await pdfDoc.save();
        const file = new Blob([pdfBytesWithSeal]);
        //file.type = "Microsoft Edge PDF Document"
        //saveAs(file,"test.pdf")
        //setContractDisplay(pdfBytesWithSeal);
        console.log(pdfBytesWithSeal)
        console.log(file)
    }

    //SideBar Action-------------------------------------------------------------------
    const ProductSideBar = () => {
        setSideBar("PRODUCT")
        setActionMode("")
        setPage(1)
    }
    const ComboSideBar = () => {
        setSideBar("COMBO")
        setActionMode("")
        setPage(1)
    }
    const CategorySideBar = () => {
        setSideBar("CATEGORY")
        setActionMode("")
        setPage(1)
    }
    const ConstructionProcessSibar = () => {
        setSideBar("CONSTRUCTIONPROCESS")
        setActionMode("")
        setPage(1)
    }
    const BlogSideBar = () => {
        setSideBar("BLOG")
        setActionMode("")
        setPage(1)
    }
    const ContractSideBar = () => {
        setSideBar("CONTRACT")
        setActionMode("")
        setPage(1)
    }
    const DashboardSideBar = () => {
        setSideBar("DASHBOARD")
        setActionMode("")
        setPage(1)
    }
    //Action Mode ---------------------------------------------------------------------
    const AddActionMode = () => {
        if (actionMode === "") {
            setActionMode("ADD")
            setHandleModal(true)
        }
        else {
            setActionMode("")
            setHandleModal(false)
        }
    }
    function EditActionMode(id) {
        if (actionMode === "") {
            setActionMode("EDIT")
            setHandleModal(true)
            var product
            if (item !== undefined) {
                product = item.find(x => x.id === id);
            }
            setProduct(product)
            inputImages = product.productImagesViews
            inputProductForm.productImagesViews = product.productImagesViews
            inputProductForm.name = product.name
            inputProductForm.description = product.description
            inputProductForm.price = product.price
        }
        else {
            setActionMode("")
            setProduct(-1)
            setHandleModal(false)
            inputProductForm.name = ""
            inputProductForm.description = ""
            inputProductForm.price = 0
        }
    }
    function DeleteActionMode(id) {
        if (actionMode === "") {
            setActionMode("DELETE")
            var product
            if (item !== undefined) {
                product = item.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
        }
    }

    function DeleteComboActionMode(id) {
        if (actionMode === "") {
            setActionMode("DELETE")
            var product
            if (itemCombo !== undefined) {
                product = itemCombo.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
        }
    }
    function EditComboActionMode(id) {
        if (actionMode === "") {
            setActionMode("EDIT")
            setHandleModal(true)
            var product
            if (itemCombo !== undefined) {
                product = itemCombo.find(x => x.id === id);
            }
            setProduct(product)
            inputCombo.categoryId = product.categoryId
            inputCombo.name = product.name
            inputCombo.description = product.description
            inputCombo.estimatedPrice = product.estimatedPrice
            inputCombo.constructImagesViews = product.constructImagesViews
        } else {
            setHandleModal(false)
            setActionMode("")
        }
    }

    function DetailActionMode(id) {
        if (actionMode === "") {
            setActionMode("DETAIL")
            setHandleModal(true)
            var product
            if (item !== undefined) {
                product = item.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
            setHandleModal(false)
        }
    }
    function DeleteOffAction() {
        setActionMode("")
    }

    const ChangeProcessStatus = (value) => {
        setConstructionProcessStatus(value)
    }

    const AcceptActionMode = (id) => {
        if (actionMode === "") {
            setActionMode("ACCEPT")
            var product
            if (requestItem !== undefined) {
                product = requestItem.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
        }
    }
    const DenyActionMode = (id) => {
        if (actionMode === "") {
            setActionMode("REJECT")
            var product
            if (requestItem !== undefined) {
                product = requestItem.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
        }
    }
    const DetailRequestActionMode = (id) => {
        if (actionMode === "") {
            setActionMode("DETAIL")
            setHandleModal(true)
            var product
            if (requestItem !== undefined) {
                product = requestItem.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
            setHandleModal(false)
        }
    }
    const EditContractActionMode = (event, id) => {
        if (actionMode === "") {
            setActionMode("EDIT")
            setHandleModal(true)
            var product
            if (itemContract !== undefined) {
                product = itemContract.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
            setHandleModal(false)
        }
    }
    const ChangePage = (event, value) => {
        setPage(value)
        setActionMode("")
    }
    function EditCategoryActionMode(id) {
        if (actionMode === "") {
            setActionMode("EDIT")
            var product
            if (category !== undefined) {
                product = category.find(x => x.id === id);
            }
            setProduct(product)
            inputProductForm.name = product.name
        }
        else {
            setActionMode("")
            setProduct(-1)
            inputProductForm.name = ""
        }
    }
    function DeleteCategoryActionMode(id) {
        if (actionMode === "") {
            setActionMode("DELETE")
            var product
            if (category !== undefined) {
                product = category.find(x => x.id === id);
            }
            setProduct(product)
        } else {
            setActionMode("")
        }
    }
    function EditBlogActionMode(code) {
        if (actionMode === "") {
            setActionMode("EDIT")
            setHandleModal(true)
            var product
            if (itemBlogCombo !== undefined) {
                product = itemBlogCombo.find(x => x.code === code);
            }
            setProduct(product)
            inputBlog.blogImagesViews = product.blogImagesViews
            inputBlog.title = product.title
            inputBlog.content = product.content
        } else {
            setActionMode("")
            setHandleModal(false)
        }
    }
    function DeleteBlogActionMode(code) {
        if (actionMode === "") {
            setActionMode("DELETE")
            var product
            if (itemBlogCombo !== undefined) {
                product = itemBlogCombo.find(x => x.code === code);
            }
            setProduct(product)
        } else {
            setActionMode("")
        }
    }

    //------------------Submit form ---------------------------------------------------------------------
    const AddNewProductSubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(productPostAPI, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "contractorId": inputProductForm.contractorId,
                "name": inputProductForm.name,
                "description": inputProductForm.description,
                "price": inputProductForm.price,
                "productImagesViews": inputProductForm.productImagesViews
            })
        }).then((res) => {
            return res.json();

        }).then((data) => console.log(data))
            .catch(err => console.log(err))
        setOnReload(true)
        loadItem()
    }
    const EditProductSubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(productPutAPI, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": Product.id,
                "contractorId": inputProductForm.contractorId,
                "name": inputProductForm.name,
                "description": inputProductForm.description,
                "price": inputProductForm.price,
                "productImagesViews": inputProductForm.productImagesViews
            })
        }).then((res) => {
            return res.json();

        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const DeleteProductSubmit = () => {

        setActionMode("");
        fetch(productDeletaAPI + `/id=${Product.id}`, {
            method: "PUT",
        }).then((res) => {
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }

    const AddNewComboSubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(comboPostAPI, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "contractorId": inputCombo.contractorId,
                "categoryId": parseInt(inputCombo.categoryId),
                "estimatedPrice": parseInt(inputCombo.estimatedPrice),
                "name": inputCombo.name,
                "description": inputCombo.description,
                "constructImagesViews": inputCombo.constructImagesViews
            })
        }).then((res) => {
            console.log(res)
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const EditConstructSubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(comboPutAPI, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": Product.id,
                "contractorId": inputCombo.contractorId,
                "categoryId": parseInt(inputCombo.categoryId),
                "estimatedPrice": parseInt(inputCombo.estimatedPrice),
                "name": inputCombo.name,
                "description": inputCombo.description,
                "constructImagesViews": inputCombo.constructImagesViews
            })
        }).then((res) => {
            console.log(res)
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    console.log(inputCombo)
    const DeleteComboSubmit = () => {
        setActionMode("");
        fetch(comboDeleteAPI + `/id=${Product.id}`, {
            method: "DELETE",
        }).then((res) => {
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }

    const AcceptProcessSubmit = () => {
        setActionMode("");
        if (Product.status === 0) {
            fetch(requestPendingToAcceptAPI + `/${Product.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                })
            }).then((res) => {
                console.log(res)
                setOnReload(true)
                loadItem()
            }).then((data) => console.log(data))
                .catch(err => console.log(err))
        }
        if (Product.status === 1) {
            fetch(requestAcceptToCompleteAPI + `/${Product.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                })
            }).then((res) => {
                setOnReload(true)
                loadItem()
                console.log(res)
            }).then((data) => console.log(data))
                .catch(err => console.log(err))
        }
        setOnReload(true)
        loadItem()
    }

    const RejectProcessSubmit = () => {
        setActionMode("");
        fetch(requestPostAPI + `${Product.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "customerId": Product.customerId,
                "contractorId": Product.contractorId,
                "note": Product.note,
                "totalPrice": Product.totalPrice,
                "status": 4
            })
        }).then((res) => {
            console.log(res)
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }

    const AddNewCategorySubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(categoryPostAPI, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": inputProductForm.name
            })
        }).then((res) => {
            console.log(res)
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }

    const EditCategorySubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(categoryPutAPI + `/id=${Product.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": Product.id,
                "name": inputProductForm.name,
                "constructsViewList": []
            })
        }).then((res) => {
            console.log(res)

        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const DeleteCategorySubmit = (event) => {
        event.preventDefault()
        setActionMode("");
        fetch(categoryDeleteAPI + `/id=${Product.id}`, {
            method: "DELETE",
        }).then((res) => {
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const AddNewBLogSubmit = (event) => {
        event.preventDefault(event)
        setActionMode("");
        fetch(blogPostAPI, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contractorId": inputBlog.contractorId,
                "title": inputBlog.title,
                "content": inputBlog.content,
                "status": true,
                "blogImagesViews": inputBlog.blogImagesViews
            })
        }).then((res) => {
            console.log(res)

        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const EditBlogSubmit = (event) => {
        event.preventDefault(event)
        setActionMode("");
        fetch(blogPutAPI, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "code": Product.code,
                "contractorId": inputBlog.contractorId,
                "title": inputBlog.title,
                "postTime": Product.postTime,
                "content": inputBlog.content,
                "status": true,
                "blogImagesViews": inputBlog.blogImagesViews
            })
        }).then((res) => {
            console.log(res)
            loadItem()
        }).then((data) => {
            setOnReload(true)
            loadItem()
        }
        )
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const DeleteBlogSubmit = (event) => {
        event.preventDefault(event)
        setActionMode("");
        fetch(blogDeleteAPI + `/code=${Product.code}`, {
            method: "DELETE",
        }).then((res) => {
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    const DepositSubmit = (event, id) => {
        fetch(depositAcceptStatusAPI + `/${id}`+`?transactionCode=${Math.random()+"adsavadfs"}`, {
            method: "PUT",
        }).then((res) => {
            return res.json()
        }).then((data) => console.log(data))
            .catch(err => console.log(err))
            setOnReload(true)
            loadItem()
    }
    //Fetch Data ------------------------------------------------------------------
    // useEffect(() => {
    //     fetch(categoryGetALLAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setCategory(data))
    //         .catch(err => console.log(err))

    //     fetch(requestGetAllAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setRequestItem(data))
    //         .catch(err => console.log(err))

    //     fetch(customerGetAllAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setCustomerItem(data))
    //         .catch(err => console.log(err))
    //     fetch(depositGetAllAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setItemDeposit(data))
    //         .catch(err => console.log(err))

    //     fetch(blogGetAllAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setItemBlogCombo(data.filter(x => x.contractorId == 1)))
    //         .catch(err => console.log(err))
    //     fetch(contractGetByContractorAPI + `/${contractorId}`, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setItemContract(data))
    //         .catch(err => console.log(err))
    //     fetch(appoinmentGetByContractorAllAPI + `/${contractorId}`, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setItemAppointment(data))
    //         .catch(err => console.log(err))
    // }, [])
    console.log(itemDeposit)


    if (onreload) {
        loadItem()
        setOnReload(false)
    }
    // useEffect(() => {
    //     fetch(productGetAllAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setItem(data))
    //         .catch(err => console.log(err))

    //     fetch(comboGetAllAPI, {
    //         method: "GET"
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => setItemCombo(data))
    //         .catch(err => console.log(err))
    // }, [])

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0" >
            <div className="sidebar" style={{ backgroundColor: "white", alignItems: "center" }}>
                <nav className="navbar bg-black navbar-light" style={{ color: "white", marginTop: "9%" }}>
                    <a href="#" className="navbar-brand mx-1 mb-4" style={{ paddingLeft: "10%" }}>
                        <h3 style={{ color: "#db7b04" }}>
                            <i className="fa me-2" ></i>Contractor
                        </h3>
                    </a>
                    <div className="navbar-nav w-100" style={{ margin: "0 2%", padding: "0 3%" }}>
                        <a href="#" className={sideBar === "PRODUCT" ? "sidebarActive" : "nav-link"} style={{ margin: "0" }} onClick={ProductSideBar}>
                            <i className="fa fa-tachometer-alt me-2" style={{ margin: "0 5%" }}></i>    Product
                        </a>
                        <div className="nav-item dropdown">
                            <a
                                href="#"
                                className={sideBar === "CONSTRUCTIONPROCESS" ? "sidebarActive" : "nav-link"}
                                data-bs-toggle="dropdown"
                                style={{ margin: "1% 0" }}
                                onClick={ConstructionProcessSibar}
                            >
                                <i className="fa fa-laptop me-2" style={{ margin: "0 5%" }}></i>    Construction process
                            </a>
                        </div>
                        <a href="#" className={sideBar === "CATEGORY" ? "sidebarActive" : "nav-link"} style={{ margin: "1% 0" }}
                            onClick={CategorySideBar}>
                            <i className="fa fa-keyboard me-2" style={{ margin: "0 5%" }}></i>    Category
                        </a>
                        <a href="#" className={sideBar === "COMBO" ? "sidebarActive" : "nav-link"} style={{ margin: "1% 0" }}
                            onClick={ComboSideBar}>
                            <i className="fa fa-th me-2" style={{ margin: "0 5%" }}></i>    Combos
                        </a>
                        <a href="#" className={sideBar === "BLOG" ? "sidebarActive" : "nav-link"} style={{ margin: "1% 0" }}
                            onClick={BlogSideBar}>
                            <i className="fa fa-keyboard me-2" style={{ margin: "0 5%" }}></i>    Blog
                        </a>
                        <a href="#" className={sideBar === "CONTRACT" ? "sidebarActive" : "nav-link"} style={{ margin: "1% 0" }}
                            onClick={ContractSideBar}>
                            <i className="fa fa-table me-2" style={{ margin: "0 5%" }}></i>    Contract
                        </a>
                        <a href="#" className={sideBar === "DASHBOARD" ? "sidebarActive" : "nav-link"} style={{ margin: "1% 0" }}
                            onClick={DashboardSideBar}>
                            <i className="fa fa-table me-2" style={{ margin: "0 5%" }}></i>    Dashboard
                        </a>
                        <a href="#" className="nav-item nav-link" style={{ margin: "1% 0" }}
                            onClick={DashboardSideBar}>
                            <i className="fa fa-table me-2" style={{ margin: "0 5%" }}></i>    Logout
                        </a>
                    </div>
                </nav>
            </div>
            <div className="content" style={{ width: "120%", margin: "0", paddingBottom: "20%", backgroundColor: "#dfe8e0" }}>
                <div style={{ margin: "2% 2%", borderRadius: "10px", padding: "0.25% 0", display: "flex", alignItems: "center" }}>
                    <Button style={{ color: "#db7b04", backgroundColor: "white" }}><MenuIcon style={{ margin: "0 1%" }}></MenuIcon></Button>
                    <div style={{ display: "flex", width: "25%", marginLeft: "1%" }}>
                        <input class="form-control border-1" type="search" style={{ borderRadius: "10px", marginRight: "2%", backgroundColor: "white" }} placeholder="Search" />
                        <Avatar sx={{ backgroundColor: "white" }}><Button style={{ color: "#db7b04" }} sx={{ backgroundColor: "white" }}><SearchIcon></SearchIcon></Button></Avatar>
                    </div>
                    <Avatar style={{ marginLeft: "60%" }} sx={{ bgcolor: "white", color: "gray" }}>Hi</Avatar>
                </div>

                <div style={{ margin: "2% 2%", backgroundColor: "white", padding: "1%", borderRadius: "10px" }}>

                    {/* -----------------------------------product side bar----------------------------------------------------------------------- */}
                    {
                        sideBar === "PRODUCT" ?
                            <>
                                <div className="tableDisplayContractor">
                                    <div style={{ display: "flex" }}>
                                        {/* <div style={{height:"700px"}}>
                                        <PDFViewer style={{    width: "1000px", height:"800px"}}><ExportPDF/></PDFViewer>
                                        </div> */}

                                        <div>
                                            <h2 style={{ color: "#db7b04" }}>Product</h2>

                                        </div>
                                        <div style={{ marginLeft: "80%" }}>
                                            <Button style={{ backgroundColor: "#db7b04", color: "white" }} onClick={AddActionMode}>Add new</Button>
                                        </div>
                                    </div>

                                    {/* -------------Add form---------------- */}
                                    {
                                        actionMode === "ADD" ?
                                            <Modal
                                                open={handleModal}
                                                onClose={AddActionMode}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div class="">
                                                        <div class="bg-light rounded h-100 p-4">
                                                            <h2 class="mb-4">Add Product</h2>
                                                            <form onSubmit={AddNewProductSubmit}>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                                                                    <input type="text" class="form-control" id="exampleInputEmail1"
                                                                        aria-describedby="emailHelp" required name="name" onChange={OnFormChange} />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputPassword1" class="form-label">Description</label>
                                                                    <input type="text" class="form-control" id="exampleInputPassword1" name="description" required onChange={OnFormChange} />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputPassword1" class="form-label">Price</label>
                                                                    <input type="number" step={0.01} class="form-control" id="exampleInputPassword1" name="price" required onChange={OnFormChange} />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputPassword1" class="form-label">ProductImages</label>
                                                                    <input type="file" class="form-control" multiple id="exampleInputPassword1" required accept="image/*" name="imageFile" onChange={OnFormChange} />
                                                                </div>
                                                                <Button type="submit" class="btn btn-primary">Add new product</Button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Modal>
                                            : <></>
                                    }

                                    <table style={{ marginTop: "1%" }}>
                                        <thead>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {item ? item.slice((page - 1) * 5, ((page - 1) * 5 + 5)).map((product, index) => (
                                                <>
                                                    <tr key={index}>
                                                        <td>{(page - 1) * 5 + index + 1}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.description}</td>
                                                        <td>{product.price}</td>
                                                        <td>
                                                            {/* {product.productImagesViews? product.productImagesViews[0].imageUrl : ""} */}
                                                            <img src={product.productImagesViews ? product.productImagesViews[0].imageUrl : ""} alt="ProductImage" width={100} />
                                                        </td>
                                                        <td>{product.status?<>Active</>:<>Unactive</>}</td>
                                                        <td><div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => EditActionMode(product.id)}>Edit</a> |</div>

                                                            <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DeleteActionMode(product.id)}>Delete</a> |</div>
                                                        </td>
                                                    </tr>
                                                    {
                                                        actionMode === "EDIT" && Product.id === product.id ?
                                                            <>
                                                                <Modal
                                                                    open={handleModal}
                                                                    onClose={AddActionMode}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <div class="">
                                                                            <div class="bg-light rounded h-100 p-4">
                                                                                <h2 class="mb-4">Edit Product</h2>
                                                                                <form onSubmit={EditProductSubmit}>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                                            aria-describedby="emailHelp" name="name" placeholder={product.name} onChange={OnFormChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Description</label>
                                                                                        <input type="text" class="form-control" id="exampleInputPassword1" name="description" placeholder={product.description} onChange={OnFormChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Price</label>
                                                                                        <input type="number" step={0.01} class="form-control" id="exampleInputPassword1" name="price" placeholder={product.price} onChange={OnFormChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Product Images</label>
                                                                                        {Product.productImagesViews ? Product.productImagesViews.map((value, index) => (
                                                                                            <div style={{ margin: "1% 0" }}>
                                                                                                <img src={value.imageUrl} alt="ProductImage" width={200} />
                                                                                                {inputProductForm.productImagesViews.find(x => x.imageUrl == value.imageUrl) ?
                                                                                                    <><a style={{ margin: "0 2%", color: "red" }} onClick={() => RemoveImage(value.imageUrl)} href="#!">Remove Image</a></>
                                                                                                    :
                                                                                                    <><a style={{ margin: "0 2%", color: "gray" }} >Removed Image</a></>}
                                                                                                {/* <a style={{margin: "0 2%", color:"red"}} onClick={()=>RemoveImage(value.imageUrl)} href="#!">Remove Image</a> */}
                                                                                            </div>
                                                                                        )) : <></>}
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Add Images</label>
                                                                                        <input type="file" multiple class="form-control" id="exampleInputPassword1" accept="image/*" name="imageFile" onChange={OnFormChange} />
                                                                                    </div>
                                                                                    <Button type="submit" class="btn btn-primary">Save</Button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </Box>
                                                                </Modal>
                                                            </>
                                                            : <></>
                                                    }
                                                    {
                                                        actionMode === "DELETE" && Product.id === product.id ?
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td colSpan={5} style={{ color: "red" }}>You want to delete this product ?</td>
                                                                <td colSpan={1}>
                                                                    <Button onClick={DeleteProductSubmit} style={{ color: "red" }} >Yes</Button>
                                                                </td>
                                                                <td colSpan={1}>
                                                                    <Button onClick={() => DeleteOffAction()}>No</Button>
                                                                </td>
                                                            </tr>
                                                            : <></>
                                                    }
                                                </>
                                            )) : <></>
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        item ? <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
                                            <Pagination count={Math.ceil(item.length / 5)} page={page} onChange={ChangePage} color="primary" />
                                        </div> : <></>
                                    }
                                </div>
                            </> : <></>
                    }
                    {/* --------------------------------------------Combo side bar----------------------------------------------------------------------- */}
                    {
                        sideBar === "COMBO" ?
                            <>
                                <div className="tableDisplayContractor">
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <h2 style={{ color: "#db7b04" }}>Combo</h2>
                                        </div>
                                        <div style={{ marginLeft: "80%" }}>
                                            <Button style={{ backgroundColor: "#db7b04", color: "white" }} onClick={AddActionMode}>Add new</Button>
                                        </div>
                                    </div>
                                    {/* -------------Add form---------------- */}
                                    {
                                        actionMode === "ADD" ?
                                            <>
                                                <Modal
                                                    open={handleModal}
                                                    onClose={AddActionMode}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <div class="">
                                                            <div class="bg-light rounded h-100 p-4">
                                                                <h2 class="mb-4">Add Construct</h2>
                                                                <form onSubmit={AddNewComboSubmit}>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Category:  |</label>
                                                                        <select name="categoryId" onChange={OnFormComboChange}>
                                                                            {
                                                                                category.map((i, index) => (
                                                                                    <>
                                                                                        <option key={index} value={i.id}>{i.name}</option>
                                                                                    </>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Name</label>
                                                                        <input type="text" step={0.01} class="form-control" id="exampleInputPassword1" name="name" required onChange={OnFormComboChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Description</label>
                                                                        <input type="text" step={0.01} class="form-control" id="exampleInputPassword1" name="description" required onChange={OnFormComboChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Price</label>
                                                                        <input type="number" step={0.01} class="form-control" min={0} id="exampleInputPassword1" name="estimatedPrice" required onChange={OnFormComboChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputPassword1" class="form-label">ProductImages</label>
                                                                        <input type="file" class="form-control" multiple id="exampleInputPassword1" required accept="image/*" name="imageFile" onChange={OnFormComboChange} />
                                                                    </div>
                                                                    <Button type="submit" class="btn btn-primary">Add new Construct</Button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </Modal>

                                            </>
                                            : <></>
                                    }
                                    <table style={{ marginTop: "1%" }}>
                                        <thead>
                                            <th>#</th>
                                            <th>Constractor</th>
                                            <th>Construct Name</th>
                                            <th>Description</th>
                                            <th>Category Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {itemCombo ? itemCombo.slice((page - 1) * 5, ((page - 1) * 5 + 5)).map((product, index) => (
                                                <>
                                                    <tr key={index}>
                                                        <td>{(page - 1) * 5 + index + 1}</td>
                                                        <td>{product.contractorId}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.description}</td>
                                                        <td>{category.find(x => x.id === product.categoryId).name}</td>
                                                        <td>{product.constructImagesViews ?
                                                            <img src={product.constructImagesViews[0].imageUrl} alt="Construct Image" width={150} />
                                                            : <></>}</td>
                                                        <td>{product.estimatedPrice}</td>
                                                        <td>{product.status}</td>
                                                        <td><div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => EditComboActionMode(product.id)}>Edit</a> |</div>
                                                            <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DeleteComboActionMode(product.id)}>Delete</a> |</div>
                                                            <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DetailActionMode(product.id)}>Detail</a> |</div>
                                                        </td>
                                                    </tr>
                                                    {
                                                        actionMode === "DELETE" && Product.id === product.id ?
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td colSpan={4} style={{ color: "red" }}>You want to delete this Combo ?</td>
                                                                <td colSpan={1}>
                                                                    <Button onClick={DeleteComboSubmit} style={{ color: "red" }} >Yes</Button>
                                                                </td>
                                                                <td colSpan={1}>
                                                                    <Button onClick={() => DeleteOffAction()}>No</Button>
                                                                </td>
                                                            </tr>
                                                            : <></>
                                                    }
                                                    {
                                                        actionMode === "EDIT" && Product.id === product.id ?
                                                            <>
                                                                <Modal
                                                                    open={handleModal}
                                                                    onClose={AddActionMode}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <div class="">
                                                                            <div class="bg-light rounded h-100 p-4">
                                                                                <h2 class="mb-4">Edit Construct</h2>
                                                                                <form onSubmit={EditConstructSubmit}>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Construct Name</label>
                                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                                            aria-describedby="emailHelp" name="name" placeholder={product.name} onChange={OnFormComboChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Description</label>
                                                                                        <input type="text" class="form-control" id="exampleInputPassword1" name="description" placeholder={product.description} onChange={OnFormChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Category:  |</label>
                                                                                        <select name="categoryId" defaultValue={product.categoryId} onChange={OnFormComboChange}>
                                                                                            {
                                                                                                category.map((i, index) => (
                                                                                                    <>
                                                                                                        <option key={index} value={i.id}>{i.name}</option>
                                                                                                    </>
                                                                                                ))
                                                                                            }
                                                                                        </select>
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Construct Images:</label>
                                                                                        {Product.constructImagesViews ? Product.constructImagesViews.map((value, index) => (
                                                                                            <div style={{ margin: "1% 0" }}>
                                                                                                <img src={value.imageUrl} alt="ProductImage" width={200} />
                                                                                                {inputCombo.constructImagesViews.find(x => x.imageUrl == value.imageUrl) ?
                                                                                                    <><a style={{ margin: "0 2%", color: "red" }} onClick={() => RemoveImageConstruct(value.imageUrl)} href="#!">Remove Image</a></>
                                                                                                    :
                                                                                                    <><a style={{ margin: "0 2%", color: "gray" }} >Removed Image</a></>}
                                                                                                {/* <a style={{margin: "0 2%", color:"red"}} onClick={()=>RemoveImage(value.imageUrl)} href="#!">Remove Image</a> */}
                                                                                            </div>
                                                                                        )) : <></>}
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Price</label>
                                                                                        <input type="number" step={0.01} class="form-control" id="exampleInputPassword1" name="estimatedPrice" min={0} placeholder={product.estimatedPrice} onChange={OnFormComboChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputPassword1" class="form-label">Add Images</label>
                                                                                        <input type="file" multiple class="form-control" id="exampleInputPassword1" accept="image/*" name="imageFile" onChange={OnFormComboChange} />
                                                                                    </div>
                                                                                    <Button type="submit" class="btn btn-primary">Save</Button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </Box>
                                                                </Modal>
                                                            </>
                                                            : <></>
                                                    }
                                                    {
                                                        actionMode === "DETAIL" && Product.id === product.id ?
                                                            <>

                                                                <ComboDetail id={product.id} />
                                                                <Modal
                                                                    open={handleModal}
                                                                    onClose={AddActionMode}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={styleCombo}>
                                                                        <h2>Construct Detail</h2>
                                                                        <ComboDetail id={product.id} />
                                                                    </Box>
                                                                </Modal>
                                                            </>
                                                            : <></>
                                                    }
                                                </>
                                            )) : <></>
                                            }
                                        </tbody>
                                    </table>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
                                        <Pagination count={Math.ceil(itemCombo ? itemCombo.length / 5 : 1)} page={page} onChange={ChangePage} color="primary" />
                                    </div>
                                </div>
                            </> : <></>
                    }
                    {/*---------------------------------------------------ConstructionProcess Side Bar-------------------------------------------------  */}
                    {
                        sideBar === "CONSTRUCTIONPROCESS" ?
                            <>
                                <div className="tableDisplayContractor">
                                    <h2 style={{ color: "#db7b04" }}>Construction Process</h2>

                                    <div style={{ borderBottom: "1px solid #ddd" }}>
                                        <Tabs value={constructionProcessStatus}>
                                            <Tab value={0} label="Pending" onClick={() => ChangeProcessStatus(0)}>

                                            </Tab>
                                            <Tab value={1} label="Accepted" onClick={() => ChangeProcessStatus(1)}>

                                            </Tab>
                                            <Tab value={2} label="Complete" onClick={() => ChangeProcessStatus(2)}>

                                            </Tab>
                                            <Tab value={3} label="Signed" onClick={() => ChangeProcessStatus(3)}>

                                            </Tab>
                                            <Tab value={4} label="Rejected" onClick={() => ChangeProcessStatus(4)}>

                                            </Tab>
                                        </Tabs>
                                    </div>
                                    <table style={{ marginTop: "1%" }}>
                                        <thead>
                                            <th>#</th>
                                            <th>Customer Name</th>
                                            <th>Note</th>
                                            <th>Total Price</th>
                                            <th>Time in</th>
                                            <th>Time out</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {requestItem ? requestItem.map((product, index) => (
                                                <>
                                                    {
                                                        product.status === constructionProcessStatus ? <>
                                                            <tr key={index}>
                                                                <td>{ }</td>
                                                                <td>{customerItem.find(x => x.id === product.customerId).name}</td>
                                                                <td>{product.note}</td>
                                                                <td>{product.totalPrice}</td>
                                                                <td><input type="datetime-local" value={product.timeIn.substring(0, 16)} disabled /></td>
                                                                <td><input type="datetime-local" value={product.timeOut.substring(0, 16)} disabled /></td>
                                                                <td>{product.status}</td>
                                                                <td><div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => AcceptActionMode(product.id, product.status)}>Accept</a> |</div>
                                                                    <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DenyActionMode(product.id)}>Reject</a> |</div>
                                                                    <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DetailRequestActionMode(product.id)}>Detail</a> |</div>
                                                                </td>
                                                            </tr>
                                                            {itemAppointment.find(x => x.requestId == product.id) ? <>
                                                                <tr>
                                                                    <td colSpan={4}></td>
                                                                    <td style={{ color: "green" }}>Appointment at:</td>
                                                                    <td><input type="datetime-local" readOnly value={itemAppointment.find(x => x.requestId == product.id) ?
                                                                        itemAppointment.find(x => x.requestId == product.id).meetingDate.substring(0, 16) : null} /></td>
                                                                    <td>{itemAppointment.find(x => x.requestId == product.id).status === 1 ? <>Complete</> : <>Pending</>
                                                                    }</td>
                                                                </tr>
                                                            </> :
                                                                <></>
                                                            }
                                                            {product.status === 2 ? <>
                                                                <tr>
                                                                    <td colSpan={4}></td>
                                                                    <td style={{ color: "green" }}>Deposit:</td>
                                                                    <td><input type="text" name="transactionCode" placeholder="Transaction Code"/></td>
                                                                    <td>{itemDeposit.find(x => x.requestId == product.id).status === 1 ? <>Processing</> : itemDeposit.find(x => x.requestId == product.id).status === 2 ? <>Complete</> : <p style={{color: "red"}}>Pending</p>
                                                                    }</td>
                                                                    <td><a style={{ color: "red" }} href="#!" value="Mark as deposit" onClick={(event) => DepositSubmit(event, itemDeposit.find(x => x.requestId == product.id).id)}>Deposited</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={4}></td>
                                                                    <td style={{ color: "green" }}>Contract:</td>
                                                                    {/* <td><input type="datetime-local" readOnly value={itemAppointment.find(x=>x.requestId == product.id).meetingDate?
                                                                itemAppointment.find(x=>x.requestId == product.id).meetingDate.substring(0, 16):null}/></td> */}
                                                                    <td><Button style={{ color: "green" }}>ContractDetail</Button></td>
                                                                    <td>{itemAppointment.find(x => x.requestId == product.id).status === 1 ? <>Complete</> : <>Pending</>
                                                                    }</td>
                                                                    <td><a style={{ color: "red" }} href="#!" onClick={MarkContract}>Mark Contract</a></td>
                                                                </tr>
                                                            </> :
                                                                <></>
                                                            }
                                                        </> : <></>
                                                    }

                                                    {
                                                        actionMode === "ACCEPT" && Product.id === product.id ?
                                                            <>
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={4} style={{ color: "blue" }}>You want to ACCEPT this Process ?</td>
                                                                    <td colSpan={2}>
                                                                        <Button onClick={AcceptProcessSubmit}>Yes</Button>
                                                                    </td>
                                                                    <td colSpan={2}>
                                                                        <Button style={{ color: "red" }} onClick={() => DeleteOffAction()}>No</Button>
                                                                    </td>
                                                                </tr>
                                                            </> : <></>
                                                    }
                                                    {
                                                        actionMode === "DETAIL" && Product.id === product.id ?
                                                            <>
                                                                <RequestDetail id={product.id} />
                                                                <Modal
                                                                    open={handleModal}
                                                                    onClose={AddActionMode}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={styleCombo}>
                                                                        <RequestDetail id={product.id} />
                                                                    </Box>
                                                                </Modal>
                                                            </> : <></>
                                                    }
                                                    {
                                                        actionMode === "REJECT" && Product.id === product.id ?
                                                            <>
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={4} style={{ color: "red" }}>You want to REJECT this Process ?</td>
                                                                    <td colSpan={2}>
                                                                        <Button onClick={RejectProcessSubmit}>Yes</Button>
                                                                    </td>
                                                                    <td colSpan={2}>
                                                                        <Button style={{ color: "red" }} onClick={() => DeleteOffAction()}>No</Button>
                                                                    </td>
                                                                </tr>
                                                            </> : <></>
                                                    }
                                                </>
                                            )) : <></>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </> : <></>
                    }
                    {/* ---------------------------------------------------Category Side Bar--------------------------------- */}
                    {
                        sideBar === "CATEGORY" ?
                            <>
                                <div className="tableDisplayContractor">
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <h2 style={{ color: "#db7b04" }}>Category</h2>
                                        </div>
                                        <div style={{ marginLeft: "78.5%" }}>
                                            <Button style={{ backgroundColor: "#db7b04", color: "white" }} onClick={AddActionMode}>Add new</Button>
                                        </div>
                                    </div>
                                    {/* -------------Add form---------------- */}
                                    {
                                        actionMode === "ADD" ?
                                            <>
                                                <Modal
                                                    open={handleModal}
                                                    onClose={AddActionMode}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <div class="">
                                                            <div class="bg-light rounded h-100 p-4">
                                                                <h6 class="mb-4">Add Category</h6>
                                                                <form onSubmit={AddNewCategorySubmit}>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="name" onChange={OnFormChange} />
                                                                    </div>
                                                                    <Button type="submit" class="btn btn-primary">Add new product</Button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </Modal>
                                            </>
                                            : <></>
                                    }

                                    <table style={{ marginTop: "1%" }}>
                                        <thead>
                                            <th>#</th>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {category ? category.slice((page - 1) * 5, ((page - 1) * 5 + 5)).map((product, index) => (
                                                <>
                                                    <tr key={index}>
                                                        <td>{(page - 1) * 5 + index + 1}</td>
                                                        <td></td>
                                                        <td>{product.name}</td>
                                                        <td><div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => EditCategoryActionMode(product.id)}>Edit</a> |</div>

                                                            <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DeleteCategoryActionMode(product.id)}>Delete</a> |</div>
                                                        </td>
                                                    </tr>
                                                    {
                                                        actionMode === "EDIT" && Product.id === product.id ?
                                                            <tr>
                                                                <td colSpan={7}>
                                                                    <div class="col-sm-12 col-xl-6">
                                                                        <div class="bg-light rounded h-100 p-4">
                                                                            <h6 class="mb-4">Edit Category</h6>
                                                                            <form onSubmit={EditCategorySubmit}>
                                                                                <div class="mb-3">
                                                                                    <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                                                                                    <input type="text" class="form-control" id="exampleInputEmail1"
                                                                                        aria-describedby="emailHelp" name="name" placeholder={product.name} onChange={OnFormChange} />
                                                                                </div>
                                                                                <Button type="submit" class="btn btn-primary">Save</Button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            : <></>
                                                    }
                                                    {
                                                        actionMode === "DELETE" && Product.id === product.id ?
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td style={{ color: "red" }} colSpan={2}>You want to delete this Category ?</td>
                                                                <td>
                                                                    <Button onClick={DeleteCategorySubmit} style={{ color: "red" }} >Yes</Button>
                                                                </td>
                                                                <td>
                                                                    <Button onClick={() => DeleteOffAction()}>No</Button>
                                                                </td>
                                                            </tr>
                                                            : <></>
                                                    }
                                                </>
                                            )) : <></>
                                            }
                                        </tbody>
                                    </table>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
                                        <Pagination count={Math.ceil(category ? category.length / 5 : 1)} page={page} onChange={ChangePage} color="primary" />
                                    </div>
                                </div>
                            </> : <></>
                    }
                    {/* ---------------------------------------------------Blog Side Bar--------------------------------- */}
                    {
                        sideBar === "BLOG" ?
                            <>
                                <div className="tableDisplayContractor">
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <h2 style={{ color: "#db7b04" }}>Blog</h2>
                                        </div>
                                        <div style={{ marginLeft: "85%" }}>
                                            <Button style={{ backgroundColor: "#db7b04", color: "white" }} onClick={AddActionMode}>Add new</Button>
                                        </div>
                                    </div>
                                    {/* -------------Add form---------------- */}
                                    {
                                        actionMode === "ADD" ?
                                            <Modal
                                                open={handleModal}
                                                onClose={AddActionMode}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div class="">
                                                        <div class="bg-light rounded h-100 p-4">
                                                            <h6 class="mb-4">Add Blog</h6>
                                                            <form onSubmit={AddNewBLogSubmit}>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputEmail1" class="form-label">Title</label>
                                                                    <input type="text" class="form-control" id="exampleInputEmail1"
                                                                        aria-describedby="emailHelp" name="title" onChange={OnFormBlogChange} />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputEmail1" class="form-label">Content</label>
                                                                    <textarea type="text" class="form-control" id="exampleInputEmail1" cols={10} rows={5}
                                                                        aria-describedby="emailHelp" name="content" onChange={OnFormBlogChange} />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label htmlFor="exampleInputEmail1" class="form-label">Add Images</label>
                                                                    <input type="file" class="form-control" id="exampleInputEmail1"
                                                                        aria-describedby="emailHelp" accept="image/*" name="imageFile" multiple onChange={OnFormBlogChange} />
                                                                </div>
                                                                <Button type="submit" class="btn btn-primary">Add new Blog</Button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Modal>
                                            : <></>
                                    }

                                    <table style={{ marginTop: "1%" }}>
                                        <thead>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Post Time</th>
                                            <th>EditTime</th>
                                            <th>Image Title</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {itemBlogCombo ? itemBlogCombo.slice((page - 1) * 5, ((page - 1) * 5 + 5)).map((product, index) => (
                                                <>
                                                    <tr key={index}>
                                                        <td>{(page - 1) * 5 + index + 1}</td>
                                                        <td>{product.title}</td>
                                                        <td><input type="datetime-local" value={product.postTime ? product.postTime.substring(0, 16) : product.editTime.substring(0, 16)} disabled /></td>
                                                        <td><input type="datetime-local" value={product.editTime ? product.editTime.substring(0, 16) : product.postTime.substring(0, 16)} disabled /></td>
                                                        <td>
                                                            {product.blogImagesViews ?
                                                                <img src={product.blogImagesViews[0].imageUrl} alt="Blog Image" width={100} />
                                                                : <></>}
                                                        </td>
                                                        <td>{product.status === true ? <>Active</> : <>Unactive</>}</td>
                                                        <td><div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => EditBlogActionMode(product.code)}>Detail</a> |</div>
                                                            <div><a href="#!" style={{ color: "#04AA6D" }} >Change Status</a> |</div>
                                                            <div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => DeleteBlogActionMode(product.code)}>Delete</a> |</div>
                                                        </td>
                                                    </tr>
                                                    {
                                                        actionMode === "EDIT" && Product.code === product.code ?
                                                            <>
                                                                <Modal
                                                                    open={handleModal}
                                                                    onClose={AddActionMode}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <div class="">
                                                                            <div class="bg-light rounded h-100 p-4">
                                                                                <h2 class="mb-4">Edit Blog</h2>
                                                                                <form onSubmit={EditBlogSubmit}>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Title</label>
                                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                                            aria-describedby="emailHelp" name="title" placeholder={product.title} onChange={OnFormBlogChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Content</label>
                                                                                        <textarea type="text" class="form-control" id="exampleInputEmail1" cols={10} rows={5}
                                                                                            aria-describedby="emailHelp" name="content" placeholder={product.content} onChange={OnFormBlogChange} />
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Blog Image</label>
                                                                                        {Product.blogImagesViews ? Product.blogImagesViews.map((value, index) => (
                                                                                            <div style={{ margin: "1% 0" }}>
                                                                                                <img src={value.imageUrl} alt="ProductImage" width={200} />
                                                                                                {inputBlog.blogImagesViews.find(x => x.imageUrl == value.imageUrl) ?
                                                                                                    <><a style={{ margin: "0 2%", color: "red" }} onClick={() => RemoveImageBlog(value.imageUrl)} href="#!">Remove Image</a></>
                                                                                                    :
                                                                                                    <><a style={{ margin: "0 2%", color: "gray" }} >Removed Image</a></>}
                                                                                                {/* <a style={{margin: "0 2%", color:"red"}} onClick={()=>RemoveImage(value.imageUrl)} href="#!">Remove Image</a> */}
                                                                                            </div>
                                                                                        )) : <></>}
                                                                                    </div>
                                                                                    <div class="mb-3">
                                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Add New Image</label>
                                                                                        <input type="file" class="form-control" id="exampleInputEmail1"
                                                                                            aria-describedby="emailHelp" accept="image/*" multiple name="imageFile" placeholder={product.name} onChange={OnFormBlogChange} />
                                                                                    </div>
                                                                                    <Button type="submit" class="btn btn-primary">Save</Button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </Box>
                                                                </Modal>
                                                            </>
                                                            : <></>
                                                    }
                                                    {
                                                        actionMode === "DELETE" && Product.code === product.code ?
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td style={{ color: "red" }} colSpan={2}>You want to delete this Blog ?</td>
                                                                <td>
                                                                    <Button onClick={DeleteBlogSubmit} style={{ color: "red" }} >Yes</Button>
                                                                </td>
                                                                <td>
                                                                    <Button onClick={() => DeleteOffAction()}>No</Button>
                                                                </td>
                                                            </tr>
                                                            : <></>
                                                    }
                                                </>
                                            )) : <></>
                                            }
                                        </tbody>
                                    </table>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
                                        <Pagination count={Math.ceil(itemBlogCombo ? itemBlogCombo.length / 5 : 1)} page={page} onChange={ChangePage} color="primary" />
                                    </div>
                                </div>
                            </> : <></>
                    }
                    {/* ----------------Dashboard side bar---------------------- */}
                    {
                        sideBar === "DASHBOARD" ? <>
                            <h2 style={{ color: "#db7b04" }}>Dashboard</h2>
                            <div style={{ display: "flex" }}>
                                <div style={{ height: "300px", width: "300px", backgroundColor: "white", borderRadius: "20px", }}><PieChart /></div>
                                <div style={{ height: "300px", width: "700px", margin: "0 10px", backgroundColor: "white", borderRadius: "20px" }}><BarChart /></div>
                            </div>
                        </> : <></>
                    }
                    {/* ----------------------------Contract Side Bar------------------------- */}
                    {
                        sideBar === "CONTRACT" ?
                            <>
                                <div className="tableDisplayContractor">
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <h2 style={{ color: "#db7b04" }}>Contract</h2>
                                        </div>
                                        <div style={{ marginLeft: "85%" }}>

                                            {/* <Button style={{ backgroundColor: "#db7b04", color: "white" }} onClick={AddActionMode}>Add new</Button> */}

                                        </div>
                                    </div>
                                    {/* -------------Add form---------------- */}
                                    {
                                        actionMode === "ADD" ?
                                            <div class="col-sm-12 col-xl-6">
                                                <div class="bg-light rounded h-100 p-4">
                                                    <h6 class="mb-4">Add Product</h6>
                                                    <form onSubmit={AddNewBLogSubmit}>
                                                        <div class="mb-3">
                                                            <label htmlFor="exampleInputEmail1" class="form-label">Title</label>
                                                            <input type="text" class="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" name="title" onChange={OnFormBlogChange} />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label htmlFor="exampleInputEmail1" class="form-label">Content</label>
                                                            <textarea type="text" class="form-control" id="exampleInputEmail1" cols={10} rows={5}
                                                                aria-describedby="emailHelp" name="content" onChange={OnFormBlogChange} />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label htmlFor="exampleInputEmail1" class="form-label">Add Images</label>
                                                            <input type="file" class="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" accept="image/*" name="imageFile" multiple onChange={OnFormBlogChange} />
                                                        </div>
                                                        <Button type="submit" class="btn btn-primary">Add new Blog</Button>
                                                    </form>
                                                </div>
                                            </div>
                                            : <></>
                                    }

                                    <table style={{ marginTop: "1%" }}>
                                        <thead>
                                            <th>#</th>
                                            <th>Customer Name</th>
                                            <th>Upload Date</th>
                                            <th>Edit Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {itemContract ? itemContract.slice((page - 1) * 5, ((page - 1) * 5 + 5)).map((product, index) => (
                                                <>
                                                    <tr key={index}>
                                                        <td>{(page - 1) * 5 + index + 1}</td>
                                                        <td>{product.customerName}</td>
                                                        <td><input type="datetime-local" value={product.uploadDate ? product.uploadDate.substring(0, 16) : null} disabled /></td>
                                                        <td></td>
                                                        <td>{product.status === true ? <>Active</> : <>Unactive</>}</td>
                                                        <td><div><a href="#!" style={{ color: "#04AA6D" }} onClick={() => EditContractActionMode(product.code)}>Detail</a> |</div>
                                                        </td>
                                                    </tr>

                                                    {
                                                        actionMode === "DELETE" && Product.code === product.code ?
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td style={{ color: "red" }} colSpan={2}>You want to delete this Blog ?</td>
                                                                <td>
                                                                    <Button onClick={DeleteBlogSubmit} style={{ color: "red" }} >Yes</Button>
                                                                </td>
                                                                <td>
                                                                    <Button onClick={() => DeleteOffAction()}>No</Button>
                                                                </td>
                                                            </tr>
                                                            : <></>
                                                    }
                                                </>
                                            )) : <></>
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        actionMode === "EDIT" ?
                                            <>
                                                <Modal
                                                    open={handleModal}
                                                    onClose={AddActionMode}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={styleContract}>
                                                        <div style={{
                                                            border: '1px solid rgba(0, 0, 0, 0.3)',
                                                            height: '500px',
                                                        }}>
                                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                                <Viewer fileUrl="/contract/Contract.pdf" plugins={[defaultPlugin]} withCredentials={true} defaultScale={SpecialZoomLevel.ActualSize} theme={{
                                                                    theme: 'dark',
                                                                }} />
                                                            </Worker>

                                                        </div>
                                                    </Box>
                                                </Modal>

                                            </>
                                            : <></>
                                    }
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
                                        <Pagination count={Math.ceil(itemContract ? itemContract.length / 5 : 1)} page={page} onChange={ChangePage} color="primary" />
                                    </div>
                                </div>
                            </> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default ContractorIndex;
