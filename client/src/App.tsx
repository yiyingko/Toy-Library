import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToyListPage from './pages/ToyListPage/ToyListPage';
import HomePage from './pages/HomePage/HomePage';
import ToyDetailPage from './pages/ToyDetailPage/ToyDetailPage';
import BorrowPage from './pages/BorrowPage/BorrowPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ContactPage from './pages/ContactPage/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/toys" element={<ToyListPage />} />
        <Route path="/toys/:toyId" element={<ToyDetailPage />} />
        <Route path="/borrow/:toyId" element={<BorrowPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
