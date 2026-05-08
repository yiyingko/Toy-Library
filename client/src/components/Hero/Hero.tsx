import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__title">Where Curiosity Comes to Play</h1>
      <p className="hero__text">
        Borrow and explore toys that spark creativity, learning, and laughter.
      </p>

      <Link to="/toys" className="hero__button">
        Discover Now
      </Link>
    </section>
  );
}

export default Hero;
