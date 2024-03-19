
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './pages/Layout/Header.jsx';
import { Footer } from './pages/Layout/Footer.jsx';
import ContractorIndex from './pages/Contractor/ContractorIndex.jsx';
import AdminIndex from './pages/Admin/AdminIndex.jsx';
import { Constructs } from './pages/Constructs.jsx';
import { Signin } from './pages/Signin.jsx';
import { Error } from './pages/Error.jsx';
import { ContractorDetail } from './pages/ContractorDetail.jsx';
import { ConstructDetail } from './pages/ConstructDetail.jsx';
import { Signup } from './pages/Signup.jsx';
import { Quotation } from './pages/Quotation.jsx';
import { MyRequest } from './pages/MyRequest.jsx';
import PrivateRoute from './pages/PrivateRoute.js';
import { Unauthorized } from './pages/Unauthorized.jsx';
import { useEffect, useState } from 'react';

function App() {
  const userDataString = localStorage.getItem('userData');
  const [userData, setUserData] = useState({
    username: 'example_user',
    email: 'user@example.com',
    Role: '',
  })

  useEffect(()=>{
    setUserData(JSON.parse(userDataString) || {
      username: 'example_user',
      email: 'user@example.com',
      role: '',
    })
  })
  
  return (
    <>
    {userData.Role === "CONTRACTOR"||userData.Role === "ADMIN" ? <></>:<><Header /></>}
      <Routes>
        <Route path='/' element={<HomePage />} />
        {userData.Role === "CONTRACTOR"||userData.Role === "ADMIN" ? <><Route path='/ContractorIndex' element={<ContractorIndex/>}></Route></>
        :<><Route path='/ContractorIndex' element={<HomePage/>}></Route></>}
        <Route path='/AdminIndex' element={<AdminIndex/>}></Route>
        <Route path='/Constructs' element={<Constructs />} />
        <Route path='/ConstructDetail' element={<ConstructDetail />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Error' element={<Error />} />
        <Route path='/ContractorDetail' element={<ContractorDetail />} />
        <Route path='/Signup' element={<Signup />} />
        <Route exact path='/Quotation' element={<PrivateRoute role={'CUSTOMER'} />}>
          <Route path='/Quotation' element={<Quotation />} />
        </Route>
        {/* <PrivateRoute path="/MyInfo" component={MyInfo} role={userData.Role} /> */}
        <Route exact path='/MyRequest' element={<PrivateRoute role={'CUSTOMER'} />}>
          <Route exact path='/MyRequest' element={<MyRequest />} />
        </Route>
        <Route path="/Unauthorized" element={<Unauthorized />} />

      </Routes>
      {userData.Role === "CONTRACTOR" ||userData.Role === "ADMIN" ? <></>:<><Footer /></>}

    </>

  );
}

export default App;
