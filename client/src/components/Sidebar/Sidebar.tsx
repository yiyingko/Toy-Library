import AgeFilter from '../AgeFilter/AgeFilter';
import SearchBar from '../SearchBar/SearchBar';
import './Sidebar.css';

type SidebarProps = {
  onSearch: (search: string) => void;
  onAgeChange: (age: string) => void;
};

function SideBar({ onSearch, onAgeChange }: SidebarProps) {
  return (
    <>
      <SearchBar onSearch={onSearch} />
      <AgeFilter onAgeChange={onAgeChange} />
    </>
  );
}

export default SideBar;
