interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Input({
  label,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div>
      <label>{label}</label>

      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />

      {error && <p>{error}</p>}
    </div>
  );
}