import React, { useEffect, useState } from 'react'

const ComboDetail = (props) => {
    const [item, setItem] = useState()
    const [productItem, setProductItem] = useState()
    const [action, setAcction] = useState("")
    const getAllItemAPI = "https://localhost:7233/api/constructProducts"
    const postProductToCombo = "https://localhost:7233/api/constructProducts"
    const getAllProductAPI = "https://localhost:7233/api/v1/products/get"
    const deleteProductFromCombo ="https://localhost:7233/api/constructProducts/"

    const AddAction = () => {
        if (action === "")
            setAcction("ADD")
        else {
            setAcction("")
        }
    }
    function AddNewProductToCombo(id){
        fetch(postProductToCombo, {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "productId": id,
                "constructId": props.id
            })
        }).then((res) => {
            console.log(res)
        }).then((data) => setProductItem(data)).catch((err) => console.log(err))
        LoadPage()
        console.log("Add");
    }
    function RemoveProductToCombo(id){
        fetch(deleteProductFromCombo +`${id}`, {
            method: "DELETE",
        }).then((res) => {
            console.log(res)
        }).then((data) => setProductItem(data)).catch((err) => console.log(err))
        console.log(id);
        LoadPage()
    }

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
        }).then((data) => setItem(data.filter(x => x.constructId == props.id))).catch((err) => console.log(err))
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
    var displayProducSelect = []
    if (item && productItem) {
            displayProducSelect = productItem.filter(() => true)
            item.forEach(product => {
                var value = displayProducSelect.find(x=>x.id === product.productId)
                if(value !== undefined){
                    var index = displayProducSelect.indexOf(value)
                }            
                displayProducSelect.splice(index,1)
            })
            
    }
    console.log(item)
    return (
        <>
            <tr>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Price</th>
                <th>Product Image</th>
                <th>Action</th>
                <th><a href='#!' onClick={AddAction}>Add product</a></th>
            </tr>
            {item && productItem ? item.map((value, index) => (
                <tr key={index}>
                    
                    <td>{productItem.find(x => x.id == value.productId).name}</td>
                    <td>{productItem.find(x => x.id == value.productId).description}</td>
                    <td>{productItem.find(x => x.id == value.productId).price}</td>
                    <td>{productItem.find(x => x.id == value.productId).productImagesViews? 
                    <>
                    <img src={productItem.find(x => x.id == value.productId).productImagesViews[0].imageUrl} alt='Product Image' width={100}/>
                    </>:<></>}</td>                   
                    <td>
                        <div>
                            <a href='#!' onClick={() => RemoveProductToCombo(value.id)}>Remove</a>
                        </div>
                    </td>
                </tr>
            )) : <></>}
            {productItem && action === "ADD" ?
                <>
                    <tr>
                        <th colSpan={7} style={{ textAlign: "center", backgroundColor: "coral" }}><h2>Product</h2></th>
                    </tr>
                    {displayProducSelect? displayProducSelect.map((value, index)=>(                    
                        <>
                        <tr>
                        <td>{value.name}</td>
                        <td>{value.description}</td>
                        <td>{value.price}</td>
                        <td>{value.productImagesViews? 
                    <>
                    <img src={value.productImagesViews[0].imageUrl} alt='Product Image' width={100}/>
                    </>:<></>}</td>
                        <td><div>
                            <a href='#!' onClick={()=>AddNewProductToCombo(value.id)}>Add</a>
                            </div></td>
                        </tr>
                        </>
                    )):<></>
                    }
                </>
                : <></>
            }
        </>
    )
}

export default ComboDetail
