
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './pages/Layout/Header.jsx';
import { Footer } from './pages/Layout/Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
