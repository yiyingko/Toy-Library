import { Link } from 'react-router-dom';
import type { Toy } from '../../types/toy';
import './ToyCard.css';

type Props = {
  toy: Toy;
};

export default function ToyCard({ toy }: Props) {
  return (
    <Link to={`/toys/${toy.id}`} className="toy-card__link">
      <article className="toy-card">
        <img className="toy-card__img" src={toy.image_path} alt={toy.name} />
        <h3 className="toy-card__title">{toy.name}</h3>
        <p className="toy-card__age">Age: {toy.age_group}</p>
        <p className="toy-card__availability">
          {toy.is_available ? 'Available' : 'Currently unavailable'}
        </p>
      </article>
    </Link>
  );
}
