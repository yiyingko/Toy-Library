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
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search Toy:</label>

      <input
        id="search"
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
