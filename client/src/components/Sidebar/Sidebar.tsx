import AgeFilter from '../AgeFilter/AgeFilter';
import SearchBar from '../SearchBar/SearchBar';
import './Sidebar.css';

type SidebarProps = {
  onSearch: (search: string) => void;
};

function SideBar({ onSearch }: SidebarProps) {
  return (
    <>
      <SearchBar onSearch={onSearch} />
      <AgeFilter />
    </>
  );
}

export default SideBar;
