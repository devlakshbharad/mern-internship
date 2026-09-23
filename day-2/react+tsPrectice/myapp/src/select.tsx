interface SelectProps<T> {
  label: string;
  value: T;

  options: {
    label: string;
    value: T;
  }[];

  onChange: (value: T) => void;
  error?: string;
}

export function Select<T>({
  label,
  value,
  options,
  onChange,
  error,
}: SelectProps<T>) {
  return (
    <div>
      <label>{label}</label>

      <select
        value={String(value)}
        onChange={(event) => {
          const selectedOption = options.find(
            (option) =>
              String(option.value) === event.target.value
          );

          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
      >
        {options.map((option) => (
          <option
            key={String(option.value)}
            value={String(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p>{error}</p>}
    </div>
  );
}