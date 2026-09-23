interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export function Checkbox({
  label,
  value,
  onChange,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => {
            onChange(event.target.checked);
          }}
        />

        {label}
      </label>

      {error && <p>{error}</p>}
    </div>
  );
}