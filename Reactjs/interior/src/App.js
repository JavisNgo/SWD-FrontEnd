
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './pages/Layout/Header.jsx';
import { Footer } from './pages/Layout/Footer.jsx';
import { Constructs } from './pages/Constructs.jsx';
import { Signin } from './pages/Signin.jsx';
import { Error } from './pages/Error.jsx';
import { ContractorDetail } from './pages/ContractorDetail.jsx';
import { ImportImage } from './pages/ImportImage.jsx';
import { ConstructDetail } from './pages/ConstructDetail.jsx';
import { Signup } from './pages/Signup.jsx';
import { Packages } from './pages/Packages.jsx';
import { Quotation } from './pages/Quotation.jsx';
import { MyRequest } from './pages/MyRequest.jsx';
import { QuotationWithConstruct } from './pages/QuotationWithConstruct.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Constructs' element={<Constructs />} />
        <Route path='/ConstructDetail' element={<ConstructDetail />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Error' element={<Error />} />
        <Route path='/ContractorDetail' element={<ContractorDetail />} />
        <Route path='/ImportImage' element={<ImportImage />} />
        <Route path='/Signup' element={<Signup />}/>
        <Route path='/Packages' element={<Packages />}/>
        <Route path='/ImportImage' element={<ImportImage />}/>
        <Route path='/Quotation' element={<Quotation />}/>
        <Route path='/MyRequest' element={<MyRequest />}/>
        <Route path='/QuotationWithConstruct' element={<QuotationWithConstruct />}/>
      </Routes>
      <Footer />
    </>

  );
}

export default App;
