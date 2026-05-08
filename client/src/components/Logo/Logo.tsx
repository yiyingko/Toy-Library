import { Link } from 'react-router-dom';
import siteLogo from '../../assets/icons/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={siteLogo} alt="Toy Library" className="logo__img" />
      <span className="logo__text">Toy Library</span>
    </Link>
  );
}

export default Logo;
