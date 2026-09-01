import AgeFilter from '../AgeFilter/AgeFilter';
import SearchBar from '../SearchBar/SearchBar';
import './ToyFilters.css';

type ToyFiltersProps = {
  onSearch: (search: string) => void;
  onAgeChange: (age: string) => void;
  onAvailabilityChange: (available: boolean) => void;
};

function ToyFilters({
  onSearch,
  onAgeChange,
  onAvailabilityChange,
}: ToyFiltersProps) {
  return (
    <div className="toy-filters">
      <SearchBar onSearch={onSearch} />

      <AgeFilter
        onAgeChange={onAgeChange}
        onAvailabilityChange={onAvailabilityChange}
      />
    </div>
  );
}

export default ToyFilters;
