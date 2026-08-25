import './SearchBar.css';
import { useState } from 'react';

type SearchBarProps = {
  onSearch: (search: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(searchInput);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-bar__label" htmlFor="search">
        Search Toy:
      </label>

      <input
        className="search-bar__input"
        id="search"
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      <button className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
