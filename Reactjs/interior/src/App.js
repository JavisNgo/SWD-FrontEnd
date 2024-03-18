
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './pages/Layout/Header.jsx';
import { Footer } from './pages/Layout/Footer.jsx';
import ContractorIndex from './pages/Contractor/ContractorIndex.jsx';
import AdminIndex from './pages/Admin/AdminIndex.jsx';

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ContratorIndex' element={<ContractorIndex/>}/>
        <Route path='/AdminIndex' element={<AdminIndex/>}></Route>
      </Routes>
      {/* <Footer /> */}
    </>

  );
}

export default App;
