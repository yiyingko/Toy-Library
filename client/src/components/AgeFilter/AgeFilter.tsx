import './AgeFilter.css';

type AgeFilterProps = {
  onAgeChange: (age: string) => void;
  onAvailabilityChange: (available: boolean) => void;
};

function AgeFilter({ onAgeChange, onAvailabilityChange }: AgeFilterProps) {
  return (
    <div className="age-filter">
      <fieldset className="age-filter__group">
        <legend className="age-filter__title visually-hidden">Age</legend>

        <label className="age-filter__option">
          <input
            className="age-filter__input"
            type="radio"
            name="age"
            value=""
            onChange={(e) => onAgeChange(e.target.value)}
          />
          All ages
        </label>

        <label className="age-filter__option">
          <input
            className="age-filter__input"
            type="radio"
            name="age"
            value="0-2"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          0–2 years
        </label>
        <label className="age-filter__option">
          <input
            className="age-filter__input"
            type="radio"
            name="age"
            value="3-5"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          3–5 years
        </label>
        <label className="age-filter__option">
          <input
            className="age-filter__input"
            type="radio"
            name="age"
            value="6-8"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          6–8 years
        </label>
        <label className="age-filter__option">
          <input
            className="age-filter__input"
            type="radio"
            name="age"
            value="9-10"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          9–10 years
        </label>
        {/* other age options */}
      </fieldset>

      <label className="age-filter__availability">
        <input
          className="age-filter__input"
          type="checkbox"
          onChange={(e) => onAvailabilityChange(e.target.checked)}
        />
        <span className="age-filter__availability-text">Available only</span>
      </label>
    </div>
  );
}

export default AgeFilter;
