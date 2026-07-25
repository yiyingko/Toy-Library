import { useState, useEffect } from 'react';
import type { Toy } from '../../types/toy';
import ToyCard from '../../components/ToyCard/ToyCard';
import { getPaginatedToys } from '../../services/toyService';
import './ToyListPage.css';
import ReactPaginateModule from 'react-paginate';

function ToyListPage() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [toysLoaded, setToysLoaded] = useState(false);

  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); //(0-indexed)

  const ReactPaginate =
    (ReactPaginateModule as any).default || ReactPaginateModule;
  // react-paginate is wrapped as a module object in this Vite/TS setup,
  // so we use .default when available.

  useEffect(() => {
    console.log('currentPage:', currentPage);
    getPaginatedToys(currentPage + 1, 12)
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
  }, [currentPage]);

  if (!toysLoaded) {
    return <p>Loading toys...</p>;
  }

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  console.log('ReactPaginate:', ReactPaginate);

  return (
    <>
      <div className="toy-list">
        {toys.length === 0 ? (
          <p>No toys found.</p>
        ) : (
          toys.map((toy) => <ToyCard key={toy.id} toy={toy} />)
        )}
      </div>
      <ReactPaginate 
        /* essential*/
        pageCount={pageCount} // Total number of pages
        onPageChange={handlePageClick} // What happens when a page is clicked
        previousLabel={'Prev'}
        nextLabel={'Next'}
        /*styling*/
        breakLabel={'...'}
        breakClassName={'break-me'} //style for breakLabel
        marginPagesDisplayed={2} // How many pages to show at the beginning and end
        pageRangeDisplayed={3} // How many pages to show around the current page
        containerClassName={'pagination'} // CSS class for the pagination container
        activeClassName={'active'} // CSS class for the active page
      />
    </>
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
