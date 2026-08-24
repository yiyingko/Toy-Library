import AgeFilter from '../AgeFilter/AgeFilter';
import SearchBar from '../SearchBar/SearchBar';
import './Sidebar.css';

type SidebarProps = {
  onSearch: (search: string) => void;
  onAgeChange: (age: string) => void;
  onAvailabilityChange: (available: boolean) => void;
};

function SideBar({
  onSearch,
  onAgeChange,
  onAvailabilityChange,
}: SidebarProps) {
  return (
    <>
      <SearchBar onSearch={onSearch} />
      <AgeFilter
        onAgeChange={onAgeChange}
        onAvailabilityChange={onAvailabilityChange}
      />
    </>
  );
}

export default SideBar;
