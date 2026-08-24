import './AgeFilter.css';

type AgeFilterProps = {
  onAgeChange: (age: string) => void;
};

function AgeFilter({ onAgeChange }: AgeFilterProps) {
  return (
    <div>
      <fieldset>
        <legend>Age</legend>
        <label>
          <input
            type="radio"
            name="age"
            value=""
            onChange={(e) => onAgeChange(e.target.value)}
          />
          All ages
        </label>
        <label>
          <input
            type="radio"
            name="age"
            value="0-2"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          0–2 years
        </label>
        <label>
          <input
            type="radio"
            name="age"
            value="3-5"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          3–5 years
        </label>
        <label>
          <input
            type="radio"
            name="age"
            value="6-8"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          6–8 years
        </label>
        <label>
          <input
            type="radio"
            name="age"
            value="9-10"
            onChange={(e) => onAgeChange(e.target.value)}
          />
          9–10 years
        </label>
      </fieldset>

      {/* <label>
    <input
      type="checkbox"
      onChange={(e) => onAvailabilityChange(e.target.checked)}
    />
    Available only
  </label> */}
    </div>
  );
}

export default AgeFilter;
