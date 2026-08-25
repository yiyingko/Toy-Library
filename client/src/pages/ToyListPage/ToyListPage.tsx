import { useState, useEffect } from 'react';
import type { Toy } from '../../types/toy';
import ToyCard from '../../components/ToyCard/ToyCard';
import { getPaginatedToys } from '../../services/toyService';
import './ToyListPage.css';
import ReactPaginateModule from 'react-paginate';
import ToyFilters from '../../components/ToyFilters/ToyFilters';

function ToyListPage() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [toysLoaded, setToysLoaded] = useState(false);

  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); //(0-indexed)

  const [search, setSearch] = useState('');
  const [age, setAge] = useState('');
  const [available, setAvailable] = useState(false);

  const ReactPaginate =
    (ReactPaginateModule as any).default || ReactPaginateModule;
  // react-paginate is wrapped as a module object in this Vite/TS setup,
  // so we use .default when available.

  useEffect(() => {
    console.log('currentPage:', currentPage);
    getPaginatedToys(search, age, available, currentPage + 1, 12)
      .then((response) => {
        console.log('pagination response:', response);

        setToys(response.toys);
        setPageCount(Math.ceil(response.total / 12));
        setToysLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to fetch toys:', error);
        setToysLoaded(true);
      });
  }, [currentPage, search, age, available]);

  if (!toysLoaded) {
    return <p>Loading toys...</p>;
  }

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  console.log('ReactPaginate:', ReactPaginate);

  return (
    <main className="toy-list-page">
      <ToyFilters
        onSearch={setSearch}
        onAgeChange={setAge}
        onAvailabilityChange={setAvailable}
      />

      <div className="toy-list-page__grid">
        {toys.length === 0 ? (
          <p className="toy-list-page__empty">No toys found.</p>
        ) : (
          toys.map((toy) => <ToyCard key={toy.id} toy={toy} />)
        )}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLabel="Prev"
        nextLabel="Next"
        breakLabel="..."
        breakClassName="pagination__break"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName="pagination"
        activeClassName="pagination__page--active"
      />
    </main>
  );
}

export default ToyListPage;

/* ReactPaginate renders a list (<ul>)  */
// | Prop                              | Generated HTML                  |
// | --------------------------------- | ------------------------------- |
// | `containerClassName="pagination"` | `<ul class="pagination">`       |
// | `activeClassName="active"`        | `<li class="active">6</li>`     |
// | `breakClassName="break-me"`       | `<li class="break-me">...</li>` |
// | `previousLabel="←"`               | `<a>Prev</a>`                      |
// | `nextLabel="Next"`                | `<a>Next</a>`                   |
