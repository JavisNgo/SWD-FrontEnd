import React, { useEffect, useState } from "react";
import { Button, Pagination, Tab, Tabs } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PieChart from "../Chart/PieChart.jsx";
import BarChart from "../Chart/BarChart.jsx";
import { Avatar, Box, Modal} from "@mui/material";


const AdminIndex = () => {
  //API route---------------------------------------------------------
  const productGetAllAPI = "https://localhost:7233/api/v1/products/get";
  const productPostAPI = "https://localhost:7233/api/v1/products/post";
  const productPutAPI = "https://localhost:7233/api/v1/products/put";
  const productDeletaAPI = "https://localhost:7233/product";
  const createContractorAccountAPI = "https://localhost:7233/api/v1/accounts/register/contractor"

  //Variable Declare--------------------------------------------------------

  const [item, setItem] = useState();
  const [requestItem, setRequestItem] = useState();
  var inputImages = []
  const [actionMode, setActionMode] = useState("")
  const [Product, setProduct] = useState();
  const [handleModal, setHandleModal]=useState();
  const [page, setPage] = useState(1);
  const [inputProductForm, setInputProductForm] = useState({
    contractorId: 1,
    name: "",
    description: "",
    price: 0,
    status: true,
    productImagesViews: []
  })
  const [inputAccountForm, setInputAccountForm] = useState({
    "username": "",
    "password": "",
    "status": true,
    "role": "",
    "name": "",
    "email": "",
    "address": "",
    "phoneNumber": ""
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
  const [sideBar, setSideBar] = useState("DASHBOARD")
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
  const OnformAddAccountChange = (event) =>{
    setInputAccountForm(
      {
        ...inputAccountForm,
        [event.target.name]: event.target.value
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
  
  function RemoveImage(Url) {
    if (window.confirm("You want to remove this image ?"))
      setInputProductForm({
        ...inputProductForm,
        productImagesViews: inputProductForm.productImagesViews.filter(x => x.imageUrl !== Url)
      })
    // inputProductForm.productImagesViews.splice(inputProductForm.productImagesViews.indexOf(inputProductForm.productImagesViews.find(x => x.productId == id))-1, 1)
  }

  //SideBar Action-------------------------------------------------------------------
  const ProductSideBar = () => {
    setSideBar("DASHBOARD")
    setActionMode("")
    setPage(1)
  }
  const AddContractorSideBar = ()=>{
    if(handleModal == false){
      setSideBar("ADDACCOUNT")
      setActionMode("")
      setPage(1)
      setHandleModal(true)
    }
    else{
      setHandleModal(false)
    }
    
  }
  const AccountSideBar = () => {
    setSideBar("ACCOUNT")
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
  //Action Mode ---------------------------------------------------------------------
  const AddActionMode = () => {
    if (actionMode === "") {
      setActionMode("ADD")
    }
    else {
      setActionMode("")
    }
  }
  function EditActionMode(id) {
    if (actionMode === "") {
      setActionMode("EDIT")
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

 
  function DeleteOffAction() {
    setActionMode("")
  }


  
  const ChangePage = (event, value) => {
    setPage(value)
    setActionMode("")
  }
  
  //Submit form ---------------------------------------------------------------------
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
  }
  const DeleteProductSubmit = () => {

    setActionMode("");
    fetch(productDeletaAPI + `/${Product.id}`, {
      method: "DELETE",
    }).then((res) => {
    }).then((data) => console.log(data))
      .catch(err => console.log(err))
  }
  const CreateAccountSubmit = (event) =>{
    event.preventDefault()
    setHandleModal(false)
    fetch(createContractorAccountAPI, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputAccountForm)
    }).then((res) => {
      return res.json();

    }).then((data) => alert(data))
      .catch(err => alert(err))
  }
  
  //Fetch Data ------------------------------------------------------------------



  useEffect(() => {
    fetch(productGetAllAPI, {
      method: "GET"
    }).then((res) => {
      return res.json();
    }).then((data) => setItem(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0" >
      <div className="sidebar pe-4 pb-3" style={{ backgroundColor: "#04AA6D", alignItems: "center" }}>
        <nav className="navbar bg-black navbar-light" style={{ color: "white" }}>
          <a href="#" className="navbar-brand mx-1 mb-4" style={{ paddingLeft: "20%", color:"white" }}>
            <h3 style={{color:'white'}}>
              <i className="fa me-2" ></i>Admin
            </h3>
          </a>
          <div className="navbar-nav w-100" style={{ margin: "0" }}>
            <a href="#" className="nav-item nav-link active" style={{ color: "white" }} onClick={ProductSideBar}>
              <i className="fa fa-tachometer-alt me-2" ></i>  Dashboard
            </a>
            <a href="#" className="nav-item nav-link active" style={{ color: "white" }} onClick={AddContractorSideBar}>
              <i className="fa fa-tachometer-alt me-2" ></i>  Add Contractor Account
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{ color: "white" }}
                onClick={AccountSideBar}
              >
                <i className="fa fa-laptop me-2"></i>  Account
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="content" style={{ width: "100%", margin: "0", paddingBottom: "20%", backgroundColor:"#dfe8e0" }}>
        <div style={{ backgroundColor: "white", padding: "0.25% 0", display: "flex", alignItems: "center" }}>
          <Button style={{ color: "#04AA6D" }}><MenuIcon style={{ margin: "0 1%" }}></MenuIcon></Button>
          <h3 style={{ color: "#04AA6D", marginLeft: "70%" }}>Welcome, Admin</h3>

        </div>

        <div style={{ margin: "0 2%" }}>
          <div style={{ display: "flex", width: "25%", marginTop: "2%" }}>
            <input class="form-control border-1" type="search" placeholder="Search" />
            <Button style={{ color: "#04AA6D" }}>Search</Button>
          </div>
          <h2 style={{ color: "#04AA6D" }}>Dashboard</h2>
          <div style={{display: "flex"}}>
          <div style={{ height: "300px", width: "400px", backgroundColor: "white", borderRadius:"20px",}}><PieChart/></div>
          <div style={{ height: "300px", width: "700px", margin:"0 10px", backgroundColor: "white", borderRadius:"20px"}}><BarChart/></div>
          </div>
          
          {/* -----------------------------------product side bar----------------------------------------------------------------------- */}
              
          {/* --------------------------------------------Combo side bar----------------------------------------------------------------------- */}
          {
            sideBar === "ADDACCOUNT"?<>
              <Modal
                                                    open={handleModal}
                                                    onClose={AddContractorSideBar}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <div class="">
                                                            <div class="bg-light rounded h-100 p-4">
                                                                <h6 class="mb-4">Add Contractor Account</h6>
                                                                <form onSubmit={CreateAccountSubmit}>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">User Name</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="username" onChange={OnformAddAccountChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Password</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="password" onChange={OnformAddAccountChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="name" onChange={OnformAddAccountChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
                                                                        <input type="email" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="email" onChange={OnformAddAccountChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Address</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="address" onChange={OnformAddAccountChange} />
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label htmlFor="exampleInputEmail1" class="form-label">Phone Number</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp" required name="phoneNumber" onChange={OnformAddAccountChange} />
                                                                    </div>
                                                                    
                                                                    <Button type="submit" class="btn btn-primary">Add new product</Button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </Modal>
            </>:<></>
          }
        </div>
      </div>
    </div>
  );
}

export default AdminIndex
