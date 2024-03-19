import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ComboDetail = (props) => {
    const [item, setItem] = useState()
    const [productItem, setProductItem] = useState()
    const [action, setAcction] = useState("")
    const [quantityItem, setQuantityItem] = useState({
        "productId": 4,
        "constructId": props.id,
        "quantity": 1,
        "constructProductsView": [
        ]
        })
    const getAllItemAPI = "https://localhost:7233/RequestDetails"

    const getAllProductAPI = "https://localhost:7233/api/v1/products/get"
    
    console.log(item)
    // function LoadItem (){
    //     useEffect(() => {
    //         fetch(getAllItemAPI, {
    //             method: "GET"
    //         }).then((res) => {
    //             return res.json()
    //         }).then((data) => setItem(data.filter(x => x.constructId == props.id))).catch((err) => console.log(err))
    //         fetch(getAllProductAPI, {
    //             method: "GET"
    //         }).then((res) => {
    //             return res.json()
    //         }).then((data) => setProductItem(data)).catch((err) => console.log(err))
    //     }, [])
    // } 
    function LoadPage(){
        fetch(getAllItemAPI, {
            method: "GET"
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setItem(data.filter(x => x.requestId == props.id))
        }).catch((err) => console.log(err))
        fetch(getAllProductAPI, {
            method: "GET"
        }).then((res) => {
            return res.json()
        }).then((data) => setProductItem(data)).catch((err) => console.log(err))
    }
    if(item === undefined || productItem === undefined){
        LoadPage()
    }
    //
    // useEffect(() => {
    //         fetch(getAllItemAPI, {
    //             method: "GET"
    //         }).then((res) => {
    //             return res.json()
    //         }).then((data) => setItem(data.filter(x => x.constructId == props.id))).catch((err) => console.log(err))
    //         fetch(getAllProductAPI, {
    //             method: "GET"
    //         }).then((res) => {
    //             return res.json()
    //         }).then((data) => setProductItem(data)).catch((err) => console.log(err))
    //     }, [])
    //console.log(item)
    return (
        <>
            <tr style={{backgroundColor:"green", color:"white"}}>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Price</th>
                <th>Product Image</th>
                <th>Quantity</th>
            </tr>
            {item && productItem ? item.map((value, index) => (
                <>
                <tr key={index} style={{backgroundColor:"gray", color:"white"}}>
                    
                    <td>{productItem.find(x => x.id == value.productId).name}</td>
                    <td>{productItem.find(x => x.id == value.productId).description}</td>
                    <td>{productItem.find(x => x.id == value.productId).price}</td>
                    <td>{productItem.find(x => x.id == value.productId).productImagesViews? 
                    <>
                    <img src={productItem.find(x => x.id == value.productId).productImagesViews[0].imageUrl} alt='Product Image' width={100}/>
                    </>:<></>}</td>   
                    <td><input type='number' defaultValue={value.quantity} name='quantity' min={1} readOnly/></td>                
                </tr>
                </>
            )) : <></>}
        </>
    )
}

export default ComboDetail
