import { useState, useEffect } from 'react';
import type { Toy } from '../../types/toy';
import ToyCard from '../../components/ToyCard/ToyCard';
import { getAllToys } from '../../services/toyService';
import './ToyListPage.css';

function ToyListPage() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [toysLoaded, setToysLoaded] = useState(false);

  useEffect(() => {
    getAllToys()
      .then((response) => {
        setToys(response);
        setToysLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to fetch toys:', error);
      });
  }, []);

  if (!toysLoaded) {
    return <p>Loading toys...</p>;
  }

  return (
    <div className="toy-list">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}

export default ToyListPage;
