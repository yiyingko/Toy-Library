import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToyListPage from './pages/ToyListPage/ToyListPage';
import HomePage from './pages/HomePage/HomePage';
import ToyDetailPage from './pages/ToyDetailPage/ToyDetailPage';
import BorrowPage from './pages/BorrowPage/BorrowPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AddToyPage from './pages/AddToyPage/AddToyPage';
import BorrowRequestsPage from './pages/BorrowRequestsPage/BorrowRequestsPage';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ContactMessagesPage from './pages/ContactMessagesPage/ContactMessagesPage';
import ContactDetailPage from './pages/ContactDetailPage/ContactDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/toys" element={<ToyListPage />} />
          <Route path="/toys/:toyId" element={<ToyDetailPage />} />
          <Route path="/borrow/:toyId" element={<BorrowPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin site */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/toys/new" element={<AddToyPage />} />
          <Route path="/admin/requests" element={<BorrowRequestsPage />} />
          <Route path="/admin/messages" element={<ContactMessagesPage />} />
          <Route path="/admin/messages/:id" element={<ContactDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
