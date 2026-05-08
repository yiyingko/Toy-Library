import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Logo />
      <Navbar />
    </header>
  );
}

export default Header;
