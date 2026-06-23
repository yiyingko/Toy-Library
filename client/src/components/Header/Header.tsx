import AdminLogin from '../AdminLogin/AdminLogin';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Logo />
      <Navbar />
      <AdminLogin />
    </header>
  );
}

export default Header;
